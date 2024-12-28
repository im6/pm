import type { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";

type ResponseData = {
  data: any;
  error: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const pathToOpen = JSON.parse(req.body).data.path;
    exec(`open ${pathToOpen}`);
    res.status(200).json({ data: [], error: false });
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
