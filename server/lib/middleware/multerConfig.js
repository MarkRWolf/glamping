import multer from "multer";
import * as mime from "mime-types";
import { v4 as uuidv4 } from "uuid";

export default function useMulter(folderName) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/${folderName}`);
    },
    filename: (req, file, cb) => {
      const ext = mime.extension(file.mimetype) || "bin";
      const newFileName = `${uuidv4()}.${ext}`;
      cb(null, newFileName);
    },
  });

  // Return the configured Multer instance
  return multer({ storage });
}
