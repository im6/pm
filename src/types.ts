export type FileSystemEntry = {
  id?: string;
  sid?: string;
  path: string;
  type: "file" | "directory";
};

export type Movie = {
  img: string;
  video: string;
  tag: string[];
};

export type PmTrieNode = {
  children: Record<string, PmTrieNode>;
  p?: FileSystemEntry[];
};
