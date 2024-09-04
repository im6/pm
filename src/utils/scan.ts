import * as fs from "fs";
import * as path from "path";
import { v4 } from "uuid";
import { PmNode } from "../types";
import numeral from "numeral";

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
        if (seq.length === 0) {
          continue;
        } else {
          seqDone = true;
        }
      }
    }
    if (pubDone && seqDone) {
      break;
    }
  }
  return [publisher, seq.replace(/^0+/, "")];
};

export const getFolderSize = (folderPath: string) => {
  let totalSize = 0;

  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // will not go down
    } else {
      totalSize += stats.size;
    }
  });
  return numeral(totalSize).format("0.00b");
};

export const scanDirectory = (dirPath: string): PmNode[] => {
  let results: PmNode[] = [];

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
              const pmid = getPmIdFromDirectory(filePath);
              const pubSeq = extractPubSeq(folderName);
              results.push({
                id: pmid,
                sid: `${pubSeq[0]}${pubSeq[1]}`,
                size: getFolderSize(filePath),
                path: filePath,
                type: "directory",
              });
            } catch (error) {
              console.error(error, "Scan error");
            }
          } else {
            results = results.concat(scanDirectory(filePath));
          }
        } else {
          // not folder, don't do anything so far
        }
      } catch (error: any) {
        console.error(`Error accessing ${filePath}: ${error.message}`);
      }
    });
  } catch (error: any) {
    console.error(`Error reading directory ${dirPath}: ${error.message}`);
    return [];
  }

  return results;
};

export const combineToFolder = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    return;
  }
  const list = fs.readdirSync(dirPath);
  const uniqImg: any = {};
  const uniqVideo: any = {};
  list.forEach((file) => {
    if (!/.mp4/.test(file) && !/.jpg/.test(file)) {
      return;
    }
    const pubSeq = extractPubSeq(file);
    if (!pubSeq[0] || !pubSeq[1]) {
      return;
    }
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

export const getPmIdFromDirectory = (dirPath: string): string => {
  const fileName: string = "pmid.txt";
  const idFilePath: string = path.join(dirPath, fileName);
  try {
    const accessErr = fs.accessSync(idFilePath, fs.constants.F_OK);
    if (accessErr) {
      console.error("pmid detect error");
      return "";
    }
    const id = fs.readFileSync(idFilePath, "utf8");
    return id;
  } catch (error: any) {
    if (error.code === "ENOENT") {
      // not existed, will create new PmID
      const newId = v4();
      fs.writeFile(idFilePath, newId, (err: NodeJS.ErrnoException | null) => {
        if (err) {
          console.error("Error creating file:", err);
        } else {
          console.log(`File created successfully: ${dirPath}`);
        }
      });
      return newId;
    } else {
      console.error("pmid detect error");
      return "";
    }
  }
};

export const deleteNodeDirectory = (folderPath: string) => {
  try {
    fs.rmSync(folderPath, { recursive: true });
    return { data: "remove successfully.", error: false };
  } catch (error) {
    return { data: null, error: "directory is already removed." };
  }
};
