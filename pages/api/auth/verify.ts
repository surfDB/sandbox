// pages/api/auth/login.ts
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
      const authRes = await surfClient.authenticate(req, res, {
        authSig: req.body.authSig,
      });
      res.status(200).json(authRes);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
