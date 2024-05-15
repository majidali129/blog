

import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: './config.env'
  });

connectDB().then(() => {
    app.on('error', (err) => {
        console.log('ERROR::', err)
        throw console.err;
    });

}).catch(err => {
    console.log(err)
    process.exit(1)
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`App is listening at port:: ${PORT}`)
})