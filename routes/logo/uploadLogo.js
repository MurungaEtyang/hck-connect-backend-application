import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const logoDirectory = path.join(__dirname, '../../public/images/logos');
        if (!fs.existsSync(logoDirectory)) {
            fs.mkdirSync(logoDirectory, { recursive: true });
        }
        cb(null, logoDirectory);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage });

/**
 * @swagger
 * /api/kenf/management/kenf-logo/upload:
 *   post:
 *     summary: Upload a new logo
 *     description: Upload a logo file to the server.
 *     tags:
 *       - logo
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: logo
 *         type: file
 *         required: true
 *         description: The logo file to upload.
 *     responses:
 *       200:
 *         description: Logo uploaded successfully.
 *       400:
 *         description: No file uploaded or invalid file type.
 *       500:
 *         description: Internal server error.
 */
router.post('/upload', upload.single('logo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded or invalid file type.' });
    }
    res.status(200).json({
        message: 'Logo uploaded successfully.',
        file: req.file.filename,
    });
});

export default router;
