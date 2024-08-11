import { readDb } from "@/utils/db";
import { getDup } from "@/utils/trie";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  data: any;
  error: any;
};

export const config = {
  api: {
    responseLimit: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const tree = readDb();
    const a = getDup(tree);
    res.status(200).json({ data: a, error: false });
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
