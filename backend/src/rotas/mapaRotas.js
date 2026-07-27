const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ mensagem: 'Rota de mapas funcionando' });
});

module.exports = router;