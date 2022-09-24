// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import { surfClient } from '../../../lib/surfClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case 'POST':
      res.status(200).json(
        await surfClient.create(req, res, {
          schema: 'test',
          data: req.body,
        })
      );
      break;
    case 'GET':
      res.status(200).json(
        (await surfClient.getAll(req, res, {
          schema: 'test',
        })) as any
      );
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
