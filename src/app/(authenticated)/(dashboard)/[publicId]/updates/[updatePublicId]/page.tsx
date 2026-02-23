"use server";
import dynamic from "next/dynamic";
import { db } from "@/server/db";

const Editor = dynamic(
  () => import("../../../../../../components/update/editor"),
  { ssr: false },
);

const getUpdate = async (publicId: string) => {
  return await db.update.findFirstOrThrow({
    where: { publicId },
  });
};

const UpdatePage = async ({
  params,
}: {
  params: Promise<{ publicId: string; updatePublicId: string }>;
}) => {
  const { publicId, updatePublicId } = await params;
  if (updatePublicId === "new") {
    return <Editor companyPublicId={publicId} mode="new" />;
  }
  const update = await getUpdate(updatePublicId);

  return <Editor companyPublicId={publicId} update={update} mode="edit" />;
};

export default UpdatePage;
