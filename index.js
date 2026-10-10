import e from "express";
import router from './src/router/index.js'
import c from 'config'
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app = e()
const port = c.get("port") || 3000

const limiter = rateLimit({
  windowMsL: 60 * 1000,
  limit: 10
})

app.use(e.json())
app.use(helmet())
app.use(limiter)
app.use('/api', router)

const mongoUrl = c.get("mongodbConnection");

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("could not connect to mongodb servers", error);
  });
