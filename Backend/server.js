const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const db = require('./config/database');
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes will be added here
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Campus News API' });
});

const PORT = process.env.PORT || 3000;

// Start server only after database connection is established
const startServer = async () => {
    try {
        const dbConnected = await db.testConnection();
        if (!dbConnected) {
            console.error('Failed to connect to database. Server will not start.');
            process.exit(1);
        }
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Server startup error:', err);
        process.exit(1);
    }
};

startServer();