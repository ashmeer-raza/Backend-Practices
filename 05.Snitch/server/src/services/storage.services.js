import ImageKit, { toFile } from "@imagekit/nodejs";
import config from "../config/config.js";

const client = new ImageKit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
});

export async function uploadFile({ buffer, fileName }) {
  const response = await client.files.upload({
    file: await toFile(buffer),
    fileName: fileName,
    folder: "snitch",
  });
  return response;
}
