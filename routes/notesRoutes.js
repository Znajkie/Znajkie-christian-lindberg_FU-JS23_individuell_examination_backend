const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const { tokenVerify } = require('../utils/utils');

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API endpoints for managing notes
 */

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     description: Create a new note with the provided data
 *     tags: [Notes]
 *     parameters:
 *       - in: body
 *         name: note
 *         description: The note to be created
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             title:
 *               type: string
 *             text:
 *               type: string
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication (e.g. "Bearer YOUR_JWT_TOKEN")
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Created
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 */
router.post('/', tokenVerify, notesController.postNote);
/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes
 *     description: Retrieve all notes from the database
 *     tags: [Notes]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication (e.g. "Bearer YOUR_JWT_TOKEN")
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */


router.get('/', tokenVerify, notesController.getAllNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update a note
 *     description: Update an existing note with the provided ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the note to update, use BU4aNEHAhMV5z0Ff for example
 *       - in: body
 *         name: note
 *         description: The updated note information
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             title:
 *               type: string
 *             text:
 *               type: string
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication (e.g. "Bearer YOUR_JWT_TOKEN")
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Note not found
 *       '500':
 *         description: Internal Server Error
 */


router.put('/:id', tokenVerify, notesController.putNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     description: Delete a note with the provided ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the note to delete, use Wr6PNbdFQlfvQCax for example
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication (e.g. "Bearer YOUR_JWT_TOKEN")
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Note not found
 *       '500':
 *         description: Internal Server Error
 */
router.delete('/:id', tokenVerify, notesController.deleteNote);

/**
 * @swagger
 * /api/notes/search:
 *   get:
 *     summary: Search for note
 *     description: Search for note based on title, use chrille for example
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: The search term
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication (e.g. "Bearer YOUR_JWT_TOKEN")
 *         required: true
 *         schema:
 *           type: string
 *           format: bearer
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
router.get('/search', tokenVerify, notesController.searchNote);

module.exports = router;