const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();

const app = express();

massive(process.env.CONNECTION_STRING)
    .then((db)=>{
        console.log(`db is running`)
        app.set('db', db);
    })
app.use(cors());
app.use(bodyParser.json());

app.get('/api/bins/:id', (req,res)=>{
    const db = req.app.get('db');
    db.shelfie.find({shelf:req.params.id.toLowerCase()})
        .then((bins)=>{
            res.json(bins);
        })
        .catch((err)=>{
            console.error(err)
        })
})

app.get('/api/bin/:shelf:bin', (req,res)=>{
    const db = req.app.get('db');
    db.shelfie.findOne({shelf:req.params.shelf.toLowerCase(), bin: req.params.bin})
        .then((bin)=>{
            res.json(bin);
        })
        .catch((err)=>{
            console.error(err)
        })
})

app.put('/api/bin/:id', (req,res)=>{
    const db = req.app.get('db');
    db.shelfie.update({id:req.params.id, name:req.body.name, price:req.body.price})
        .then((bins)=>{
            res.json(bins);
        })
        .catch((err)=>{
            console.error(err)
        })
})

app.delete('/api/bin/:id', (req,res)=>{
    const db = req.app.get('db');
    db.shelfie.update({id:req.params.id, name:null, price:null})
        .then((bins)=>{
            res.json(bins);
        })
        .catch((err)=>{
            console.error(err)
        })
})


const port = process.env.PORT || 5000;
app.listen(port, ()=>{console.log(`listening on ${port}`)});