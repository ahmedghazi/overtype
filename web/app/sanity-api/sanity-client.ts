import { SanityClient, createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn, token } from "./sanity.api";

export const sanityConfig = {
  projectId: projectId,
  dataset: dataset,
};

export const client = createClient({
  projectId,
  dataset,
  apiVersion: apiVersion,
  useCdn,
  token,
});

export function getClient(preview?: { token?: string }): SanityClient {
  if (preview) {
    if (!preview.token) {
      throw new Error("You must provide a token to preview drafts");
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: "previewDrafts",
    });
  }
  return client;
}
