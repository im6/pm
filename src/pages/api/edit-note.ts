import { readDb, editNoteFromTreeNode, writeToDb } from "@/utils/db";
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
    const tree = readDb();
    const newTree = editNoteFromTreeNode(tree, JSON.parse(req.body));
    writeToDb(newTree);
    res.status(200).json({ data: [], error: false });
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
