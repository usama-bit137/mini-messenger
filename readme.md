# mini-messenger
## Introduction
In this project we seek to produce a message board which allows users to send messages. The users must provide a `user` and `text` via a `form` element. MongoDB/`mongoose` was used to store the messages and these can are displayed on the frontend. The server is set up in express.js. This readme will explain how the code works to achieve these results. The frontend is written in `pug`. 

## The Schema and Model
We previously mentioned that we used `mongoose` to enforce a schema on the data being sent to the database. The schema has three fields: `user`, `text` and `added`. 
```js
// model/messageModel.js
const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  added: {
    type: Date,
    default: Date.now,
  },
});

const Messages = mongoose.model('Messages', messageSchema);
module.exports = Messages;
```
The client provides the `user` and `text` fields through a `form` element. The `added` field has type `date` which is automatically assigned on submission of the message to the database. Notice that fields provided by the client are required. This prevents the client from sending empty database entries (spamming).

## The Frontend and Routes
With the schema established, the key part of the frontend to focus on is the `form` element found in `views/_form.pug`

```pug
form.container#form(method='POST' action='/')
  .form-group
    input.form-control#user(type='text' name='user' placeholder='username' required)
  .form-group
  textarea.form_control#text(name='text' placeholder='Type your message' required)
  button.btn
    img(src='/icons/send.png' width='20px')
  #error
```

Here we see that the `form` element has a HTTP `POST` method which sends the request to the root (`'/'`) of URL. The `input` is the `user` field and the `textarea` is the `text` field. In this form we also enforce the schema rule that `user` and `text` fields are required in order to submit the message to the database (`required`). This is vital, because if the user is able to submit empty fields, it will result in a MongoDB `ValidatorError` and since the sever does not have the capability to handle errors (just to keep things simple), this is a sufficient fix to stop the server from crashing if the user tries to send empty fields. 

Now, we have two route handlers:
```js
// controllers/viewsController.js
const Messages = require('../models/messageModel');

exports.getAllMessages = async (req, res) => {
  const messages = await Messages.find();
  res.status(200).render('overview', {
    title: 'Chat',
    messages,
  });
};
```

The `getAllMessages` handler allows the server to send a response, which renders the following `pug` template in `views/overview.pug`:

```pug
extends base
block contents
  section.all--messages
    each message in messages
      section.message
        .message__bubble
          p.message__user= `${message.user}:`
          p= message.text
          
        small.message__date-time= `${message.added}`.slice(3,21) 
```

We import the `Messages` model as it is required to retrieve the messages on the database. We loop over the `messages` array and repeat the message `block` for each message in the DB. 

## Submitting the Form
Given the client provides a `user` and `text` and submits the form. However, we make use of a piece of middleware called `body-parser` in order to assemble our requests.

```js
app.use(bodyParser.urlencoded({ extended: true }));
```
Once `body-parser` encoding is setup, we make use of `req.body` to create a new `Messages` document:

```js
// controllers/viewsController.js

exports.postMessage = async (req, res) => {
  await Messages.create(req.body);
  res.redirect('/overview');
};
```
Once the document is created, the user is redirected to `http://localhost:PORT/overview`, which is the URL for the message board.
