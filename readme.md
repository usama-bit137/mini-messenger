# mini-messenger

## Introduction

In this project we seek to produce a message board which allows users to send messages. The users must provide a `user` and `text` via a `form` element. MongoDB/`mongoose` was used to store the messages and these can are displayed on the frontend. The server is set up in `express.js`. This readme will explain how the code works to achieve these results. The frontend is written in `pug`.

## The Schema and Model

We previously mentioned that `mongoose` was used to enforce a schema on the data being sent to the database. The schema has three fields: `user`, `text` and `added`.

```js
// model/messageModel.js
const mongoose = require('mongoose');

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

The client provides the `user` and `text` fields through a `form` element. The `added` field has type `date` which is automatically assigned on creation of the `Messages` document. This prevents the client from sending empty database entries (spamming).

## The Frontend and Routes

With the schema established, the key part of the frontend to focus on is the `form` element

```pug
// views/_form.pug
form.container#form(method='POST' action='/')
  #error
  #form__inputs
    .form-group
      input#user(type='text' name='user' placeholder='Username')
    .form-group
      input#text(name='text' placeholder='Type your message')
  button.btn#send__button: img(src='/icons/send.png' width='20px')
```

Here we see that the `form` element sumbits a HTTP `POST` method to the root (`'/'`) URL. The `input` is the `user` field and the `textarea` is the `text` field. In this form we also enforce the schema rule that `user` and `text` fields are required in order to submit the message to the database (`required`).

The `getAllMessages` handler allows the server to send a response,

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

which renders the following template:

```pug
// views/overview.pug

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

We import the `Messages` model as it is required to retrieve the `messages` documents. We loop over the `messages` array and furnish the `block` with the relevant fields for each `message` in the DB.

## Addressing Validation

The code seen so far allows the user to send empty fields. However, by the `mongoose` schema, we require both `user` and `text` to be provided, otherwise the server throws a Mongoose validation error and subsequently crashes. In order to prevent this, we could

1. Attach a `required` on the input tags
2. Create some custom validation which prevents submission if data provided does not conform to the schema.

We follow the latter option and create a form validator function:

```js
// public/scripts/formValidation.js

const user = document.getElementById('user');
const text = document.getElementById('text');
const errorElement = document.getElementById('error');

document.getElementById('form').addEventListener('submit', (e) => {
  const errorMessages = [];
  if (!user.value) errorMessages.push('Username required');
  if (user.value.length >= 15)
    errorMessages.push('Username should be less than 15 characters');
  if (!text.value) errorMessages.push('Text required');

  if (errorMessages.length > 0) {
    e.preventDefault();
    errorElement.innerText = `${errorMessages.join('. ')}`;
    errorElement.classList.add('on-error');
    setTimeout(() => {
      errorElement.innerText = '';
      errorElement.classList.remove('on-error');
    }, 2000);
  }
});
```

First, this code will read in the form elements `user` and `text` and an `#error` div. Then we attach a `'submit'` event listener to the `form` which checks if the `user.value` and `text.value` exists. If they are empty, then we push error messages to the `errorMessage` array. If there are errors present, then we push those messages to the `#error` div. The `#error` div exists for approximately `2` seconds and then the errors are removed.

This is a vital step because without it, there is a potential for a MongoDB `ValidatorError` to occur. Since the server does not have the capability to handle operational errors (just to keep things simple). This is a sufficient fix to stop the server from crashing if the user tries to submit empty fields.

## Submitting the Form

Suppose the client provides `user` and `text` fields and submits the form, we now want to create a MongoDB document from this data. In order to do this, we must make use of a piece of middleware called `body-parser` to assemble the request that will subsequently be sent to the database:

```js
app.use(bodyParser.urlencoded({ extended: true }));
```

Once `body-parser` is enabled, we make use of `req.body`

```js
req.body = {
  user: '<USER>',
  text: '<TEXT>',
};
```

to create a new `Messages` document:

```js
// controllers/viewsController.js

exports.postMessage = async (req, res) => {
  await Messages.create(req.body);
  res.redirect('/overview');
};
```

Once the document is created, the user is redirected to `/overview`, which is the URL for the message board. This redirect will have the affect of refreshing the page which will display the new message at the bottom of the message stack.
