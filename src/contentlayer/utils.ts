import type { DocumentGen } from "contentlayer/core";

export const urlFromFilePath = (doc: DocumentGen): string => {
  return doc._raw.flattenedPath.replace(/pages\/?/, "");
};
