import { FileSystemEntry, PmTrieNode } from "@/types";
import * as fs from "fs";
import * as path from "path";
import { updatePmTrie } from "./trie";

const initials = "abcdefghijklmnopqrstuvwxyz";
const getFilePath = (i: string) =>
  path.join(process.cwd(), `../pm-store/${i}.json`);

const initialContent = JSON.stringify({ children: {} });

const readOrCreateFile = (filePath: string, initialContent: string) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, initialContent, "utf8");
    console.log(`File created at ${filePath}`);
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
};

const writeTrieFile = (filePath: string, data: string) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, initialContent, "utf8");
    console.log(`File created at ${filePath}`);
  }
  fs.writeFileSync(filePath, data);
};

export const initialDb = () => {
  for (let i = 0; i < initials.length; i += 1) {
    const data = readOrCreateFile(getFilePath(initials[i]), initialContent);
    console.log(data);
  }
};

export const readOneCharDb = (oneChar: string) => {
  return readOrCreateFile(getFilePath(oneChar), '{"children": {}}');
};

export const writeOneCharDb = (oneChar: string, newTree: any) => {
  if (!newTree) return;
  writeTrieFile(getFilePath(oneChar), JSON.stringify(newTree));
};

export const readDb = () => {
  const mem: PmTrieNode = { children: {} };
  for (let i = 0; i < initials.length; i += 1) {
    mem.children[initials[i]] = readOneCharDb(initials[i]);
  }
  return mem;
};

const writeToDb = (newTree: PmTrieNode) => {
  for (let i = 0; i < initials.length; i += 1) {
    writeOneCharDb(initials[i], newTree.children[initials[i]]);
  }
};

export const syncDb = (movies: FileSystemEntry[]) => {
  const oldTree = readDb();
  let newTree = JSON.parse(JSON.stringify(oldTree));
  movies.forEach((v) => {
    if (v.type === "directory") {
      newTree = updatePmTrie(v, newTree);
    }
  });
  writeToDb(newTree);
};

export const saveToDb = (movies: FileSystemEntry[]) => {
  syncDb(movies);
};
