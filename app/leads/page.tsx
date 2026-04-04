"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
      minimal={true}
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
