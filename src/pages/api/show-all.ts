import { getConfig } from "@/utils/config";
import { scanDirectory } from "@/utils/scan";
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
    const config = getConfig();
    let scanRes: any[] = [];
    config.dirs.forEach((v: string) => {
      const movs = scanDirectory(v);
      scanRes = scanRes.concat(movs);
    });
    res.status(200).json({ data: scanRes, error: false });
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
