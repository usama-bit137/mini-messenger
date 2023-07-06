# mini-messenger
## Introduction
In this project we seek to produce a message board which allows users to send messages. The users must provide a `user`name and `text` via a `form` element. MongoDB/`mongoose` was used to store the messages and these can are displayed on the frontend. The server is set up in express.js. This readme will explain how the code works to achieve these results. The frontend is written in `pug`. 

## The Schema and Model
We previously mentioned that we used a `mongoose` to enforce a schema on the data being sent to the database. The schema has three fields: `user`, `text` and `added`. 
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

## The Frontend
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

Here we see that the `form` element has a HTTP `POST` method which sends the request to the root (`/`) of URL. The `input` is the `user` field and the `textarea` is the text field. In this form we also enforce the idea that the user is required to enter these credentials in order to submit their message to the database (`required`).


