const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { validaRegistrazione, validaLogin } = require('../model/validation');

// Registrazione
router.post('/register', async (req, res) => {

    // Valido i campi in input
    const { error } = validaRegistrazione(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Verifico se l'email esiste già nel database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send('Questo email è già registrato');
    }

    // Crypto la password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {

    // Valido i campi in input
    const { error } = validaLogin(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Verifico se l'email esiste
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Email o password non corretti');
    }

    // Verifico se la password è corretta
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send('Email o password non corretti');
    }
    
    res.send('Accesso riuscito');
});

module.exports = router;