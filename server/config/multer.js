import multer from "multer";
import os from "os";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // ✅ Use /tmp folder — the only writable directory on Vercel
    cb(null, os.tmpdir());
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
