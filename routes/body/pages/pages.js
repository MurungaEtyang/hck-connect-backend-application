const {query} = require("../../../database/config");


const getAllPages = async (req, res) => {
    try {
        const [rows] = await query('SELECT * FROM pages');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pages', details: error.message });
    }
};


const getPageByUrl = async (req, res) => {
    const { navigation_item_url } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM pages WHERE navigation_item_url = ?', [navigation_item_url]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Page not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the page', details: error.message });
    }
};


const createPage = async (req, res) => {
    const { navigation_item_url, title, content, css_content, js_content, status, visibility } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO pages (navigation_item_url, title, content, css_content, js_content, status, visibility) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [navigation_item_url, title, content, css_content, js_content, status || 'draft', visibility || 'public']
        );
        res.status(201).json({ message: 'Page created', pageId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create the page', details: error.message });
    }
};

const updatePage = async (req, res) => {
    const { navigation_item_url } = req.params;
    const { title, content, css_content, js_content, status, visibility } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE pages SET title = ?, content = ?, css_content = ?, js_content = ?, status = ?, visibility = ? WHERE navigation_item_url = ?',
            [title, content, css_content, js_content, status, visibility, navigation_item_url]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Page not found or not updated' });
        }
        res.json({ message: 'Page updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the page', details: error.message });
    }
};


const deletePage = async (req, res) => {
    const { navigation_item_url } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM pages WHERE navigation_item_url = ?', [navigation_item_url]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Page not found or already deleted' });
        }
        res.json({ message: 'Page deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the page', details: error.message });
    }
};

module.exports = {
    getAllPages,
    getPageByUrl,
    createPage,
    updatePage,
    deletePage
};
