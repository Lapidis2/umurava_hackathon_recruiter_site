"use client";

import { useMemo, useState } from "react";
import { Candidate } from "@/types/candidate";
import { Eye, Mail, UserX, Download, Filter } from "lucide-react";

type Props = {
  candidates: Candidate[];
  selectedCandidates: number[];
  toggleCandidateSelection: (id: number) => void;
  setSelectedCandidate: (c: Candidate) => void;
  handleReject: (id: number) => void;
  setShowEmailModal: (v: boolean) => void;
  handleBulkAction: (action: "email" | "export" | "reject") => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
  activeNav: string;
   onSelect: (c: Candidate) => void;
};

const ITEMS_PER_PAGE = 5;

export default function CandidatesTable({
  candidates,
  selectedCandidates,
  toggleCandidateSelection,
  setSelectedCandidate,
  handleReject,
  setShowEmailModal,
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDesc, setSortDesc] = useState(true);

  // =========================
  // SORTING
  // =========================
  const sortedCandidates = useMemo(() => {
    return [...candidates].sort((a, b) =>
      sortDesc ? b.aiScore - a.aiScore : a.aiScore - b.aiScore
    );
  }, [candidates, sortDesc]);

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(sortedCandidates.length / ITEMS_PER_PAGE);

  const paginatedCandidates = sortedCandidates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // =========================
  // EXPORT CSV
  // =========================
  const exportCSV = () => {
    const headers = ["Name", "Email", "Role", "Score", "Status"];
    const rows = candidates.map((c) => [
      c.name,
      c.email,
      c.role,
      c.aiScore,
      c.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "candidates.csv";
    link.click();
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="bg-white rounded-xl border border-[#B5D4F4]">
      {/* HEADER */}
      <div className="p-4 flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
        <h2 className="font-semibold text-[#0C2340]">
          Candidate Rankings
        </h2>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-[#B5D4F4] rounded-lg px-3 py-2 text-sm"
          />

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 px-3 py-2 border rounded-lg"
          >
            <Filter size={16} /> Filters
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center gap-1 px-3 py-2 border rounded-lg"
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#F1F6FB] text-[#5A7A99]">
            <tr>
              <th className="p-3"></th>
              <th className="p-3 text-left">Candidate</th>
              <th className="p-3">Role</th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => setSortDesc(!sortDesc)}
              >
                AI Score {sortDesc ? "↓" : "↑"}
              </th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedCandidates.map((c,) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(c.id)}
                    onChange={() => toggleCandidateSelection(c.id)}
                  />
                </td>

                <td className="p-3">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-gray-500">
                    {c.email}
                  </div>
                </td>

                <td className="p-3 text-center">{c.role}</td>

                <td className="p-3 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border">
                    {c.aiScore}
                  </div>
                </td>

                <td className="p-3 text-center">
                  <span className="px-2 py-1 text-xs rounded-full bg-[#EEF5FF] text-[#1A6FD4]">
                    {c.status}
                  </span>
                </td>

                <td className="p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => setSelectedCandidate(c)}
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCandidate(c);
                      setShowEmailModal(true);
                    }}
                  >
                    <Mail size={16} />
                  </button>

                  <button onClick={() => handleReject(c.id)}>
                    <UserX size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="p-4 flex justify-between items-center text-sm">
        <span>
          Page {currentPage} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}