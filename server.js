'use strict'

const express = require('express')
const server = express()

const PORT = process.env['PORT'] || 3000
const HOST = '0.0.0.0'

const dist = `${__dirname}/dist`

server.use(express.static(dist))
server.get('/', (req, res) => res.sendFile(`${dist}/index.html`))

server.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
