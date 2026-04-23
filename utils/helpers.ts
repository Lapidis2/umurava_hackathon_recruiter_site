export const getScoreColor = (score: number) => {
  if (score >= 85) return 'text-[#10B981]';
  if (score >= 60) return 'text-[#F59E0B]';
  return 'text-[#EF4444]';
};

export const getScoreBgColor = (score: number) => {
  if (score >= 85) return 'bg-emerald-50';
  if (score >= 60) return 'bg-amber-50';
  return 'bg-red-50';
};

export const getScoreBorderColor = (score: number) => {
  if (score >= 85) return 'border-emerald-200';
  if (score >= 60) return 'border-amber-200';
  return 'border-red-200';
};