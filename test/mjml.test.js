const request = require('request')

const ENDPOINT = 'http://localhost:3001'

describe('Convert MJML to HTML', () => {
  it('should have a working endpoint', (done) => {
    request.post(ENDPOINT, {
      body: '<mjml><mj-body><mj-text>Hello world!</mj-text></mj-body></mjml>',
      headers: {
        'Content-Type': 'text/plain'
      }
    }, (err, response) => {
      expect(response.statusCode).toEqual(200)
      expect(response.headers['content-type']).toContain('text/html')
      expect(response.body).toContain('Hello world!')
      done()
    })
  })

  it('should get an error if wrong content type', (done) => {
    request.post(ENDPOINT, {
      body: '<mjml></mjml>',
      headers: {
        'Content-Type': 'application/json'
      }
    }, (err, response) => {
      expect(response.statusCode).toEqual(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.body).toBeDefined()
      expect(JSON.parse(response.body).error).toEqual('Only text/plain content-type is authorized.')
      done()
    })
  })

  it('should get an error if no content provided', (done) => {
    request.post(ENDPOINT, {
      body: '',
      headers: {
        'Content-Type': 'text/plain'
      }
    }, (err, response) => {
      expect(response.statusCode).toEqual(400)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.body).toBeDefined()
      expect(JSON.parse(response.body).error).toEqual('Missing content on the body request.')
      done()
    })
  })

  it('should get an error if incorrect MJML content is provided', (done) => {
    request.post(ENDPOINT, {
      body: 'hello world',
      headers: {
        'Content-Type': 'text/plain'
      }
    }, (err, response) => {
      expect(response.statusCode).toEqual(422)
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.body).toBeDefined()
      expect(JSON.parse(response.body).error).toEqual('Parsing failed. Check your mjml.')
      done()
    })
  })
})
