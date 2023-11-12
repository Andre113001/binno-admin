// routes/loginRoute.js
const express = require('express');
const router = express.Router();
const db = require('../database/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const hash = require('sha256');

router.post('/', async (req, res) => {
  const { accessKey, password } = req.body;
  const hashedAccesskey = hash(accessKey).toString('base64');

  try {
    db.query(
      `SELECT * FROM member_i WHERE member_accessKey = ?`,
      [hashedAccesskey],
      async (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.length === 0) {
          return res.status(401).json({ error: 'User not found' });
        }

        const DBpassword = result[0].member_password;
        const passwordMatch = await bcrypt.compare(password, DBpassword);

        if (passwordMatch) {
          const user = result[0];

          const token = jwt.sign(
            { userId: user.account_id, username: user.name },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
          );

          return res.json({ token });
        } else {
          return res.status(401).json({ error: 'Authentication failed' });
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
