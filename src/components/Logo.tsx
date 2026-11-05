type LogoProps = {
  className?: string;
  size?: number;
};

export function LogoMark({ className = "", size = 48, idPrefix = "logo" }: LogoProps & { idPrefix?: string }) {
  const ring = `${idPrefix}-ring`;
  const eagle = `${idPrefix}-eagle`;
  const city = `${idPrefix}-city`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={ring} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7EC8EA" />
          <stop offset="50%" stopColor="#3A9AD9" />
          <stop offset="100%" stopColor="#1E6FAF" />
        </linearGradient>
        <linearGradient id={eagle} x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#6BB7E3" />
          <stop offset="100%" stopColor="#2B86C4" />
        </linearGradient>
        <linearGradient id={city} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E6FA8" />
          <stop offset="100%" stopColor="#123A63" />
        </linearGradient>
      </defs>
      <circle cx="120" cy="120" r="108" stroke={`url(#${ring})`} strokeWidth="14" fill="white" />
      <path
        fill={`url(#${eagle})`}
        d="M52 118c8-38 38-70 78-78 6-1 12 4 11 10-2 14-1 28 8 39 12 14 32 18 48 10 4-2 8 1 8 6 0 22-14 43-34 54-6 3-12-2-11-8 2-12-4-24-15-30-18-10-40-4-52 12-4 5-12 4-15-2-6-12-16-22-26-13z"
      />
      <path
        fill="white"
        d="M98 92c10-8 24-10 36-5 3 1 4 5 2 8-8 10-22 14-34 8-4-2-5-7-4-11z"
      />
      <path
        fill="#1A4F7C"
        d="M148 86c8 2 16 2 22-3 2-2 6-1 6 2 0 8-8 16-18 18-8 2-14-4-12-10 1-3 1-6 2-7z"
      />
      <g fill={`url(#${city})`}>
        <rect x="58" y="148" width="22" height="46" rx="1" />
        <rect x="84" y="132" width="20" height="62" rx="1" />
        <rect x="108" y="112" width="24" height="82" rx="1" />
        <rect x="136" y="128" width="22" height="66" rx="1" />
        <rect x="162" y="146" width="20" height="48" rx="1" />
        <rect x="117" y="96" width="6" height="18" rx="1" />
      </g>
    </svg>
  );
}

export function BrandLockup({
  title = "أبراج العزل",
  subtitle = "TOWERS OF INSULATION",
  light = false,
  size = 46,
  idPrefix = "brand",
}: {
  title?: string;
  subtitle?: string;
  light?: boolean;
  size?: number;
  idPrefix?: string;
}) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark size={size} idPrefix={idPrefix} />
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}
        >
          {title}
        </span>
        <span
          className={`mt-1 text-[10px] font-semibold tracking-[0.18em] ${light ? "text-sky-200" : "text-brand"}`}
        >
          {subtitle}
        </span>
      </span>
    </span>
  );
}
