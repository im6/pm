import { findMountedDisc } from "@/utils/config";
import { readDb } from "@/utils/db";
import { extractPubSeq } from "@/utils/scan";
import { searchNode } from "@/utils/trie";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  data: any;
  error: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { keyword } = JSON.parse(req.body);
    const updateSearch = extractPubSeq(keyword);
    const tree = readDb();
    const c = searchNode(tree, `${updateSearch[0]}${updateSearch[1]}`);
    const data = c ? c.p : [];
    const mounted = findMountedDisc();
    data?.forEach((v) => {
      v.isMounted = mounted[v.path[14]];
    });
    res.status(200).json({ data, error: (data || []).length === 0 });
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
