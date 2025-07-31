import express from 'express';
import authRoutes from '#routes/authenticateRoutes.js';
import { PORT } from '#config/config.js';

const app = express();

app.use(express.json());
app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
