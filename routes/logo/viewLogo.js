import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoDirectory = path.join(__dirname, '../../public/images/logos');

/**
 * @swagger
 * /api/kenf/management/kenf-logo/view:
 *   get:
 *     summary: View the current logo
 *     description: Retrieve the current logo file.
 *     tags:
 *       - logo
 *     responses:
 *       200:
 *         description: Successfully retrieved the logo.
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: No logo found to view.
 */
router.get('/view', (req, res) => {
    const logoPath = path.join(logoDirectory, 'current-logo.jpg');
    if (fs.existsSync(logoPath)) {
        res.sendFile(logoPath);
    } else {
        res.status(404).json({ message: 'No logo found to view.' });
    }
});

export default router;
