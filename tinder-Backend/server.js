console.clear();
import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './dbCards.js';

// App Config
const app = express();
const PORT = process.env.PORT || 8001
const dbConnection = 'mongodb+srv://admin:TinderDB@cluster0.zuzbt.mongodb.net/?retryWrites=true&w=majority'


// Middlewares
app.use(express.json())
app.use(Cors());


// DB Config
mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})

// Api Endpoints
app.get('/', (req, res) => {
    res.status(200).send("Hello World")
})
app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})
// Listiners
app.listen(PORT, () => {
    console.log(`Listining to localhost:${PORT}`);
})