import e from "express";
import router from './src/router/index.js'
import c from 'config'

const app = e()
const port = c.get("port") || 3000

app.use(e.json())

app.use('/api', router)


app.listen(port, ()=> console.log(`app is running on port ${port}`))