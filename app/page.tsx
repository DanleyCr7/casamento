import InvitePage from "@/components/invite-page";

function normalizeQueryValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default function Page({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const rawName =
    normalizeQueryValue(searchParams?.nome) ||
    normalizeQueryValue(searchParams?.name) ||
    normalizeQueryValue(searchParams?.para);

  const guestName = rawName.trim().replace(/\s+/g, " ") || "Você";

  return <InvitePage guestName={guestName} />;
}
