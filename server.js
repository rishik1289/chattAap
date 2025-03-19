const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize the app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle the root URL to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages from clients
    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);
        io.emit('chat message', msg);  // Emit the message to all connected clients
    });

    // Handle disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Set the port for the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
