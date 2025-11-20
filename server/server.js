const express = require("express");
const connectToMongoDB = require("./db/connect");
const dotenv = require("dotenv");
const cookie = require("cookie-parser");
const cors = require("cors");
const axios = require("axios");
const UAParser = require("ua-parser-js");

dotenv.config();

const URL = require("./models/url.model");

const app = express();
const PORT = process.env.PORT || 8000;
connectToMongoDB(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(() => {
    console.log("Error in connection");
  });

app.use(express.json());
app.use(express.urlencoded());
app.use(cookie());
app.set("trust proxy", true);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const urlRoute = require("./routes/url.route");
app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;

    let location = null;
    try {
      const resp = await axios.get(`https://ipwho.is/${ip}`);
      location = resp.data;
    } catch (err) {
      console.log("IPAPI ERROR:", err.message);
      location = { error: true };
    }
    // console.log(location);
    const parser = new UAParser(req.headers["user-agent"]);
    const deviceInfo = parser.getResult();
    // console.log(deviceInfo.browser.name)
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: { timeStamp: Date.now(), city: location.city, country: location.country, device: deviceInfo.browser.name },
        },
      }
    );

    return res.status(200).json(entry.redirectURL);
    // res.redirect(entry.redirectURL);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

const userRoute = require("./routes/user.route");
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server has Started on part ${PORT}`);
});
