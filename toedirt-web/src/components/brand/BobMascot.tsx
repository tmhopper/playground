import { cn } from "@/lib/cn";

export function BobMascot({
  size = 220,
  className,
  saying,
}: {
  size?: number;
  className?: string;
  saying?: string;
}) {
  return (
    <div className={cn("relative inline-block", className)} style={{ width: size }}>
      <svg
        viewBox="0 0 220 260"
        width={size}
        height={size * (260 / 220)}
        aria-hidden
        className="drop-shadow-jobsite"
      >
        <defs>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#F4EDE0" />
            <stop offset="1" stopColor="#C9AE82" />
          </linearGradient>
        </defs>
        <circle cx="110" cy="130" r="108" fill="url(#sky)" stroke="#2C2018" strokeWidth="4" />
        <path d="M30 250 Q110 230 190 250 L190 260 L30 260 Z" fill="#4A3728" />
        <path
          d="M55 90 Q110 50 165 90 L170 110 L50 110 Z"
          fill="#FF6B1A"
          stroke="#2C2018"
          strokeWidth="3"
        />
        <rect x="100" y="70" width="20" height="8" fill="#F5C518" />
        <ellipse cx="110" cy="150" rx="48" ry="50" fill="#E8D9BE" stroke="#2C2018" strokeWidth="3" />
        <circle cx="92" cy="145" r="5" fill="#2C2018" />
        <circle cx="128" cy="145" r="5" fill="#2C2018" />
        <path d="M95 170 Q110 180 125 170" fill="none" stroke="#2C2018" strokeWidth="3" strokeLinecap="round" />
        <path d="M82 152 Q78 148 82 144" stroke="#2C2018" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M138 152 Q142 148 138 144" stroke="#2C2018" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="60" y="195" width="100" height="45" rx="6" fill="#3B2C20" stroke="#2C2018" strokeWidth="3" />
        <circle cx="148" cy="225" r="8" fill="#F4EDE0" stroke="#2C2018" strokeWidth="2" />
        <circle cx="152" cy="225" r="3" fill="#8B2C1F" />
        <g transform="rotate(-15 175 180)">
          <circle cx="175" cy="180" r="22" fill="#7A7A78" stroke="#2C2018" strokeWidth="3" />
          <circle cx="175" cy="180" r="6" fill="#2C2018" />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x="173"
              y="158"
              width="4"
              height="6"
              fill="#2C2018"
              transform={`rotate(${i * 30} 175 180)`}
            />
          ))}
        </g>
      </svg>
      {saying ? (
        <div className="absolute -right-4 -top-4 max-w-[140px] rotate-3 rounded-lg border-2 border-dirt-700 bg-bone px-3 py-2 font-marker text-sm text-dirt-700 shadow-jobsite">
          {saying}
          <span className="absolute -bottom-2 left-6 block h-3 w-3 rotate-45 border-b-2 border-r-2 border-dirt-700 bg-bone" />
        </div>
      ) : null}
    </div>
  );
}
