import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function safeHash(hash: string) {
  const raw = hash.replace(/^#/, "");
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export function useHashSelect(ids: string[], fallback: string) {
  const location = useLocation();
  const navigate = useNavigate();
  // SSR-safe: initial state is always the deterministic fallback.
  // After hydration, useEffect syncs with the actual URL hash.
  const [id, setId] = useState(fallback);

  useEffect(() => {
    const hash = safeHash(location.hash);
    if (ids.includes(hash)) setId(hash);
  }, [location.hash, ids]);

  function select(next: string) {
    setId(next);
    navigate({
      pathname: location.pathname,
      search: location.search,
      hash: `#${next}`
    }, { replace: true });
  }

  return [id, select] as const;
}

export function useCompact(query = "(max-width: 820px)") {
  // SSR-safe: deterministic initial value (false = desktop layout).
  // After hydration, useEffect syncs with actual matchMedia.
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setCompact(mq.matches);
    const onChange = () => setCompact(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return compact;
}
