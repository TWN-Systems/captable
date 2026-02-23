import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/onboarding/reset-password";

export const metadata: Metadata = {
  title: "Reset Password",
};

export type PageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function ResetPasswordPage({ params }: PageProps) {
  const { token } = await params;
  return <ResetPasswordForm token={token} />;
}
