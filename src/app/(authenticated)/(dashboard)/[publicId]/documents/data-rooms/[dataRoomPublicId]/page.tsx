"use server";

import type { Bucket, DataRoom } from "@prisma/client";
import { notFound } from "next/navigation";
import { api } from "@/trpc/server";
import DataRoomFiles from "../components/data-room-files";

const DataRoomSettinsPage = async ({
  params,
}: {
  params: Promise<{ publicId: string; dataRoomPublicId: string }>;
}) => {
  const { publicId, dataRoomPublicId } = await params;
  const { dataRoom, documents } = await api.dataRoom.getDataRoom({
    dataRoomPublicId,
    include: {
      company: false,
      recipients: true,
      documents: true,
    },
  });
  const contacts = await api.common.getContacts();

  if (!dataRoom) {
    return notFound();
  }

  return (
    <DataRoomFiles
      contacts={contacts}
      dataRoom={dataRoom as DataRoom}
      documents={documents as Bucket[]}
      companyPublicId={publicId}
    />
  );
};

export default DataRoomSettinsPage;
