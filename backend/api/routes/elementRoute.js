// elementRoute.js
const express = require('express');
const router = express.Router();
const db = require('../../database/db');

// UTILS
const {readElements, saveElements} = require('../utils/elementsUtility');

// Retrieve Elements
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        db.query('SELECT test_txt FROM test WHERE test_id = ?', [id], async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                if (result.length === 0) {
                    return res.status(404).json({ error: 'No data found for the given ID' });
                }

                const elementsData = await readElements(id);
                res.json(elementsData);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/save-elements/:id', async (req, res) => {
    const { id } = req.params;
    const { newFile } = req.body;

    const result = await saveElements(id, newFile);

    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
})

module.exports = router;