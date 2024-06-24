import { Movie } from "../types";

class TrieNode {
  children: any;
  isEnd: boolean;
  detail?: Movie;

  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string, movie: Movie) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEnd = true;
    node.detail = movie;
  }

  search(word: string) {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      let char = word[i];

      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEnd;
  }

  startsWith(prefix: string) {
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
      let char = prefix[i];
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }
}

export default Trie;
