import type { NextApiRequest, NextApiResponse } from "next";
import { combineToFolder } from "../../utils/scan";

type ResponseData = {
  data: any;
  error: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    combineToFolder("/Users/xxx/Downloads/temp");
    res.status(200).json({ data: [], error: false });
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
