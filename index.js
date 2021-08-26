const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

const candidateRouter = require('./routes/candidateRouter')

const app = express()

app.use(cors())
app.use(express.json({}))

app.use(candidateRouter);

mongoose.connect(process.env.DB_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('DB Connected')
        app.listen(process.env.PORT)
    })
    .catch(err => console.log(err))