import { Router } from 'express';

// Lightweight analytics router exposing in-memory counters. The values are
// reset whenever the server restarts and merely demonstrate how a service
// like Mixpanel could be integrated.
const router = Router();

// Shared metrics object incremented on each request. Keeping it in module
// scope allows stateful behavior without a database.
const metrics = { pageViews: 0, bookings: 0, activeUsers: 0 };

// Return the current analytics snapshot. Real implementations would persist
// data or forward it to a third-party provider.
router.get('/analytics/summary', (req, res) => {
  metrics.pageViews += 1; // Increment simple counter to show dynamism.
  res.json(metrics);
});

export default router;
