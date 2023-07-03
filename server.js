const app = require('./app');

const port = 3000;
app.listen(port, () => {
  console.log(
    `Server started at ${new Date().toJSON().slice(11, -2)} on port: ${port}`
  );
});
