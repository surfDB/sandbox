/* eslint-disable no-case-declarations */
// pages/api/auth/nonce.ts
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
      const nonce = await surfClient.getAuthNonce(req, res);
      return res.status(200).json(nonce);
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
