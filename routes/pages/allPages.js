import { Router } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.join(__dirname, '..', '..', 'public', 'pages');

/**
 * @swagger
 * /api/kenf/management/pages/{name}:
 *   get:
 *     summary: Retrieve a dynamically generated page
 *     description: Fetch the `index.html` file for a given page name if it exists.
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the page folder
 *     responses:
 *       200:
 *         description: Successfully fetched the page.
 *       404:
 *         description: Page or file not found.
 */

const router = Router();

router.get('/:name', (req, res) => {
    const pageName = req.params.name;

    const pageFolderPath = path.join(pagesDir, pageName);
    const filePath = path.join(pageFolderPath, 'index.html');

    try {
        if (!fs.existsSync(pageFolderPath)) {
            return res.sendFile(path.join(pagesDir, 'page-not-found', 'index.html'));
        }

        if (!fs.existsSync(filePath)) {
            return res.sendFile(path.join(pagesDir, 'page-not-found', 'index.html'));
        }

        res.sendFile(filePath);
    } catch (err) {
        console.error('Error accessing file:', err);
        res.status(500).send({ error: 'Internal server error' });
    }
});

export default router;