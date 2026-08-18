import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-08-18";

/** Mock mode is the default and stays on until Gryd's Sanity project id is set. */
export const usingSanity = Boolean(projectId);

export const client = usingSanity
  ? createClient({ projectId: projectId as string, dataset, apiVersion, useCdn: true })
  : null;

export async function fetchFromSanity<T>(query: string, params: Record<string, unknown> = {}) {
  if (!client) throw new Error("Sanity is not configured, the mock content layer should be used");
  return client.fetch<T>(query, params);
}
