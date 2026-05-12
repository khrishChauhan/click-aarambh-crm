"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

import PageContainer from "@/components/common/PageContainer";
import SectionCard from "@/components/common/SectionCard";
import LeadTable from "@/components/leads/LeadTable";
import LeadDrawer from "@/components/leads/LeadDrawer";
import LeadForm from "@/components/leads/LeadForm";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/leads");
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      message.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Auto-open drawer when navigated with ?id= param (e.g. from Meetings page)
  useEffect(() => {
    const targetId = searchParams.get("id");
    if (targetId && leads.length > 0 && !drawerVisible) {
      const matchedLead = leads.find((l: any) => l._id === targetId);
      if (matchedLead) {
        setSelectedLead(matchedLead);
        setDrawerVisible(true);
        // Clean the URL so refreshing doesn't re-open the drawer
        router.replace("/leads", { scroll: false });
      }
    }
  }, [searchParams, leads, drawerVisible, router]);

  const handleCreateSuccess = () => {
    setModalVisible(false);
    fetchLeads();
  };

  const handleUpdateSuccess = () => {
    setDrawerVisible(false);
    setSelectedLead(null);
    fetchLeads();
  };

  const handleView = (record: any) => {
    setSelectedLead(record);
    setDrawerVisible(true);
  };

  const handleEdit = (record: any) => {
    setSelectedLead(record);
    setDrawerVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/leads/${id}`);
      message.success("Lead deleted successfully");
      if (drawerVisible) setDrawerVisible(false);
      fetchLeads();
    } catch (error) {
      console.error("Error deleting lead:", error);
      message.error("Failed to delete lead");
    }
  };

  return (
    <PageContainer 
      title="Leads" 
      description="Manage and track your lead pipeline."
      extra={
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => setModalVisible(true)}
          className="rounded-lg px-6 font-medium"
          style={{ height: '40px' }}
        >
          Add New Lead
        </Button>
      }
    >
      <SectionCard className="p-0" disableHover3D>
        <LeadTable 
          data={leads} 
          loading={loading} 
          onEdit={handleEdit}
        />
      </SectionCard>


      <Modal
        title="Add New Lead"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
        width={600}
      >
        <LeadForm onSuccess={handleCreateSuccess} onCancel={() => setModalVisible(false)} />
      </Modal>

      <LeadDrawer 
        visible={drawerVisible} 
        onClose={() => {
          setDrawerVisible(false);
          setSelectedLead(null);
        }} 
        lead={selectedLead}
        onSuccess={handleUpdateSuccess}
        onDelete={handleDelete}
      />
    </PageContainer>
  );
}
