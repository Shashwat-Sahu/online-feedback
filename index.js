const express = require("express")
const mongoose = require('mongoose');
const app = express()
require("dotenv").config();
app.use(express.json())


mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})

require("./Model/Counsellor.js");
require("./Model/Counselee.js");
require("./Model/AdminAuth.js");

app.use(require("./Routes/Admin.js"))
app.use(require("./Routes/Login.js"))
app.use("/counsellor", require("./Routes/Counsellor.js"))
app.use("/counselee", require("./Routes/Counselee.js"))

const PORT = process.env.PORT || 8000


app.use(express.static('./build'))
const path = require('path')
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})


app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`)
})