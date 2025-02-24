const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://sdev255:Votto1931@songdb.k2wzc.mongodb.net/?retryWrites=true&w=majority&appName=SongDB", {useNewUrlParser: true})

module.exports = mongoose