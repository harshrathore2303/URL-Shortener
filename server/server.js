const express = require('express');
const connectToMongoDB = require('./db/connect');
const URL = require('./models/url.model');

const app = express();
const PORT = process.env.PORT|| 8000;
connectToMongoDB(process.env.MONGO_URL).then(()=>{console.log('MongoDB Connected')}).catch(() => {console.log("Error in connection")});

app.use(express.json());
app.use(express.urlencoded());

const urlRoute = require('./routes/url.route');
app.use('/url', urlRoute);
app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate({shortId}, { $push: {
            visitHistory: {timeStamp: Date.now()}
        } });

        res.redirect(entry.redirectURL);
    } catch (error) {
        
    }
});


app.listen(PORT, () =>{
    console.log(`Server has Started on part ${PORT}`);
});