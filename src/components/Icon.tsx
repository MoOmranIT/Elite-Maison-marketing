import type { SVGProps } from "react";

const PATHS: Record<string, string> = {
  arrow: '<polyline points="5 12 19 12"/><polyline points="13 6 19 12 13 18"/>',
  arrowRtl: '<polyline points="19 12 5 12"/><polyline points="11 6 5 12 11 18"/>',
  home: '<path d="M4 12 L12 5 L20 12"/><path d="M6.5 11 V20 H17.5 V11"/><path d="M10 20 V14.5 H14 V20"/><path d="M12 5 V8.5"/>',
  about: '<path d="M5 20 V9.5 L12 4 L19 9.5 V20"/><path d="M9.5 20 V13.5 H14.5 V20"/><path d="M8 9.5 H16"/>',
  consult: '<path d="M4 20 V8"/><path d="M4 8 C4 4 12 4 12 8 C12 12 20 12 20 8 V20"/><path d="M12 8 V20"/>',
  execute: '<rect x="4" y="4" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/><path d="M10 7 H14 C16 7 17 8 17 10 V14"/>',
  proof: '<path d="M7 3 h8 l5 5 v13 H7 z"/><path d="M15 3 v5 h5"/><path d="M10 13 h6"/><path d="M10 17 h4"/>',
  insight: '<path d="M8 4 h8 v12 H8 z"/><path d="M10 8 h4"/><path d="M10 12 h3"/><path d="M9 20 h6"/>',
  sector: '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
  contact: '<rect x="4" y="6" width="16" height="12"/><path d="M4 8 l8 6 8-6"/>',
  mail: '<rect x="3" y="6" width="18" height="12"/><path d="M3 7 l9 7 9-7"/>',
  phone: '<path d="M7 3 h4 l1 4 -3 2 c1 3 4 6 7 7 l2-3 4 1 v4 c-7 1-16-8-15-15 z"/>',
  direction: '<path d="M12 3 V21"/><path d="M12 3 L8 7.5"/><path d="M12 3 L16 7.5"/><path d="M5 13 H19"/>',
  revenue: '<path d="M4 19 H20"/><path d="M7 19 V13"/><path d="M12 19 V8"/><path d="M17 19 V5"/>',
  expansion: '<rect x="3.5" y="9" width="8" height="8"/><rect x="12.5" y="4" width="8" height="8"/>'
};

export function Icon({
  name,
  className = "icon",
  rtl = false
}: {
  name: string;
  className?: string;
  rtl?: boolean;
} & SVGProps<SVGSVGElement>) {
  const key = rtl && name === "arrow" ? "arrowRtl" : name;
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: PATHS[key] || PATHS.arrow }} />
  );
}

export function Dots() {
  return (
    <span className="dots" aria-hidden="true">
      <i /><i /><i /><i />
    </span>
  );
}
