/** A clearly visible marker for something you still need to give me (listed at the end of each phase). */
export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-dashed border-[#A33F3F] bg-[#FDF1F1] px-2 py-0.5 align-middle text-[13px] font-semibold text-[#A33F3F]">
      TODO: {children}
    </span>
  );
}
