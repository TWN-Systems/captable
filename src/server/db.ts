import { PrismaClient } from "@prisma/client";
import { pagination } from "prisma-extension-pagination";
import { env } from "@/env";
import type { TTemplateFieldMetaType } from "@/trpc/routers/template-field-router/schema";

declare global {
  namespace PrismaJson {
    type TemplateFieldMeta = TTemplateFieldMetaType;
  }
}

function getExtendedClient() {
  return new PrismaClient({
    log: env.LOGS ? ["query", "error", "warn"] : ["error"],
  }).$extends(pagination());
}

const globalForPrisma = globalThis as unknown as {
  prisma: ExtendedPrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? getExtendedClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export type PrismaTransactionalClient = Parameters<
  Parameters<TPrisma["$transaction"]>[0]
>[0];

export type TPrisma = typeof db;

export type TPrismaOrTransaction = TPrisma | PrismaTransactionalClient;
export type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>;
