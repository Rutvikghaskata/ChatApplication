const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoUrl = 'mongodb://localhost:27017/Socket';
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 5000;
const io = require('socket.io')(http);
const userRoutes = require('./route/User');
const messageRoutes = require('./route/Message');
const Messages = mongoose.model('Messages');
mongoose.model('users');
http.listen(PORT, () => {
  console.log(`Server running on : http://localhost:${PORT}`);
});


mongoose
  .connect(mongoUrl, {})
  .then(() => {
    console.log('connection-successful');
  })
  .catch(err => console.log('no connection'));


app.use(bodyParser.json());
app.use(messageRoutes);
app.use(userRoutes);


app.get('/', (req, res) => {
  res.send('API is Working successful');
});


io.on('connect', socket => {
  console.log('Connected...');
  socket.on('message', async() => {
    const data = await Messages.find()
    io.emit('message', data);
  });
  socket.on('disconnect', () => {
    console.log('Disconnect...');
  });
});