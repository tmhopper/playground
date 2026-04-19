import type { Branch } from "@schemas/job";

type SealProps = { branch: Branch; size?: number; className?: string };

// Public-domain monogram-style seals rendered as typography.
// Placeholder for actual service insignia (which are in the public domain
// but we don't ship raster images).
export function BranchSeal({ branch, size = 72, className = "" }: SealProps) {
  const theme = THEME[branch];
  return (
    <div
      role="img"
      aria-label={`${theme.label} seal`}
      className={`flex items-center justify-center rounded-full font-semibold ${className}`}
      style={{
        width: size,
        height: size,
        background: theme.bg,
        color: theme.fg,
        fontSize: size * 0.28,
        letterSpacing: "0.05em",
        fontFamily: "var(--font-mono)",
        border: `2px solid ${theme.border}`,
      }}
    >
      {theme.abbr}
    </div>
  );
}

const THEME: Record<Branch, { label: string; abbr: string; bg: string; fg: string; border: string }> = {
  marine_corps: { label: "U.S. Marine Corps", abbr: "USMC", bg: "#8B0000", fg: "#FFD700", border: "#5F0000" },
  army: { label: "U.S. Army", abbr: "ARMY", bg: "#4B5320", fg: "#FFD700", border: "#2F3814" },
  air_force: { label: "U.S. Air Force", abbr: "USAF", bg: "#00308F", fg: "#C0C0C0", border: "#001F5E" },
  navy: { label: "U.S. Navy", abbr: "NAVY", bg: "#1C3F7C", fg: "#FFD700", border: "#0A2552" },
  coast_guard: { label: "U.S. Coast Guard", abbr: "USCG", bg: "#CC5500", fg: "#FFFFFF", border: "#8A3A00" },
  space_force: { label: "U.S. Space Force", abbr: "USSF", bg: "#1D2951", fg: "#C0C0C0", border: "#0A1232" },
};
