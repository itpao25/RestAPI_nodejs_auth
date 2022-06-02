const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Importo i routers
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

dotenv.config();

// Connetto al database
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log("Connesso al database")
)

// Route Middlewares
app.use(express.json());

// Inoltro al route tutte le richieste provenienti da /api/user
app.use('/api/user', authRoute);

// Metodi che richiedono l'autenticazione JWT
app.use('/api/post', postRoute);

app.listen(3000, () => console.log("Server acceso e pronto"));