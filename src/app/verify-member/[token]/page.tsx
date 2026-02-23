import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { VerifyMemberForm } from "@/components/member/verify-member-form";
import { authOptions } from "@/server/auth";
import { checkVerificationToken } from "@/server/member";

export const metadata: Metadata = {
  title: "Verify member",
};

export default async function VerifyMember({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{
    passwordResetToken: string;
    email: string;
  }>;
}) {
  const { token } = await params;
  const { passwordResetToken, email } = await searchParams;
  const session = await getServerSession(authOptions);

  const queryParams = new URLSearchParams({
    email: email,
    verificationToken: token,
  });

  if (!session?.user || !session?.user.email) {
    redirect(`/set-password/${passwordResetToken}?${queryParams.toString()}`);
  }

  // check if token is valid
  const { memberId } = await checkVerificationToken(token, session.user.email);

  return <VerifyMemberForm memberId={memberId} token={token} />;
}
