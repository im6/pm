import { findMountedDisc } from "@/utils/config";
import { readDb } from "@/utils/db";
import { getAvailableNodes } from "@/utils/trie";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  data: any;
  error: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const tree = readDb();
    const mounted = findMountedDisc();
    const available = getAvailableNodes(tree, mounted);
    res.status(200).json({ data: available, error: false });
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
