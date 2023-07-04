const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const { DATABASE_NAME, DATABASE_URL, DATABASE_PASSWORD, PORT } = process.env;
const mongoDB = DATABASE_URL.replace('<PASSWORD>', DATABASE_PASSWORD).replace(
  '<NAME>',
  DATABASE_NAME
);

const app = require('./app');

mongoose.connect(mongoDB, {
  // returns a promise
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const DB = mongoose.connection;
DB.on('open', () => {
  console.log('Database Connection Successful 👌');
}).on('error', console.error.bind(console, 'Mongo connection error 💥'));

const port = 3000;
app.listen(PORT, () => {
  console.log(
    `App listening for HTTP requests on port ${port}\nServer started at ${new Date()
      .toJSON()
      .slice(11, -2)}`
  );
});
