import {
  editNoteFromTreeNode,
  readOneCharDb,
  writeOneCharDb,
} from "@/utils/db";
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
    const parsedBody = JSON.parse(req.body);
    const tree = readOneCharDb(parsedBody.data.sid[0]);
    const newTree = editNoteFromTreeNode(tree, parsedBody);
    writeOneCharDb(parsedBody.data.sid[0], newTree);
    res.status(200).json({ data: [], error: false });
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
