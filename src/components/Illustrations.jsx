// Original line illustrations in the spirit of the logo: single-weight ink strokes, no fills.
// Steam drifts and flames flicker via CSS (.steam / .flame), both switched off for reduced motion.

const Svg = ({ children, className = "", title, viewBox = "0 0 200 200", strokeWidth = 1.6 }) => (
  <svg
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    role={title ? "img" : undefined}
    aria-hidden={title ? undefined : true}
  >
    {title && <title>{title}</title>}
    {children}
  </svg>
);

const Steam = ({ x = 100, y = 58, gap = 13 }) => (
  <g className="steam">
    {[-gap, 0, gap].map((dx) => (
      <path key={dx} d={`M${x + dx} ${y} c-6 -8 6 -14 0 -22 c-4 -6 2 -10 0 -16`} />
    ))}
  </g>
);

// Teardrop flame with a notch on the left and a tip that licks to the right
const flamePath = (x, base, h, w) =>
  [
    `M${x} ${base}`,
    `C${x - w * 0.9} ${base} ${x - w} ${base - h * 0.45} ${x - w * 0.45} ${base - h * 0.78}`,
    `C${x - w * 0.4} ${base - h * 0.6} ${x - w * 0.15} ${base - h * 0.52} ${x - w * 0.02} ${base - h * 0.56}`,
    `C${x - w * 0.12} ${base - h * 0.8} ${x + w * 0.12} ${base - h * 0.94} ${x + w * 0.18} ${base - h}`,
    `C${x + w * 0.85} ${base - h * 0.72} ${x + w} ${base - h * 0.38} ${x + w * 0.8} ${base - h * 0.18}`,
    `C${x + w * 0.62} ${base - h * 0.02} ${x + w * 0.32} ${base} ${x} ${base} Z`,
  ].join(" ");

export const Flame = ({ className }) => (
  <Svg className={className} viewBox="0 0 40 48">
    <path className="flame" d={flamePath(20, 44, 38, 14)} />
    <path className="flame" d={flamePath(20, 44, 18, 6)} />
  </Svg>
);

// Traditional clay stove (tungku) with a pot on the fire: the "pawon" itself
export const Tungku = ({ className, title }) => (
  <Svg className={className} title={title}>
    <path d="M18 182 H182" />
    <path d="M30 186 H60 M140 186 H170" opacity=".5" />
    <path d="M40 182 L52 112 H148 L160 182" />
    <rect x="46" y="104" width="108" height="8" rx="2" />
    <path d="M78 182 V158 a22 22 0 0 1 44 0 V182" />
    <path d="M56 128 h10 M60 140 h14 M128 132 h12 M132 150 h14 M50 162 h12 M138 166 h12" opacity=".55" />
    <path d="M62 180 L86 168 M138 180 L114 168" />
    <path className="flame" d={flamePath(100, 176, 26, 11)} />
    <path className="flame" d={flamePath(90, 176, 14, 6)} />
    <path d="M60 104 C60 82 76 70 100 70 C124 70 140 82 140 104" />
    <ellipse cx="100" cy="70" rx="40" ry="5" />
    <path d="M60 84 c-9 0 -9 10 0 10 M140 84 c9 0 9 10 0 10" />
    <Steam y={60} />
  </Svg>
);

// Cobek and ulekan: stone mortar with sambal and chillies
export const Cobek = ({ className, title }) => (
  <Svg className={className} title={title}>
    <ellipse cx="100" cy="120" rx="64" ry="14" />
    <path d="M36 120 C40 150 70 162 100 162 C130 162 160 150 164 120" />
    <path d="M80 161 L76 170 H124 L120 161" />
    <path d="M52 122 C70 129 88 124 100 128 C114 132 132 126 148 123" opacity=".6" />
    <path d="M66 126 l2 2 M84 128 l1 2 M122 128 l2 1 M104 131 l1 2" opacity=".6" />
    <path d="M112 128 C108 124 110 118 114 116 L146 66 C150 60 159 64 156 71 L126 124 C123 129 116 131 112 128 Z" />
    <path d="M141 77 l8 4" opacity=".5" />
    <path d="M44 104 C48 92 64 86 78 92 C68 94 58 100 54 110 Z" />
    <path d="M78 92 c3 -4 6 -5 9 -4" />
    <path d="M60 112 C66 104 80 102 88 108 C80 108 72 112 68 116 Z" />
    <path d="M88 108 c3 -2 6 -2 8 0" />
    <circle cx="34" cy="160" r="5" />
    <circle cx="44" cy="166" r="4" />
    <path d="M32 156 l2 -3" />
  </Svg>
);

// Enamel "blirik" mug of wedang, the everyday Javanese cup
export const Blirik = ({ className, title }) => (
  <Svg className={className} title={title}>
    <ellipse cx="96" cy="178" rx="60" ry="8" />
    <path d="M60 92 V160 C60 168 68 172 76 172 H116 C124 172 132 168 132 160 V92" />
    <ellipse cx="96" cy="92" rx="36" ry="6" />
    <path d="M62 100 C80 106 112 106 130 100" opacity=".5" />
    <path d="M132 110 C154 110 156 144 132 146" />
    <path d="M132 118 C144 118 146 138 132 138" opacity=".6" />
    {[
      [72, 116], [88, 124], [104, 114], [118, 128], [76, 140], [96, 146], [114, 152], [84, 160], [124, 112], [70, 128],
    ].map(([cx, cy]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" />
    ))}
    <path d="M148 170 C150 160 164 158 168 164 C174 162 182 168 176 175 C170 179 154 179 148 170 Z" />
    <path d="M156 168 l4 3 M166 166 l3 4" opacity=".6" />
    <Steam x={96} y={80} gap={11} />
  </Svg>
);

// Charcoal grill with skewers, for the bakaran
export const Bakaran = ({ className, title }) => (
  <Svg className={className} title={title}>
    <path d="M36 140 H164 L152 176 H48 Z" />
    <path d="M56 176 L50 190 M144 176 L150 190" />
    <path d="M48 140 V134 M76 140 V134 M104 140 V134 M132 140 V134 M156 140 V134" opacity=".5" />
    <path d="M58 150 c6 -6 12 -6 16 0 c6 -6 12 -6 16 0 c6 -6 12 -6 16 0 c6 -6 12 -6 16 0 c6 -6 12 -6 16 0" opacity=".6" />
    {[118, 104].map((y, row) => (
      <g key={y}>
        <path d={`M24 ${y + 6} L176 ${y - 2}`} />
        {[64, 86, 108, 130].map((cx) => (
          <ellipse key={cx} cx={cx + row * 6} cy={y + 2 - (cx - 64) / 22} rx="9" ry="7" transform={`rotate(-4 ${cx + row * 6} ${y})`} />
        ))}
      </g>
    ))}
    <path className="flame" d={flamePath(70, 138, 14, 6)} />
    <path className="flame" d={flamePath(124, 138, 18, 7)} />
    <g className="steam">
      <path d="M84 90 c-6 -8 6 -14 0 -22 c-4 -6 2 -10 0 -16" />
      <path d="M106 86 c-6 -8 6 -14 0 -22 c-4 -6 2 -10 0 -16" />
      <path d="M128 90 c-6 -8 6 -14 0 -22 c-4 -6 2 -10 0 -16" />
    </g>
  </Svg>
);

// Kendil, the round clay pot gudeg is slow-cooked in, on a teak leaf
export const Kendil = ({ className, title }) => (
  <Svg className={className} title={title}>
    <path d="M22 176 C60 150 140 150 180 176 C140 190 60 190 22 176 Z" />
    <path d="M22 176 H180 M60 168 L72 176 M100 162 V176 M140 168 L128 176" opacity=".5" />
    <path d="M62 158 C40 128 58 88 100 88 C142 88 160 128 138 158 C128 172 72 172 62 158 Z" />
    <path d="M80 88 C80 80 84 76 88 74 H112 C116 76 120 80 120 88" />
    <ellipse cx="100" cy="74" rx="14" ry="3" />
    <path d="M56 118 C80 128 120 128 144 118" />
    <path d="M58 126 C80 136 120 136 142 126" opacity=".6" />
    <path d="M70 108 l4 6 M84 112 l3 6 M100 113 v6 M116 112 l-3 6 M130 108 l-4 6" opacity=".5" />
    <Steam y={66} gap={10} />
  </Svg>
);

// Simple line map for the location placeholder
export const MapSketch = ({ className }) => (
  <Svg className={className} viewBox="0 0 320 220" strokeWidth={1.2}>
    <path d="M0 150 C60 140 90 160 150 140 C210 120 250 130 320 110" />
    <path d="M0 158 C60 148 90 168 150 148 C210 128 250 138 320 118" />
    <path d="M110 0 C120 60 100 120 130 220" />
    <path d="M220 0 L200 220" opacity=".6" />
    <path d="M0 60 H320" opacity=".35" strokeDasharray="4 6" />
    <rect x="30" y="80" width="46" height="34" opacity=".5" />
    <rect x="236" y="40" width="54" height="40" opacity=".5" />
    <rect x="150" y="170" width="40" height="30" opacity=".5" />
    <path d="M165 120 C165 100 195 100 195 120 C195 134 180 146 180 152 C180 146 165 134 165 120 Z" />
    <circle cx="180" cy="119" r="5" />
  </Svg>
);

// Kawung ornament between rules
export const Ornament = ({ className = "" }) => (
  <div className={`flex items-center gap-3 text-terra ${className}`} aria-hidden>
    <span className="h-px flex-1 bg-current opacity-50" />
    <Svg className="h-5 w-5" viewBox="0 0 40 40" strokeWidth={1.3}>
      <ellipse cx="20" cy="10" rx="5" ry="9" />
      <ellipse cx="20" cy="30" rx="5" ry="9" />
      <ellipse cx="10" cy="20" rx="9" ry="5" />
      <ellipse cx="30" cy="20" rx="9" ry="5" />
    </Svg>
    <span className="h-px flex-1 bg-current opacity-50" />
  </div>
);

// Circular rubber stamp. Rotation is driven from outside (scroll), so it stays static without motion.
export const Stamp = ({ className = "", text = "PAWON KEMEPYAR · MASAKAN NUSANTARA · DARI PAWON · " }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden>
    <defs>
      <path id="stamp-circle" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
    </defs>
    <g fill="none" stroke="currentColor">
      <circle cx="100" cy="100" r="94" strokeWidth="2" />
      <circle cx="100" cy="100" r="88" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="54" strokeWidth="0.8" />
    </g>
    <text fill="currentColor" className="font-serif" fontSize="15.5" fontWeight="600" letterSpacing="3.2">
      <textPath href="#stamp-circle" textLength="462">
        {text}
      </textPath>
    </text>
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={flamePath(100, 124, 46, 17)} />
      <path d={flamePath(100, 124, 22, 8)} />
      <path d="M78 130 H122" />
    </g>
  </svg>
);
