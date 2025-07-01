import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(helmet());
app.use(express.json());

const cameras = [
  {
    id: 1,
    name: 'Times Square - NYC',
    lat: 40.758,
    lng: -73.985,
    streamUrl: 'https://video.nest.com/embedded/live/example1',
  },
  {
    id: 2,
    name: 'Eiffel Tower - Paris',
    lat: 48.8584,
    lng: 2.2945,
    streamUrl: 'https://video.nest.com/embedded/live/example2',
  },
  {
    id: 3,
    name: 'Tokyo Tower - Japan',
    lat: 35.6586,
    lng: 139.7454,
    streamUrl: 'https://video.nest.com/embedded/live/example3',
  },
];

app.get('/api/cameras', (req, res) => {
  res.status(200).json(cameras);
});

app.listen(PORT, () => {
  console.log(`Devil's Eye backend running on port ${PORT}`);
});