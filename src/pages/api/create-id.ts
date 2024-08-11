import type { NextApiRequest, NextApiResponse } from "next";
import { addIdToDirectory } from "../../utils/scan";
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
    config.dirs.forEach((v: string) => addIdToDirectory(v));
    res.status(200).json({ data: [], error: false });
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
