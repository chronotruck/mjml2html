const express = require('express')
const mjml = require('mjml')
const { registerDependencies } = require('mjml-validator')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 80
const app = express()

/**
 * Override the validation parameters by specifying that
 * the mj-wrapper element CAN have another mj-wrapper as a child component.
 */
registerDependencies({
  'mj-wrapper': ['mj-wrapper', 'mj-hero', 'mj-raw', 'mj-section']
})

app.use(bodyParser.text())

app.post('/', (req, res) => {
  if (req.body) {
    if (req.headers['content-type'] !== 'text/plain') {
      res.type('json')
        .status(400)
        .send(JSON.stringify({
          error: 'Only text/plain content-type is authorized.'
        }))
      return
    }

    /**
     * Query params
     */
    const comments = req.query.comments === 'true'
    const beautify = req.query.beautify === 'true'
    const minify = req.query.minify === 'true'
    const validationLevel = req.query.validation || 'strict'

    try {
      const output = mjml(req.body, {
        keepComments: comments,
        beautify,
        minify,
        validationLevel
      })
      
      res
        .type('html')
        .status(200)
        .send(output.html)
    } catch (e) {
      res
        .type('json')
        .status(422)
        .send(JSON.stringify({
          error: e.message
        }))
    }
  } else {
    res
      .type('json')
      .status(400)
      .send(JSON.stringify({
        error: 'Missing content on the body request.'
      }))
  }
})

app.listen(PORT, () => {
  console.log(`MJML to HTML started on port ${PORT}`)
})
