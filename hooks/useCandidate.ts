import { useState } from "react";
import { Candidate } from "@/types/candidate";
import { initialCandidates } from "@/constants/candidate";
import { toast } from "sonner";

export const useCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);

  const handleShortlist = (id: number) => {
    setCandidates(prev =>
      prev.map(c => c.id === id ? { ...c, status: "Shortlisted" } : c)
    );
    toast.success("Candidate shortlisted successfully");
  };

  const handleReject = (id: number) => {
    setCandidates(prev =>
      prev.map(c => c.id === id ? { ...c, status: "Rejected" } : c)
    );
    toast.error("Candidate rejected");
  };

  return {
    candidates,
    setCandidates,
    selectedCandidate,
    setSelectedCandidate,
    selectedCandidates,
    setSelectedCandidates,
    handleShortlist,
    handleReject,
  };
};