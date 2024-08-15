import { extractPubSeq } from "@/utils/scan";
import { searchPm } from "@/utils/search";
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
    const { keyword } = JSON.parse(req.body);
    const updateSearch = extractPubSeq(keyword);
    const c = searchPm(`${updateSearch[0]}${updateSearch[1]}`);
    const data = c ? c.p : [];
    res.status(200).json({ data, error: true });
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
