export function OniriaMark({ size = 80, color = '#b388e8' }: { size?: number; color?: string }) {
  // size = total SVG height (viewBox 80×120)
  const w = size * (80 / 120)
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 80 120"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Outer circle — body from y=28 to y=92 */}
      <circle cx="40" cy="60" r="32" />
      {/* Left meridian arc */}
      <path d="M40,28 C12,44 12,76 40,92" />
      {/* Right meridian arc */}
      <path d="M40,28 C68,44 68,76 40,92" />
      {/* Vertical vesica piscis */}
      <path d="M40,28 C60,44 60,76 40,92 C20,76 20,44 40,28 Z" />
      {/* Inner horizontal eye */}
      <path d="M29,60 Q40,53 51,60 Q40,67 29,60 Z" />
      {/* Top sparkle */}
      <path d="M40,11 L41.8,19.2 L48,21 L41.8,22.8 L40,31 L38.2,22.8 L32,21 L38.2,19.2 Z" strokeWidth="0.8" fill={color} />
      {/* Bottom sparkle */}
      <path d="M40,89 L41.8,97.2 L48,99 L41.8,100.8 L40,109 L38.2,100.8 L32,99 L38.2,97.2 Z" strokeWidth="0.8" fill={color} />
      {/* Dots */}
      <circle cx="40" cy="7" r="1.8" fill={color} stroke="none" />
      <circle cx="40" cy="113" r="1.8" fill={color} stroke="none" />
    </svg>
  )
}

// eyeBody is the region inside the outer circle: y=28..92 out of 120
// To make the eye body match a target pixel height: totalSize = targetH * (120/64)
const EYE_RATIO = 120 / 64  // scale factor: totalMarkHeight per pixel of eye body

// Wordmark — mark as the "O", NIRIA collapses on scroll so the mark re-centers naturally.
export function OniriaLogoFull({
  fontSize = 48,
  color = '#b388e8',
  scrolled = false,
}: {
  fontSize?: number
  color?: string
  scrolled?: boolean
}) {
  const eyeBodyH = fontSize * 1.12
  const totalMarkH = eyeBodyH * EYE_RATIO

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Mark — fixed size, always visible */}
      <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
        <OniriaMark size={totalMarkH} color={color} />
      </span>

      {/* NIRIA — collapses width + fades so the mark re-centers */}
      <span
        aria-hidden={scrolled}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: `${fontSize}px`,
          fontWeight: 400,
          letterSpacing: '0.13em',
          textTransform: 'uppercase',
          color,
          lineHeight: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          display: 'inline-block',
          // Collapse width to 0 — collapses left-margin gap too
          maxWidth: scrolled ? '0' : '300px',
          marginLeft: scrolled ? '0' : `-${fontSize * 0.04}px`,
          opacity: scrolled ? 0 : 1,
          transition: [
            'max-width 0.42s cubic-bezier(0.4,0,0.2,1)',
            'margin-left 0.42s cubic-bezier(0.4,0,0.2,1)',
            'opacity 0.28s cubic-bezier(0.4,0,0.2,1)',
          ].join(', '),
          pointerEvents: scrolled ? 'none' : 'auto',
        }}
        className="logo-niria"
      >
        NIRIA
      </span>
    </div>
  )
}
