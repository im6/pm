export type FileSystemEntry = {
  path: string;
  type: "file" | "directory";
};

export type Movie = {
  img: string;
  video: string;
  tag: string[];
};
