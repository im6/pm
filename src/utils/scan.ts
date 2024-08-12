import * as fs from "fs";
import * as path from "path";
import { v4 } from "uuid";
import { FileSystemEntry } from "../types";

const namePattern = /^[a-zA-Z]+(\d)+(\W|)*$/;

const getEndFolderName = (fullPath: string) => {
  const pathMembers = fullPath.split("/");
  const folderName = pathMembers[pathMembers.length - 1];
  const shortName = folderName.replace(/_.+/, "");
  return shortName;
};

export const extractPubSeq = (endName: string) => {
  let publisher = "";
  let pubDone = false;
  let seq = "";
  let seqDone = false;
  for (let i = 0; i < endName.length; i += 1) {
    if (!pubDone) {
      if (/[a-zA-Z]/.test(endName[i])) {
        publisher += endName[i].toLowerCase();
      } else {
        pubDone = true;
      }
    }
    if (pubDone && !seqDone) {
      if (/\d/.test(endName[i])) {
        seq += endName[i];
      } else {
        seqDone = true;
      }
    }
    if (pubDone && seqDone) {
      break;
    }
  }
  return [publisher, seq.replace(/^0+/, "")];
};

export const scanDirectory = (dirPath: string): FileSystemEntry[] => {
  let results: FileSystemEntry[] = [];

  try {
    const list = fs.readdirSync(dirPath);
    list.forEach((file) => {
      const filePath = path.join(dirPath, file);
      try {
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
          const folderName = getEndFolderName(filePath);
          if (namePattern.test(folderName)) {
            try {
              const pmid = fs.readFileSync(`${filePath}/pmid.txt`, "utf8");
              const pubSeq = extractPubSeq(folderName);
              results.push({
                sid: `${pubSeq[0]}${pubSeq[1]}`,
                path: filePath,
                type: "directory",
                id: pmid,
              });
            } catch (error) {
              results.push({
                sid: folderName,
                path: filePath,
                type: "directory",
              });
            }
          } else {
            results = results.concat(scanDirectory(filePath));
          }
        } else {
          const folderName = getEndFolderName(filePath);
          if (namePattern.test(folderName)) {
            results.push({ path: filePath, type: "file" });
          }
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

export const combineToFolder = (dirPath: string) => {
  const list = fs.readdirSync(dirPath);
  const uniqImg: any = {};
  const uniqVideo: any = {};
  list.forEach((file) => {
    const pubSeq = extractPubSeq(file);
    const normalizeFile = `${pubSeq[0]}${pubSeq[1]}`;
    if (/.mp4/.test(file)) {
      uniqVideo[normalizeFile] = file;
    }
    if (/.jpg/.test(file)) {
      uniqImg[normalizeFile] = file;
    }
    if (
      uniqImg.hasOwnProperty(normalizeFile) &&
      uniqVideo.hasOwnProperty(normalizeFile)
    ) {
      const newFolderPath = path.join(dirPath, normalizeFile);
      if (!fs.existsSync(newFolderPath)) {
        fs.mkdirSync(newFolderPath);
        console.log(`Directory created at ${newFolderPath}`);
      }
      try {
        fs.renameSync(
          path.join(dirPath, uniqImg[normalizeFile]),
          path.join(dirPath, normalizeFile, `${normalizeFile}.jpg`)
        );
        fs.renameSync(
          path.join(dirPath, uniqVideo[normalizeFile]),
          path.join(dirPath, normalizeFile, `${normalizeFile}.mp4`)
        );
      } catch (error) {
        console.error(`Error on moving ${normalizeFile}`);
      }
    }
  });
};

export const addIdToDirectory = (dirPath: string) => {
  const a = scanDirectory(dirPath);
  for (let i = 0; i < a.length; i += 1) {
    const fileName: string = "pmid.txt";
    const idFilePath: string = path.join(a[i].path, fileName);
    fs.access(
      idFilePath,
      fs.constants.F_OK,
      (err: NodeJS.ErrnoException | null) => {
        if (err && err.code === "ENOENT") {
          fs.writeFile(
            idFilePath,
            v4(),
            (err: NodeJS.ErrnoException | null) => {
              if (err) {
                console.error("Error creating file:", err);
              } else {
                console.log(`File created successfully: ${a[i].path}`);
              }
            }
          );
        } else {
          // existed, do nothing
        }
      }
    );
  }
};
