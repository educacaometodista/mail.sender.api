import multer from 'multer';
import crypto from 'crypto';
import path, { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.xls' && ext !== '.xlsx' && ext !== '.csv' && ext !== '.txt') {
      return cb(new Error('Only data files are allowed.'));
    }
    return cb(null, true);
  },
};
