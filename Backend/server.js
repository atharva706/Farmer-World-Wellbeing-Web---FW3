// server.js (ES Modules)
import 'dotenv/config'; // ✅ Must be first — loads .env before any other imports
import express from 'express';
import cors from 'cors';

// Import Route Files (✅ ES Modules)
import committeeRoutes from './routes/committeeRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';

const app = express();
const PORT = process.env.PORT || 3002;

// ==============================
// MIDDLEWARE
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// ROUTE MOUNTING
// ==============================
app.use('/api', committeeRoutes);
app.use('/api', serviceRoutes);

// Health Check / Default Route
app.get('/', (req, res) => {
    res.send("✅ FW3 Backend API is running!");
});

// ==============================
// SERVER START
// ==============================
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
