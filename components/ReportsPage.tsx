'use client';

import { motion } from 'motion/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Candidate } from '../types/candidate';

type Props = {
  candidates: Candidate[];
};

export default function ReportsPage({ candidates }: Props) {
  const data = [
    { range: '0-60', count: candidates.filter(c => c.aiScore < 60).length },
    { range: '60-80', count: candidates.filter(c => c.aiScore >= 60 && c.aiScore < 80).length },
    { range: '80-100', count: candidates.filter(c => c.aiScore >= 80).length },
  ];

  return (
    <div className="p-6 space-y-6">

      <motion.div className="bg-white p-6 rounded-xl border">
        <h3 className="font-semibold mb-4">Score Distribution</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#1A6FD4" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

    </div>
  );
}