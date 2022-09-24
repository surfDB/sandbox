/* eslint-disable no-case-declarations */
// pages/api/auth/logout.ts
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
    case "POST":
      const resp = await surfClient.logout(req, res);
      return res.status(200).json(resp);
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
