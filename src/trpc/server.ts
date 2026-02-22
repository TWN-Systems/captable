import "server-only";

import { createCallerFactory } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";

import { appRouter } from "@/trpc/api/root";
import { createTRPCContext } from "@/trpc/api/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
export const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");
  return createTRPCContext({ headers: heads });
});

const createCaller = createCallerFactory(appRouter);

export const api = createCaller(createContext);
