import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useHashSelect(ids: string[], fallback: string) {
  const location = useLocation();
  const [id, setId] = useState(() => {
    const hash = window.location.hash.replace(/^#/, "");
    return ids.includes(hash) ? hash : fallback;
  });

  useEffect(() => {
    const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (ids.includes(hash)) setId(hash);
  }, [location.hash, ids, fallback]);

  function select(next: string) {
    setId(next);
    const url = `${window.location.pathname}${window.location.search}#${next}`;
    history.replaceState({}, "", url);
  }

  return [id, select] as const;
}

export function useCompact(query = "(max-width: 820px)") {
  const [compact, setCompact] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setCompact(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return compact;
}
