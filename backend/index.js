const express = require('express');
const db = require('./db')
const jwt = require('jsonwebtoken')
const bodyParse = require('body-parser')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const hash = require('sha256')
const https = require('https')

dotenv.config();

const app = express();

const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))
const port = 8080;


app.get('/', (req,res) => {
    res.send("Hello, World")
});

app.get('/api/get', (req, res) => {
    // const {id, name} = req.params
    
    // const id = req.params.id
    // const name = req.params.name
    db.query('SELECT * FROM member_i INNER JOIN member_contact ON member_contact.contact_id = member_i.member_contact_id INNER JOIN email_i ON email_i.email_id = member_contact.contact_email', (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
            res.send(result)
        }
    })
});

app.get('/api/elements', async (req, res) => {
    try {
        db.query('SELECT * FROM test', async (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                // console.log(result)
                res.send(result)
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// LOGIN
app.post('/api/login', async (req, res) => {
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
                    // User authenticated successfully
                    const user = result[0];

                    // Create a JSON Web Token (JWT) to represent the authenticated user
                    const token = jwt.sign(
                        { userId: user.account_id, username: user.name },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: '1h' }
                    );

                    console.log(result);

                    // // Set the token in a cookie
                    // res.setHeader(
                    //     'Set-Cookie',
                    //     cookie.serialize('jwt_token', token, {
                    //         httpOnly: true,
                    //         maxAge: 3600, // 1 hour (adjust this as needed)
                    //         sameSite: 'strict',
                    //         path: '/',
                    //     })
                    // );

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

app.get('/api/getAppRequests', (req, res) => {
    db.query("SELECT * FROM request_i", (err, result) => {
        if (err ) {
            console.err(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
})


// Logout
// Logout route
app.post('/api/logout', (req, res) => {
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


// Server Listener
app.listen(port, () => {
    console.log('====================================');
    console.log(`System Admin Server is running in ${port}`);
    console.log('====================================');
});