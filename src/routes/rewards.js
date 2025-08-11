import { Router } from 'express';

// Prototype blockchain rewards router. It exposes a user's token balance
// using deterministic placeholder data to show where smart contract reads
// would occur.
const router = Router();

// Fetch a user's token balance. The value is static because no blockchain
// interaction is performed yet.
router.get('/rewards/:userId', (req, res) => {
  res.json({ userId: req.params.userId, tokens: 0 });
});

export default router;
