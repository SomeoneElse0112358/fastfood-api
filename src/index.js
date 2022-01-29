const express = require('express');
const mongoose = require('mongoose');
const { ValidationError } = require('express-validation');
const routes = require('./routes');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { database, port } = require('./config.js');

mongoose
  .connect(database.url, {
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 5000,
    useUnifiedTopology: true
  })
  .then(() => console.log(`Database has been connected...`));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use('/api', routes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  return res.status(500).json(err);
});

app.listen(port, () => {
  console.log(`Server has been started on port ${port}...`);
});
