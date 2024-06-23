import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import * as path from "path";

const namePattern = /^[a-zA-Z]+(\d)+/;

type FileSystemEntry = {
  path: string;
  type: "file" | "directory";
};

type ResponseData = {
  message: string;
};

const scanDirectory = (dirPath: string): FileSystemEntry[] => {
  let results: FileSystemEntry[] = [];

  try {
    const list = fs.readdirSync(dirPath);
    list.forEach((file) => {
      const filePath = path.join(dirPath, file);
      try {
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
          const pathMembers = filePath.split("/");
          const folderName = pathMembers[pathMembers.length - 1];
          if (namePattern.test(folderName)) {
            results.push({ path: filePath, type: "directory" });
          } else {
            results = results.concat(scanDirectory(filePath));
          }
        } else {
          results.push({ path: filePath, type: "file" });
        }
      } catch (error: any) {
        console.error(`Error accessing ${filePath}: ${error.message}`);
      }
    });
  } catch (error: any) {
    console.error(`Error reading directory ${dirPath}: ${error.message}`);
  }

  return results;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const a = scanDirectory("/");
    console.log(a);
    res.status(200).json({ message: "Hello from Next.js!" });
  } else {
    res.status(200).json({ message: "Hello from Next.js!" });
  }
  res.status(200).json({ message: "Hello from Next.js!" });
}
