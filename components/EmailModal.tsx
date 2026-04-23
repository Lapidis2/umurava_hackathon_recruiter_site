'use client';

import { Candidate } from '../types/candidate';


type Props = {
  show: boolean;
  setShow: (open: boolean) => void;

  selectedCandidate: Candidate | null;

  emailTemplate: string;
  setEmailTemplate: (value: string) => void;

  emailSubject: string;
  setEmailSubject: (value: string) => void;

  emailBody: string;
  setEmailBody: (value: string) => void;

  sendToAllShortlisted: boolean;
  setSendToAllShortlisted: (value: boolean) => void;

  shortlistedCount: number;

  handleSendEmail: () => void;
  handleBulkEmail: () => void;
};

export default function EmailModal({ show, setShow, selectedCandidate, emailBody, setEmailBody,  handleSendEmail }: Props) {
  if (!show || !selectedCandidate) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-125">
        <h2 className="font-bold mb-3">
          Email {selectedCandidate.name}
        </h2>

        <textarea className="w-full border p-3 rounded-lg min-h-40" value={emailBody} onChange={(e) => setEmailBody(e.target.value)} />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={() => setShow(false)}>Cancel</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handleSendEmail}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}