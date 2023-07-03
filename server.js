const app = require('./app');

const port = 3000;
app.listen(port, () => {
  console.log(
    `App listening for HTTP requests on port ${port}\nServer started at ${new Date()
      .toJSON()
      .slice(11, -2)}`
  );
});
