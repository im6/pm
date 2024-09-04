import type { NextApiRequest, NextApiResponse } from "next";
import { combineToFolder } from "../../utils/scan";
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
    config.combine.forEach((v: string) => combineToFolder(v));
    res.status(200).json({ data: [], error: false });
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
