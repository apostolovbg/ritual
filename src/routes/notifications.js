import { Router } from 'express';

// Router simulating user notification delivery. External services like
// SendGrid would be wired in later; for now responses are immediate and
// deterministic for testing.
const router = Router();

// Accept a target email address and message body, returning a confirmation
// object. Validation ensures expected parameters are provided.
router.post('/notifications/email', (req, res) => {
  const { to, message } = req.body;
  if (!to || !message) {
    return res.status(400).json({ error: 'to and message required' });
  }
  // A real implementation would queue an email here.
  res.json({ sent: true });
});

export default router;
