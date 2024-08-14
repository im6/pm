import { readDb, removePmFromTrie, writeToDb } from "@/utils/db";
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
    const tree = readDb();

    const nodeInfo = JSON.parse(req.body).data;
    const newTree = removePmFromTrie(nodeInfo, tree);
    writeToDb(newTree);
    deleteNodeDirectory(nodeInfo.path);
    res.status(200).json({ data: [], error: false });
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
