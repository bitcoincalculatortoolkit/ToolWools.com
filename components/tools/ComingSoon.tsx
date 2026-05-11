'use client';

import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';

export function ComingSoon({ toolName }: { toolName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-card border border-border/60 bg-white p-12 shadow-card text-center"
    >
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary-bg mb-4">
        <Wrench size={28} className="text-primary" />
      </div>
      <h2 className="text-xl font-bold text-dark">Coming Soon</h2>
      <p className="mt-2 text-sm text-muted max-w-md mx-auto">
        <strong>{toolName}</strong> is currently under development. We&apos;re working hard to bring
        you this tool soon. Check back later!
      </p>
    </motion.div>
  );
}
