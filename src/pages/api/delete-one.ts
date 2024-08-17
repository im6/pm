import { readOneCharDb, removePmFromTrie, writeOneCharDb } from "@/utils/db";
import { deleteNodeDirectory } from "@/utils/scan";
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
    const nodeInfo = JSON.parse(req.body).data;
    const tree = readOneCharDb(nodeInfo.sid[0]);
    const newTree = removePmFromTrie(nodeInfo, tree);
    writeOneCharDb(nodeInfo.sid[0], newTree);
    const removeState = deleteNodeDirectory(nodeInfo.path);
    res.status(200).json(removeState);
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
