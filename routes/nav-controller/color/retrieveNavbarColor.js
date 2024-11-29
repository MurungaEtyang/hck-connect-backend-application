import { Router } from 'express';
import pool from "../../../database/config.js";

const router = Router();

/**
 * @swagger
 * /api/kenf/management/nav-color/retrieve-color:
 *   get:
 *     summary: Get the current navbar color
 *     description: Fetches the current navbar color from the database. If not set, defaults to `#ffffff` (white).
 *     tags:
 *        - color
 *     responses:
 *       200:
 *         description: The current navbar color
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 color:
 *                   type: string
 *                   description: The color hex code of the navbar
 *                   example: '#ffffff'
 *       500:
 *         description: Error fetching navbar color
 */
router.get('/retrieve-color', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT color FROM navbar_settings LIMIT 1');
        if (rows.length > 0) {
            res.status(200).json({ color: rows[0].color });
        } else {
            res.status(200).json({ color: '#ffffff' });
        }
    } catch (error) {
        res.status(500).send('Error fetching navbar color');
    }
});

export default router;
