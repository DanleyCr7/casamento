const GUEST_NAME_PARAM_KEYS = ["nome", "name", "para"] as const;

export const DEFAULT_GUEST_NAME = "Você";

export function getGuestNameFromSearchParams(
  searchParams: Pick<URLSearchParams, "get"> | null | undefined,
) {
  for (const key of GUEST_NAME_PARAM_KEYS) {
    const raw = searchParams?.get(key);
    if (!raw) continue;

    // URLSearchParams already decodes accents, spaces and other URL characters.
    const name = raw.trim().replace(/\s+/g, " ").slice(0, 120).trimEnd();
    if (name) return name;
  }

  return DEFAULT_GUEST_NAME;
}
