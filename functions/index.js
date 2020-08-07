const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("./permissions.json");
const express = require('express');
const cors = require('cors');
const app = express();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://quicksellquickbuy.firebaseio.com"
});
app.use(cors({origin: true}));
const db = admin.firestore();
const auth = admin.auth();

// Routes
app.get('/hello-world', (req, res) => {
    return res.status(200).send('Hello World!');
})

// Post
app.post('/user', (req, res) => {
    auth.createUser({
        email: req.body.email,
        emailVerified: false,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        displayName: req.body.displayName,
        disabled: false
    }).then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        res.status(200).send();
    }).catch(function(error) {
        res.status(500).send(error);
    });
})

// Get

// Put

// Delete

exports.app = functions.https.onRequest(app);
