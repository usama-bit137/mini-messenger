const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const { DATABASE_URL, PORT, HOST } = process.env;
const mongoDB = DATABASE_URL;

const app = require('./app');

mongoose
  .connect(mongoDB, {
    // returns a promise
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

const DB = mongoose.connection;
DB.on('open', () => {
  console.log('Database Connection Successful 👌');
}).on('error', console.error.bind(console, 'Mongo connection error 💥'));

const port = PORT || 3000;
app.listen(port, HOST, () => {
  console.log(
    `App listening for HTTP requests on port ${port}\nServer started at ${new Date()
      .toJSON()
      .slice(11, -2)}`
  );
});
