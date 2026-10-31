/**
 * Marks a statement in a legal page that still needs the team's confirmation. Each one is listed in the phase report;
 * remove the marker once the sentence is confirmed (or fix the sentence).
 */
export function Confirm() {
  return (
    <span className="ml-1 inline-block rounded border border-dashed border-[#A33F3F] bg-[#FDF1F1] px-1.5 align-middle font-mono text-[11px] font-semibold not-italic text-[#A33F3F]">
      TODO-CONFIRM
    </span>
  );
}
