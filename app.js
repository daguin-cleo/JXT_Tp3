const express = require('express')
const app = express()
const port = process.env.PORT || '3000'
app.get('/users', (req,res) => {
    res
        .status(200)
        .send([
            {
                name: 'Cleo Daguin',
                login: 'cleo'
            },
            {
                name: 'Julie Chapdelaine',
                login: 'julie'
            }
        ])
})

app.listen(port)