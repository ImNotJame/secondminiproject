const express = require('express')
const router = express.Router();


router.get('/search', async (req,res) =>{
    try{
        const q = (req.query.q || '').trim();
        if(!q) return res.json([]);

        const r = await fetch(
            `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(q)}&cc=us&l=english`
        );
        if(!r.ok) return res.status(502).json({error:`Steam returned ${r.status}` });

        const data = await r.json();
        console.log('query:', JSON.stringify(q));
        console.log('steam total:', data.total, 'items:', (data.items || []).length);
        res.json((data.items || []).slice(0,8).map((i)=>({
            appid: i.id,
            title: i.name,
            thumb: i.tiny_image,
        })));
        
    } catch(e){
        console.error('Steam search error:', e);
        res.status(502).json({ error: 'Steam request failed' });
    }
});

router.get('/details/:appid', async (req, res) => {
  try {
    const appid = req.params.appid;
    if (!/^\d+$/.test(appid)) return res.status(400).json({ error: 'Invalid appid' });

    const r = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appid}&l=english`
    );
    const data = await r.json();
    const entry = data[appid];
    if (!entry || !entry.success) return res.status(404).json({ error: 'Game not found' });

    const d = entry.data;
    res.json({
        appid: Number(appid),
        title: d.name,
        cover: d.header_image,
        genre: (d.genres || []).map((g) => g.description).join(', '),
    });
  } catch (e) {
    res.status(502).json({ error: 'Steam request failed' });
  }
});

module.exports = router;