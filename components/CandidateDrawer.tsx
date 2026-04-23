'use client';

import { Candidate } from '../types/candidate';

type Props = {
    selectedCandidate: Candidate | null;
  setSelectedCandidate: (c: Candidate | null) => void;
  handleShortlist: (id: number) => void;
  handleReject: (id: number) => void;
  setShowEmailModal: (value: boolean) => void;

};

export default function CandidateDrawer({ selectedCandidate, setSelectedCandidate }: Props) {
  if (!selectedCandidate) return null;

  return (
    <div className="fixed right-0 top-0 w-96 h-full bg-white border-l p-6 z-50">
      <button onClick={() => setSelectedCandidate(null)} className="mb-4 text-red-500">
        Close
      </button>

      <h2 className="text-xl font-bold">{selectedCandidate.name}</h2>
      <p>{selectedCandidate.email}</p>
      <p>{selectedCandidate.role}</p>
      <p>Score: {selectedCandidate.aiScore}</p>
    </div>
  );
}