import type { NextApiRequest, NextApiResponse } from "next";
import { scanDirectory, getUniq } from "../../utils/scan";
import { saveToDb } from "../../utils/db";

type ResponseData = {
  data: any;
  error: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const scanRes = scanDirectory("/Users/zijianguo/Downloads/temp");
    const scan1 = getUniq(scanRes);
    saveToDb(`${scan1[0]}${scan1[1]}`);
    res.status(200).json({ data: scan1, error: false });
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
