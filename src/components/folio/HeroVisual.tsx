export function RouteVisual() {
  const d = "M28 210 C40 150 48 120 70 96 C96 68 108 78 118 108 C130 144 148 128 168 52";
  return (
    <figure className="hero-visual hero-visual--route" aria-hidden="true">
      <svg viewBox="0 0 200 240" fill="none">
        <g className="hero-visual__layer hero-visual__layer--path">
          <path className="hero-visual__path" d={d} />
          <path className="hero-visual__sheen" d={d} />
        </g>
        <circle className="hero-visual__node" cx="28" cy="210" r="4" />
        <circle className="hero-visual__node" cx="70" cy="96" r="4" />
        <circle className="hero-visual__node" cx="118" cy="108" r="4" />
        <circle className="hero-visual__node" cx="168" cy="52" r="4" />
        <text x="38" y="214">01</text>
        <text x="80" y="94">02</text>
        <text x="128" y="106">03</text>
        <text x="176" y="50">04</text>
      </svg>
      <span className="hero-visual__arch" />
    </figure>
  );
}

export function SystemVisual() {
  return (
    <figure className="hero-visual hero-visual--system" aria-hidden="true">
      <span className="hero-visual__grid" />
      <svg viewBox="0 0 200 220" fill="none">
        <g className="hero-visual__layer hero-visual__layer--frame">
          <path className="hero-visual__path hero-visual__path--dash" d="M24 40 H176 V180 H24 Z" />
          <path className="hero-visual__sheen" d="M24 40 H176 V180 H24 Z" />
        </g>
        <rect className="hero-visual__mod" x="40" y="56" width="48" height="36" />
        <rect className="hero-visual__mod" x="112" y="56" width="48" height="36" />
        <rect className="hero-visual__mod" x="40" y="116" width="48" height="36" />
        <rect className="hero-visual__mod" x="112" y="116" width="48" height="36" />
        <g className="hero-visual__layer hero-visual__layer--links">
          <path className="hero-visual__path" d="M88 74 H112 M64 92 V116 M136 92 V116 M88 134 H112" />
        </g>
      </svg>
    </figure>
  );
}

export function AtlasVisual() {
  return (
    <figure className="hero-visual hero-visual--atlas" aria-hidden="true">
      <span className="hero-visual__plates">
        <i /><i className="is-on" /><i /><i /><i /><i />
      </span>
      <span className="hero-visual__arch" />
    </figure>
  );
}

export function ProofVisual() {
  const d = "M36 188 V48 H148 L164 64 V188 Z";
  return (
    <figure className="hero-visual hero-visual--proof" aria-hidden="true">
      <span className="hero-visual__arch" />
      <svg viewBox="0 0 200 220" fill="none">
        <g className="hero-visual__layer hero-visual__layer--path">
          <path className="hero-visual__path" d={d} />
          <path className="hero-visual__sheen" d={d} />
        </g>
        <path className="hero-visual__path hero-visual__path--dash" d="M36 64 H148" />
        <path className="hero-visual__path" d="M58 96 H128 M58 118 H112 M58 140 H96" />
        <circle className="hero-visual__node" cx="164" cy="64" r="4" />
      </svg>
    </figure>
  );
}

export function QuietVisual() {
  const d = "M28 150 C70 40 130 40 172 150";
  return (
    <figure className="hero-visual hero-visual--quiet" aria-hidden="true">
      <span className="hero-visual__arch" />
      <svg viewBox="0 0 200 180" fill="none">
        <g className="hero-visual__layer hero-visual__layer--path">
          <path className="hero-visual__path" d={d} />
          <path className="hero-visual__sheen" d={d} />
        </g>
        <circle className="hero-visual__node" cx="100" cy="62" r="5" />
      </svg>
    </figure>
  );
}
