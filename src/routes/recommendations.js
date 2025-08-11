import { Router } from 'express';

// Experimental router for AI-driven recommendations. For now it simply
// returns static suggestions to illustrate the shape of future results.
const router = Router();

// In production this would consider user preferences and past bookings.
router.get('/recommendations', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Sample Event',
      reason: 'Because you attended Jazz Night'
    }
  ]);
});

export default router;
