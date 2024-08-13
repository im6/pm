export type PmNode = {
  id?: string;
  sid?: string;
  size?: string;
  path: string;
  type: "file" | "directory";
  node?: string;
  isMounted?: boolean;
};

export type PmTrieNode = {
  children: Record<string, PmTrieNode>;
  p?: PmNode[];
};
