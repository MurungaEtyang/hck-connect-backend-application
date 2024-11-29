import { Router } from 'express';
import pool from '../../database/config';

const router = Router();


router.get('/api/navbar-color', async (req, res) => {
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
