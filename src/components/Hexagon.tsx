/** The hexagon from the logo, as a big soft shape behind phones. Rounded corners come from a round-joined stroke. */
export function Hexagon({ className, tone = "sunflower" }: { className?: string; tone?: "sunflower" | "soft" | "outline" }) {
  const fill = tone === "soft" ? "#FFF0B8" : tone === "outline" ? "none" : "#F4D35E";
  const stroke = tone === "outline" ? "#F4D35E" : fill;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <polygon
        points="100,14 174.5,57 174.5,143 100,186 25.5,143 25.5,57"
        fill={fill}
        stroke={stroke}
        strokeWidth={tone === "outline" ? 3 : 18}
        strokeLinejoin="round"
      />
    </svg>
  );
}
