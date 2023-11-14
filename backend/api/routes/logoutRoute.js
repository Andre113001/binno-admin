// logoutRoute.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  // Clear the JWT token cookie by setting it to an empty string and expiring it
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('jwt_token', '', {
      httpOnly: true,
      maxAge: -1, // Expire the cookie immediately
      sameSite: 'strict',
      path: '/',
    })
  );

  return res.json({ message: 'Logged out successfully' });
});

module.exports = router;
