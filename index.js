const express = require('express')
const mjml = require('mjml')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 80
const app = express()

app.use(bodyParser.text())

app.post('/', (req, res, next) => {
  if (req.body) {
    if (req.headers['content-type'] !== 'text/plain') {
      res.type('json')
        .status(400)
        .send(JSON.stringify({
          error: 'Only text/plain content-type is authorized.'
        }))
      next()
    }

    /**
     * Query params
     */
    const comments = req.query.comments === 'true'
    const beautify = req.query.beautify === 'true'
    const minify = req.query.minify === 'true'

    try {
      const output = mjml(req.body, {
        keepComments: comments,
        beautify,
        minify,
        validationLevel: 'strict'
      })

      res.type('html');
      res.status(200).send(output.html)
      next()
    } catch (e) {
      res.type('json')
        .status(422)
        .send(JSON.stringify({
          error: e.message
        }))
      next()
    }
  } else {
    res.type('json')
      .status(400)
      .send(JSON.stringify({
        error: 'Missing content on the body request.'
      }))
    next()
  }
})

app.listen(PORT, () => {
  console.log(`MJML to HTML started on port ${PORT}`)
})
