const express = require('express');
const cors = require('cors');
const { dbCon } = require('./databases/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000; // Default port if PORT is not provided in environment variables
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, async () => {
    try {
        await dbCon;
        console.log("Database connected and server started on port " + PORT);
    } catch (error) {
        console.error("Error during starting the server:", error);
    }
});
