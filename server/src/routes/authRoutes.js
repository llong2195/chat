const {Router} = require('express');
const router = Router();
const authControoler = require('../controllers/authControllers');
router.post('/signup', authControoler.signup);

router.post('/login', authControoler.login);

router.get('/logout', authControoler.logout);

router.get('/verify', authControoler.verify)

module.exports = router;