import { Router } from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';

// Router handling EDI conversion and sample retrieval
const router = Router();
const upload = multer(); // store uploaded files in memory for quick parsing

// Simple EDI to JSON parser. Each segment becomes an object with a tag and elements.
function parseEdi(data) {
  return data
    .split('~')
    .filter(Boolean)
    .map((segment) => {
      const parts = segment.split('*');
      return { segment: parts[0], elements: parts.slice(1) };
    });
}

// POST /convert accepts EDI data as an uploaded file or in the JSON body under "edi".
// Returns the parsed structure as JSON for frontend display.
router.post('/convert', upload.single('file'), (req, res) => {
  let ediData = '';
  if (req.file) {
    ediData = req.file.buffer.toString('utf8');
  } else if (req.body.edi) {
    ediData = req.body.edi;
  } else {
    return res.status(400).json({ error: 'No EDI data provided' });
  }

  if (!ediData.trim()) {
    return res.status(400).json({ error: 'Invalid EDI data' });
  }

  try {
    const json = parseEdi(ediData);
    res.json({ json });
  } catch {
    res.status(400).json({ error: 'Invalid EDI data' });
  }
});

// GET /sample/:filename serves predefined EDI files from the samples directory.
router.get('/sample/:filename', async (req, res) => {
  const safeName = path.basename(req.params.filename); // prevent directory traversal
  const filePath = path.join(process.cwd(), 'samples', safeName);
  try {
    const data = await fs.readFile(filePath, 'utf8');
    res.type('text/plain').send(data);
  } catch {
    res.status(404).json({ error: 'Sample not found' });
  }
});

export default router;
