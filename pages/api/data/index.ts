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
      res.status(200).json(
        await surfClient.create(req, res, {
          schema: req.query.schema as string,
          data: req.body,
        })
      );
      break;
    case "PATCH":
      res.status(200).json(
        await surfClient.update(req, res, {
          schema: req.query.schema as string,
          data: req.body,
          id: req.query.id as string,
        })
      );
      break;
    case "GET":
      res.status(200).json(
        (await surfClient.getAll(req, res, {
          schema: req.query.schema as string,
        })) as any
      );
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
