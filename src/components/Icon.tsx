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
  expansion: '<rect x="3.5" y="9" width="8" height="8"/><rect x="12.5" y="4" width="8" height="8"/>',
  plus: '<path d="M12 5 V19"/><path d="M5 12 H19"/>',
  close: '<path d="M6 6 L18 18"/><path d="M18 6 L6 18"/>',
  whatsapp: '<path d="M5 19 L7.5 16.2 H18 a2 2 0 0 0 2-2 V7 a2 2 0 0 0-2-2 H6 a2 2 0 0 0-2 2 v8.5 z"/><path d="M9 10 H15"/><path d="M9 13 H13"/>',
  route: '<path d="M5 19 H19"/><path d="M5 19 L9 8"/><path d="M9 8 L13 15"/><path d="M13 15 L19 5"/>',
  measure: '<path d="M5 18 H19"/><path d="M7 18 V12"/><path d="M12 18 V8"/><path d="M17 18 V5"/><path d="M7 12 L12 8 L17 5"/>',
  franchise: '<rect x="4" y="13" width="6" height="7"/><rect x="14" y="13" width="6" height="7"/><rect x="9" y="4" width="6" height="7"/>',
  product: '<path d="M12 4 L20 8 V16 L12 20 L4 16 V8 Z"/><path d="M12 20 V8"/><path d="M4 8 L12 12 L20 8"/>',
  journey: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="7" r="1.6"/><circle cx="19" cy="15" r="1.6"/><path d="M6.6 11.2 L10.4 8"/><path d="M13.6 8.2 L17.4 13.8"/>',
  executive: '<path d="M12 4 V20"/><path d="M6 8 H18"/><path d="M8 8 V20"/><path d="M16 8 V20"/>',
  campaign: '<path d="M5 9 V15 H9 L13 19 V5 L9 9 Z"/><path d="M16 9 C18 10 18 14 16 15"/><path d="M18 7 C21 9 21 15 18 17"/>',
  system: '<rect x="4" y="4" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><path d="M10 7 H14"/><path d="M17 10 V14"/>',
  automation: '<path d="M7 8 A6 6 0 1 1 6 12"/><path d="M7 8 L4.5 9.5"/><path d="M7 8 L8.8 5.8"/>',
  brand: '<path d="M12 3 L19 8 V16 L12 21 L5 16 V8 Z"/>',
  activation: '<path d="M6 6 V18 L18 12 Z"/>',
  healthcare: '<rect x="5" y="5" width="14" height="14"/><path d="M12 8 V16"/><path d="M8 12 H16"/>',
  fmcg: '<path d="M4 18 H20"/><path d="M6 18 V11 H10 V18"/><path d="M11 18 V8 H15 V18"/><path d="M16 18 V13 H19 V18"/>',
  hospitality: '<path d="M4 18 H20"/><path d="M6 18 V11 C6 7 18 7 18 11 V18"/>',
  retail: '<path d="M5 10 H19 L17.5 18 H6.5 Z"/><path d="M8 10 V6 H16 V10"/>',
  ecommerce: '<rect x="6" y="8" width="12" height="11"/><path d="M9 8 V6 C9 4 15 4 15 6 V8"/><path d="M6 12 H18"/>',
  education: '<path d="M4 10 L12 6 L20 10 L12 14 Z"/><path d="M7 12 V17 L12 19 L17 17 V12"/>'
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
