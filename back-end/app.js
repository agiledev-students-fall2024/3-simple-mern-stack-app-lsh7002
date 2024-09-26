require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')
const path = require('path')

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the dataabase models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')

// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})
// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

// a route to handle fetching about information
app.get('/api/about', (req, res) => {
  res.json({
    bio: 'My name is Lindsey, and I am a senior at New York University. I am originally from Los Angeles, California. I loved growing up in California. Because California is so diverse in so many different ways, I never felt there were any limitations to what I could do growing up. I had access to the mountains, beaches and the city. I could be hiking in the mountains one day and at the beach the next day. My family is comprised of my parents, my sister, my dog and me. As a family, we enjoy surfing, playing tennis, taking walks along the beach and eating at new restaurants. I am very close with my family, and they often fly out to New York to visit me. I have been playing volleyball since I was in fifth grade. I was recruited to play on the NYU volleyball team when I was in high school. I played on the team for three years. I currently live with three of my old teammates. I am also a part of a sorotity at NYU. It has been a great way to meet new girls on campus. Overall, I have really enjoyed my time at NYU. There is an abundance of things to do and places to visit in the city. I think that New York City is the best place to live for young people. I am someone who loves to try new things. I enjoy trying new restaurants with friends and exploring the different neighborhoods of New York. While I am sad that my time at NYU is coming to a close, I am very grateful that I will still be in New York after I graduate.',
  imageUrl: '/lindsey.jpg' 
  });
});

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
