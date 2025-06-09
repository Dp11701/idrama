import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  if (typeof url !== 'string') {
    return res.status(400).send('Missing url');
  }
  try {
    const parsed = new URL(url);
    // Chỉ cho phép redirect tới adjust.com
    if (!parsed.hostname.endsWith('adjust.com')) {
      return res.status(400).send('Invalid target domain');
    }
    res.redirect(302, url);
  } catch (e) {
    res.status(400).send('Invalid url');
  }
} 