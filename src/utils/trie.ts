import { PmTrieNode, FileSystemEntry } from "@/types";
import { extractPubSeq } from "./scan";

export const updatePmTrie = (oneFs: FileSystemEntry, oldTree: PmTrieNode) => {
  if (!oneFs.sid) {
    console.log(oneFs.sid!, "oneFs.sid!", JSON.stringify(oneFs));
  }

  const [alphaPart, numPart] = extractPubSeq(oneFs.sid!);
  const newTree = JSON.parse(JSON.stringify(oldTree));
  let currentNode = newTree;

  for (let i = 0; i < alphaPart.length; i += 1) {
    if (!currentNode.children[alphaPart[i]]) {
      currentNode.children[alphaPart[i]] = { children: {} };
    }
    currentNode = currentNode.children[alphaPart[i]];
  }
  for (let i = 0; i < numPart.length; i += 1) {
    if (!currentNode.children[numPart[i]]) {
      currentNode.children[numPart[i]] = { children: {} };
    }
    currentNode = currentNode.children[numPart[i]];
  }
  if (!Array.isArray(currentNode.p)) {
    currentNode.p = [oneFs];
    return newTree;
  } else {
    const existedSid: FileSystemEntry | undefined = currentNode.p.find(
      (v: FileSystemEntry) => v.id === oneFs.id
    );
    if (existedSid) {
      if (existedSid.path !== oneFs.path) {
        console.log("exited, but folder moved to new directory");
        currentNode.p = currentNode.p.filter(
          (v: FileSystemEntry) => v.id !== oneFs.id
        );
        currentNode.p.push(oneFs);
      } else {
        // exited and no change
      }
    } else {
      currentNode.p.push(oneFs);
      console.log("duplication detected.");
    }
    return newTree;
  }
};

const traverse = (tree: PmTrieNode) => {
  let res: any[] = [];

  const trv = (node: PmTrieNode) => {
    if (node.p) {
      res = res.concat(node);
    }
    Object.keys(node.children).forEach((char) => {
      trv(node.children[char]);
    });
  };
  trv(tree);
  return res;
};

export const getDup = (tree: PmTrieNode) => {
  const flat = traverse(tree);
  const dup = flat.filter((v) => v.p.length > 1).map((v) => v.p);
  return dup;
};

export const searchNode = (tree: PmTrieNode, word: string) => {
  let cur = tree;
  for (let i = 0; i < word.length; i += 1) {
    if (word[i] in cur.children) {
      cur = cur.children[word[i]];
    } else {
      return false;
    }
  }
  return cur;
};
