import { Suspense } from "react";
import InvitePage from "@/components/invite-page";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <InvitePage />
    </Suspense>
  );
}
