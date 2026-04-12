"use client";

import React, { useState, useEffect, useCallback } from "react";
import { message, Spin, Empty, Tag } from "antd";
import { Calendar, Clock, User, MessageSquare, Phone } from "lucide-react";
import axios from "axios";
import dayjs from "dayjs";

import PageContainer from "@/components/common/PageContainer";
import SectionCard from "@/components/common/SectionCard";

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMeetings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/meetings");
      setMeetings(response.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
      message.error("Failed to load meetings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  return (
    <PageContainer 
      title="Upcoming Meetings" 
      description="Track and managing scheduled demos and calls from your AI assistant."
    >
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : meetings.length === 0 ? (
        <Empty description="No meetings scheduled yet" className="mt-12" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meetings.map((meeting) => (
            <SectionCard key={meeting._id} className="p-0 overflow-hidden border border-zinc-800">
              <div className="p-6">
                {/* Header: Date & Time */}
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/20">
                    <Calendar size={14} />
                    {meeting.meetingDate ? dayjs(meeting.meetingDate).format('MMM D, YYYY') : 'TBD'}
                  </div>
                  <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-blue-500/20">
                    <Clock size={14} />
                    {meeting.meetingTime || 'TBD'}
                  </div>
                </div>

                {/* Body: Lead Info */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {meeting.name}
                </h3>
                
                <div className="space-y-2 text-zinc-400 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-zinc-500" />
                    {meeting.phone}
                  </div>
                  {meeting.email && (
                    <div className="flex items-center gap-2">
                      <MessageSquare size={14} className="text-zinc-500" />
                      {meeting.email}
                    </div>
                  )}
                </div>

                {/* AI Summary */}
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <p className="text-xs font-semibold uppercase text-zinc-500 mb-2 tracking-wider flex items-center gap-2">
                    <User size={12} />
                    AI Insights & Summary
                  </p>
                  <p className="text-sm text-zinc-300 line-clamp-3 italic leading-relaxed">
                    "{meeting.chatSummary || 'No summary available yet.'}"
                  </p>
                </div>
              </div>
              
              <div className="bg-zinc-900/50 px-6 py-3 border-t border-zinc-800 flex justify-between items-center">
                <StatusTag status={meeting.status} />
                <button 
                  className="text-emerald-500 text-xs font-bold hover:text-emerald-400 transition-colors cursor-pointer"
                  onClick={() => message.info("Opening detailed lead view...")}
                >
                  VIEW PROFILE →
                </button>
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

// Internal small component for status
function StatusTag({ status }: { status: string }) {
  const isBooked = status === "Meeting Booked";
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter ${isBooked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
      {status}
    </span>
  );
}
