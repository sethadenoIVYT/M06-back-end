const express = require("express")
var cors = require('cors')

const bodyParser = require('body-parser')
const Song = require("./models/songs")
const app = express()
app.use(cors())

app.use(express.json())
const router = express.Router()

//grab all songs in a database
router.get("/songs", async(req,res) => {
    try{
        const songs = await Song.find({})
        res.send(songs)
        console.log(songs)
    }
    catch (err){
        console.log(err)
    }
})

//Grab a single song in the database
router.get("/songs/:id", async (req,res) => {
    try {
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch(err) {
        res.status(400).send(err)
    }
})

//added a song to the database
router.post("/songs", async(req,res) => {
    try{
        const song = await new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log(song)
    }
    catch(err){
        res.status(400).send(err)
    }
})

//update is to update an exisiting record/resource/entry
router.put("/songs/:id", async(req,res) => {
    //first we need to find and update the song the gront end wants us to update.
    //to do this we need to request id of the song from request
    //and then find it in the database and update it
    try {
        const song = req.body
        await Song.updateOne({_id: req.params.id}, song)
        console.log(song)
        res.sendStatus(204)
    }
    catch(err) {
        res.status(400).send(err)
    }
})

app.use("/api", router)
app.listen(3000)
