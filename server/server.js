const express = require('express');
const cors = require('cors');
const { dbCon } = require('./databases/db');
const {Router} = require('./routes')
require('dotenv').config();

const PORT = process.env.PORT || 5000; // Default port if PORT is not provided in environment variables
const app = express();

app.use(cors());
app.use(express.json());

app.use('/',Router)

app.listen(PORT,"0.0.0.0", async () => {
    try {
        await dbCon;
        console.log("Database connected and server started on port " + PORT);
    } catch (error) {
        console.error("Error during starting the server:", error);
    }
});
