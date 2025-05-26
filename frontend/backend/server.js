const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory storage
let slotsDB = {};

// Helper: Generate dummy slots
function generateSlots() {
  return ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM'];
}

// GET: Available slots
app.get('/api/slots', (req, res) => {
  const { venue, date } = req.query;

  if (!venue || !date) {
    return res.status(400).json({ message: 'Missing venue or date' });
  }

  const key = `${venue}_${date}`; // Corrected line

  if (!slotsDB[key]) {
    slotsDB[key] = generateSlots();
  }

  res.json(slotsDB[key]);
});

// POST: Book a slot and broadcast the update
app.post('/api/book', (req, res) => {
  const { name, venue, date, slot, sport } = req.body;

  if (!name || !venue || !date || !slot || !sport) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const key = `${venue}_${date}`; // Corrected line

  if (!slotsDB[key]) {
    slotsDB[key] = generateSlots();
  }

  const index = slotsDB[key].indexOf(slot);

  if (index === -1) {
    return res.status(400).json({ message: 'Slot already booked or invalid' });
  }

  slotsDB[key].splice(index, 1); // Remove the booked slot

  console.log(`${name} booked ${slot} at ${venue} on ${date} for ${sport}`); // Corrected line

  // Broadcast the updated slots to all connected clients
  io.emit('slotUpdate', { venue, date, updatedSlots: slotsDB[key] });

  res.json({ message: 'Slot booked successfully!' });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Backend with Socket.IO running at http://localhost:${PORT}`); // Corrected line
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('🔌 A user connected via WebSocket');

  socket.on('disconnect', () => {
    console.log('🔌 A user disconnected');
  });
});
