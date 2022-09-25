import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import formidable, { File } from "formidable";
import { SurfClient } from "@surfdb/client-sdk";

export const config = {
  api: {
    bodyParser: false,
  },
};

type ProcessedFiles = Array<[string, File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const surfClient = new SurfClient({
    client: req.query.host as string,
  });
  let status = 200,
    resultBody = { status: "ok", message: "Files were uploaded successfully" };

  const files = await new Promise<ProcessedFiles | undefined>(
    (resolve, reject) => {
      const form = new formidable.IncomingForm();
      const files: ProcessedFiles = [];
      form.on("file", function (field, file) {
        files.push([field, file]);
      });
      form.on("end", () => resolve(files));
      form.on("error", (err) => reject(err));
      form.parse(req, () => {
        //
      });
    }
  ).catch((e) => {
    console.log(e);
    status = 500;
    resultBody = {
      status: "fail",
      message: "Upload error",
    };
    res.status(status).json(resultBody);
  });
  if (files?.length) {
    const response = await surfClient.uploadFile(req, res, {
      file: fs.createReadStream(files[0][1].filepath),
    });
    res.status(status).json(response);
  }
};

export default handler;
