import { PmNode } from "@/types";
import { findMountedDisc } from "@/utils/config";
import { readDb } from "@/utils/db";
import { getDup } from "@/utils/trie";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  data: any;
  error: any;
};

export const config = {
  api: {
    responseLimit: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const tree = readDb();
    const a = getDup(tree);
    const mounted = findMountedDisc();
    a.forEach((v0: PmNode[], k0) => {
      v0.forEach((v1: PmNode, k1) => {
        if (v1.path && mounted[v1.path[14]]) {
          a[k0][k1].isMounted = true;
        }
      });
    });
    a.sort((v0, v1) => {
      const v0HasMount = v0.some((v2) => v2.isMounted);
      const v1HasMount = v1.some((v2) => v2.isMounted);
      return v1HasMount - v0HasMount;
    });
    res.status(200).json({ data: a, error: false });
  } else {
    res.status(200).json({ data: [], error: false });
  }
}
