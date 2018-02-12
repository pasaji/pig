import express from 'express'
import store from './src/bot'

const app = express()
app.use(express.static('public'))
app.get('/state', (req, res) => res.json(store.getState()))
app.get('/', (req, res) => res.sendFile('index.html'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))
