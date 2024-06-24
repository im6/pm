import { Movie } from "@/types";
import * as fs from "fs";
import * as path from "path";

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

export const initialDb = () => {
  for (let i = 0; i < initials.length; i += 1) {
    const data = readOrCreateFile(getFilePath(initials[i]), initialContent);
    console.log(data);
  }
};

export const saveToDb = (code: string, movie: Movie) => {
  const file = code[0];
  const restPath = code.substring(1);
  console.log(file, restPath);
  const a = readOrCreateFile(getFilePath(file), "");
  console.log(a);
};
