import { readDb, removePmFromTrie, writeToDb } from "@/utils/db";
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
    const newTree = removePmFromTrie(JSON.parse(req.body).data, tree);
    writeToDb(newTree);
    res.status(200).json({ data: [], error: false });
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
