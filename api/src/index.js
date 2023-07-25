require('dotenv').config()
const {CLIENT_URL, JWT_SECRET}= process.env
const express = require('express')
const app = express();
const router =require('./routes/index')
// const dotenv = require('dotenv');
// dotenv.config();
const bodyParser= require('body-parser')
const cookieParser = require("cookie-parser");
const cors = require('cors');
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Bienvenido')
})
// app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: CLIENT_URL, // <-- location of the react app were connecting to
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
        allowedHeaders: ['Content-Type', 'x-user-session'],     //Se usa para enviar los datos de sesión desde el front al middleware del back
    })
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", CLIENT_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(cookieParser(JWT_SECRET));


app.use(express.json());
app.use('/',router)
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

require('./db')