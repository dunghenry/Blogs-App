const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./configs/connectDB');
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
const port = process.env.PORT || 4000;
const routes = require('./routes')
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json({extended: true, limit: '30mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(morgan("combined"));
app.use(helmet());
connectDB();
app.use('/api/v1', routes);
app.listen(port, console.log(`Server listening on http://localhost:${port}`));
