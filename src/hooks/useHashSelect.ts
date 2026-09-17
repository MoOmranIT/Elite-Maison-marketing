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
  const [id, setId] = useState(() => {
    const hash = safeHash(window.location.hash);
    return ids.includes(hash) ? hash : fallback;
  });

  useEffect(() => {
    const hash = safeHash(location.hash);
    if (ids.includes(hash)) setId(hash);
  }, [location.hash, ids, fallback]);

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
  const [compact, setCompact] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setCompact(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return compact;
}
