import { readDb } from "./db";
import { searchNode } from "./trie";

export const searchPm = (keyword: string) => {
  const tree = readDb();
  return searchNode(tree, keyword);
};
