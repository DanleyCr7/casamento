const GUEST_NAME_PARAM_KEYS = ["nome", "name", "para"] as const;

export const DEFAULT_GUEST_NAME = "Você";

function decodeParamValue(value: string) {
  try {
    return decodeURIComponent(value.replace(/\+/g, " "));
  } catch {
    return value.replace(/\+/g, " ");
  }
}

export function formatGuestName(value: string) {
  return decodeParamValue(value).trim().replace(/\s+/g, " ");
}

export function getGuestNameFromSearchParams(
  searchParams: Pick<URLSearchParams, "get"> | null | undefined,
) {
  if (!searchParams) {
    return DEFAULT_GUEST_NAME;
  }

  for (const key of GUEST_NAME_PARAM_KEYS) {
    const raw = searchParams.get(key);
    if (!raw) {
      continue;
    }

    const formatted = formatGuestName(raw);
    if (formatted.length > 0) {
      return formatted;
    }
  }

  return DEFAULT_GUEST_NAME;
}
