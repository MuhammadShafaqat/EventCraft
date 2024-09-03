const express = require('express');
const bodyParser = require('body-parser');
// const authRoutes = require('./routes/auth');
const authRoutes = require('./route/auth');
const eventRoutes = require('./route/employee');
var cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // allow your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // allowed headers
  }));

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
