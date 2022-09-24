/* eslint-disable no-case-declarations */
// pages/api/auth/me.ts
import { SurfClient } from "@surfdb/client-sdk";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const surfClient = new SurfClient({
    client: req.query.host as string,
  });

  switch (method) {
    case "GET":
      // get surfdb-session cookie
      const cookie = req.headers.cookie;
      if (!cookie) {
        return res.status(401).json("Unauthorized");
      }
      const profile = await surfClient.getProfile(req, res);
      return res.status(200).json(profile);
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
