import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";

export default async function TimelineLayout({ children }) {
  if (process.env.NODE_ENV === "development") {
    return <>{children}</>;
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(config.auth.loginUrl);
  }

  return <>{children}</>;
}