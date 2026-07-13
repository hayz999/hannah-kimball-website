import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import type { AdminSession} from "@/lib/session";
import { sessionOptions } from "@/lib/session";
import AdminNav from "./AdminNav";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = await getIronSession<AdminSession>(
    cookieStore,
    sessionOptions,
  );
  if (!session.isLoggedIn) {
    redirect("/admin/login");
  }
  return (
    <>
      <AdminNav />
      {children}
    </>
  );
}
