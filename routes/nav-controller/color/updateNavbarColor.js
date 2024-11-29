import {Router} from "express";
import pool from "../../../database/config.js";

const router = Router();

/**
 * @swagger
 * /api/kenf/management/nav-color/update-color:
 *   post:
 *     summary: Update the navbar color
 *     description: Allows users to change the color of the navbar by providing a hex color code.
 *     tags:
 *         - color
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               color:
 *                 type: string
 *                 description: The color hex code to apply
 *                 example: '#ff5733'
 *     responses:
 *       200:
 *         description: Navbar color updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Navbar color updated successfully'
 *                 color:
 *                   type: string
 *                   example: '#ff5733'
 *       400:
 *         description: Invalid color format. Color must be a valid hex code (e.g., `#ff5733`).
 *       500:
 *         description: Error updating navbar color
 */
router.post('/update-color', async (req, res) => {
    const { color } = req.body;

    if (!/^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{3}$/.test(color)) {
        return res.status(400).send('Invalid color format. Please provide a valid hex color.');
    }

    try {
        const [existingColor] = await pool.query('SELECT * FROM navbar_settings LIMIT 1');

        if (existingColor.length > 0) {
            await pool.query('UPDATE navbar_settings SET color = ? WHERE id = 1', [color]);
        } else {
            await pool.query('INSERT INTO navbar_settings (color) VALUES (?)', [color]);
        }

        res.status(200).json({ message: 'Navbar color updated successfully', color });
    } catch (error) {
        res.status(500).send('Error updating navbar color');
    }
});

export default router;
