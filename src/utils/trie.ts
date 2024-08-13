import { PmTrieNode, PmNode } from "@/types";
import { extractPubSeq } from "./scan";

export const updatePmTrie = (oneFs: PmNode, oldTree: PmTrieNode) => {
  if (!oneFs.sid) {
    console.log(oneFs.sid!, "oneFs.sid!", JSON.stringify(oneFs));
    return;
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
    const existedSid: PmNode | undefined = currentNode.p.find(
      (v: PmNode) => v.id === oneFs.id
    );
    if (existedSid) {
      if (existedSid.path !== oneFs.path || existedSid.size !== oneFs.size) {
        currentNode.p = currentNode.p.filter((v: PmNode) => v.id !== oneFs.id);
        currentNode.p.push(oneFs);
      } else {
        // existed and no change
      }
    } else {
      currentNode.p.push(oneFs);
      console.log("duplication detected.");
    }
    return newTree;
  }
};

const traverseForDup = (tree: PmTrieNode) => {
  let res: any[] = [];

  const trv = (node: PmTrieNode) => {
    if (node.p && node.p.length > 1) {
      res.push(node.p);
    }
    Object.keys(node.children).forEach((char) => {
      trv(node.children[char]);
    });
  };
  trv(tree);
  return res;
};

export const getDup = (tree: PmTrieNode) => {
  return traverseForDup(tree);
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

const traverseForAvailable = (tree: PmTrieNode, mounted: any) => {
  let res: any[] = [];

  const trv = (node: PmTrieNode) => {
    if (node.p && node.p.length > 0) {
      node.p.forEach((v: PmNode) => {
        if (
          (/^\/Volumes\/disc/.test(v.path) && mounted[v.path[14]]) ||
          !/^\/Volumes\/disc/.test(v.path)
        ) {
          res.push(v);
        }
      });
    }
    Object.keys(node.children).forEach((char) => {
      trv(node.children[char]);
    });
  };
  trv(tree);
  return res;
};

export const getAvailableNodes = (tree: PmTrieNode, mounted: any) => {
  return traverseForAvailable(tree, mounted);
};
