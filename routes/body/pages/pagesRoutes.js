const express = require('express');
const router = express.Router();
const {
    getAllPages,
    getPageByUrl,
    createPage,
    updatePage,
    deletePage
} = require('../controllers/pagesController');

/**
 * @swagger
 * /api/pages:
 *   get:
 *     summary: Get all pages
 *     tags:
 *       - Pages
 *     responses:
 *       200:
 *         description: A list of all pages
 *       500:
 *         description: Server error
 */
router.get('/', getAllPages);

/**
 * @swagger
 * /api/pages/{navigation_item_url}:
 *   get:
 *     summary: Get a page by navigation_item_url
 *     tags:
 *       - Pages
 *     parameters:
 *       - name: navigation_item_url
 *         in: path
 *         description: The URL for the navigation item
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single page object
 *       404:
 *         description: Page not found
 *       500:
 *         description: Server error
 */
router.get('/:navigation_item_url', getPageByUrl);

/**
 * @swagger
 * /api/pages:
 *   post:
 *     summary: Create a new page
 *     tags:
 *       - Pages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               navigation_item_url:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               css_content:
 *                 type: string
 *               js_content:
 *                 type: string
 *               status:
 *                 type: string
 *                 default: draft
 *               visibility:
 *                 type: string
 *                 default: public
 *     responses:
 *       201:
 *         description: Page created successfully
 *       500:
 *         description: Server error
 */
router.post('/', createPage);

/**
 * @swagger
 * /api/pages/{navigation_item_url}:
 *   put:
 *     summary: Update a page by navigation_item_url
 *     tags:
 *       - Pages
 *     parameters:
 *       - name: navigation_item_url
 *         in: path
 *         description: The URL for the navigation item
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               css_content:
 *                 type: string
 *               js_content:
 *                 type: string
 *               status:
 *                 type: string
 *               visibility:
 *                 type: string
 *     responses:
 *       200:
 *         description: Page updated successfully
 *       404:
 *         description: Page not found
 *       500:
 *         description: Server error
 */
router.put('/:navigation_item_url', updatePage);

/**
 * @swagger
 * /api/pages/{navigation_item_url}:
 *   delete:
 *     summary: Delete a page by navigation_item_url
 *     tags:
 *       - Pages
 *     parameters:
 *       - name: navigation_item_url
 *         in: path
 *         description: The URL for the navigation item
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Page deleted successfully
 *       404:
 *         description: Page not found
 *       500:
 *         description: Server error
 */
router.delete('/:navigation_item_url', deletePage);

module.exports = router;
