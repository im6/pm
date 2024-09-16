export type PmNode = {
  id: string;
  sid: string;
  size?: string;
  path: string;
  type: "file" | "directory";
  isMounted?: boolean;
  note?: string;
};

export type PmTrieNode = {
  children: Record<string, PmTrieNode>;
  p?: PmNode[];
};
