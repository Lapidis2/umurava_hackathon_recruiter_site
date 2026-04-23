"use client";

import { useState } from "react";
import { Toaster,toast } from "sonner";

import { motion, AnimatePresence } from "motion/react";


import Sidebar from "@/components/layout/SideBar";
import Header from "@/components/layout/Header";
import DashboardPage from "@/components/DashboardPage";
import ReportsPage from "@/components/ReportsPage";
import CandidatesTable from "@/components/CandidatesTable";
import CandidateDrawer from "@/components/CandidateDrawer";
import EmailModal from "@/components/EmailModal";


import { initialCandidates } from "@/data/candidate";
import { Candidate } from "@/types/candidate";

export default function Page() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState("Interview Invite");
  const [emailSubject, setEmailSubject] = useState(
    "Interview Invitation - Senior Product Designer Role"
  );
  const [emailBody, setEmailBody] = useState("");
  const [sendToAllShortlisted, setSendToAllShortlisted] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // =========================
  // ACTIONS (UNCHANGED)
  // =========================

  const handleShortlist = (candidateId: number) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId ? { ...c, status: "Shortlisted" } : c
      )
    );

    if (selectedCandidate?.id === candidateId) {
      setSelectedCandidate((prev) =>
        prev ? { ...prev, status: "Shortlisted" } : null
      );
    }
  };

  const handleReject = (candidateId: number) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId ? { ...c, status: "Rejected" } : c
      )
    );

    if (selectedCandidate?.id === candidateId) {
      setSelectedCandidate(null);
    }
  };

  const handleSendEmail = () => {
    if (!selectedCandidate) return;

    setCandidates((prev) =>
      prev.map((c) =>
        c.id === selectedCandidate.id ? { ...c, status: "Emailed" } : c
      )
    );

    setShowEmailModal(false);

    setSelectedCandidate((prev) =>
      prev ? { ...prev, status: "Emailed" } : null
    );
  };

  const handleBulkEmail = () => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.status === "Shortlisted" ? { ...c, status: "Emailed" } : c
      )
    );

    setShowEmailModal(false);
  };

  const toggleCandidateSelection = (id: number) => {
    setSelectedCandidates((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action: "email" | "export" | "reject") => {
    if (action === "email") {
      setCandidates((prev) =>
        prev.map((c) =>
          selectedCandidates.includes(c.id)
            ? { ...c, status: "Emailed" }
            : c
        )
      );
    }

    if (action === "reject") {
      setCandidates((prev) =>
        prev.map((c) =>
          selectedCandidates.includes(c.id)
            ? { ...c, status: "Rejected" }
            : c
        )
      );
    }

    setSelectedCandidates([]);
  };

  // =========================
  // FILTERING
  // =========================

  const getFilteredCandidates = () => {
    let filtered = candidates;

    if (activeNav === "Shortlisted") {
      filtered = filtered.filter((c) => c.status === "Shortlisted");
    } else if (activeNav === "Emailed") {
      filtered = filtered.filter((c) => c.status === "Emailed");
    } else if (activeNav === "Interviews") {
      filtered = filtered.filter((c) => c.status === "Interview");
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => b.aiScore - a.aiScore);
  };

  const filteredCandidates = getFilteredCandidates();

  // =========================
  // METRICS
  // =========================

  const totalResumes = candidates.length;
  const screenedCount = candidates.filter((c) => c.status !== "Screened").length;
  const shortlistedCount = candidates.filter(
    (c) => c.status === "Shortlisted"
  ).length;
  const emailedCount = candidates.filter((c) => c.status === "Emailed").length;

  // =========================
  // RENDER PAGE CONTENT
  // =========================

  const renderContent = () => {
    if (activeNav === "Reports") {
      return <ReportsPage candidates={candidates} />;
    }

    return (
      <div className="p-4 lg:p-8">
        {activeNav === "Dashboard" && (
          <DashboardPage
            totalResumes={totalResumes}
            screenedCount={screenedCount}
            shortlistedCount={shortlistedCount}
            emailedCount={emailedCount}
            toast={toast}
          />
        )}

        <CandidatesTable
          candidates={filteredCandidates}
          selectedCandidates={selectedCandidates}
          toggleCandidateSelection={toggleCandidateSelection}
          setSelectedCandidate={setSelectedCandidate}
          handleReject={handleReject}
          setShowEmailModal={setShowEmailModal}
          handleBulkAction={handleBulkAction}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          activeNav={activeNav}
          onSelect={(c) => setSelectedCandidate(c)}
        />
      </div>
    );
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="h-screen w-screen bg-[#F8FAFB] flex overflow-hidden">
      <Toaster position="top-right" richColors />

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setIsMobileSidebarOpen={setIsMobileSidebarOpen} />

        <div className="flex-1 overflow-auto">{renderContent()}</div>
      </div>

      {/* Drawer */}
      <CandidateDrawer
        selectedCandidate={selectedCandidate}
        setSelectedCandidate={setSelectedCandidate}
        handleShortlist={handleShortlist}
        handleReject={handleReject}
        setShowEmailModal={setShowEmailModal}
      />

      {/* Modal */}
      <EmailModal
        show={showEmailModal}
        setShow={setShowEmailModal}
        selectedCandidate={selectedCandidate}
        emailTemplate={emailTemplate}
        setEmailTemplate={setEmailTemplate}
        emailSubject={emailSubject}
        setEmailSubject={setEmailSubject}
        emailBody={emailBody}
        setEmailBody={setEmailBody}
        sendToAllShortlisted={sendToAllShortlisted}
        setSendToAllShortlisted={setSendToAllShortlisted}
        shortlistedCount={shortlistedCount}
        handleSendEmail={handleSendEmail}
        handleBulkEmail={handleBulkEmail}
      />
    </div>
  );
}