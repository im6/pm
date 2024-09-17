import type { NextApiRequest, NextApiResponse } from "next";
import { scanDirectory } from "../../utils/scan";
import { saveToDb } from "../../utils/db";
import { getConfig } from "@/utils/config";

type ResponseData = {
  data: any;
  error: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const config = getConfig();
    let scanRes: any[] = [];
    config.dirs.forEach((v: string) => {
      const scanned = scanDirectory(v);
      scanRes = scanRes.concat(scanned);
    });
    saveToDb(scanRes);
    res.status(200).json({ data: 1, error: false });
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
