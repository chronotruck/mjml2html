# MJML2HTML

![CircleCI](https://img.shields.io/circleci/project/github/chronotruck/mjml2html/master.svg)
![Dependencies](https://img.shields.io/david/chronotruck/mjml2html.svg)
![Dev Dependencies](https://img.shields.io/david/dev/chronotruck/mjml2html.svg)
![Docker Pulls](https://img.shields.io/docker/pulls/chronotruck/mjml2html.svg)
[![License](https://img.shields.io/github/license/chronotruck/mjml2html.svg)](https://github.com/chronotruck/mjml2html/blob/master/LICENSE)

> Simple API to convert MJML content to HTML on the fly.

## Requirements

- Git
- Docker
- Docker-compose

## Getting started

To set-up the project, run the following command:

```bash
docker-compose up
```

Once the Docker is running, you can use your API endpoint under `localhost:3001`.

## Usage

This project exposes a `POST` endpoint under `/`. To make it work, you must send a `text/plain` body with your MJML content.
When received, the server converts your MJML into an HTML string and returns the content as `text/html`.

## Example

```bash
curl --header "Content-Type: text/plain" \
  --request POST \
  --data '<mjml><mj-body><mj-text>Hello!</mj-text></mj-body></mjml>' \
  http://localhost:3001/
```

May return:
```html
<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <!-- Head (croped for demo)... -->
      <body>
      <div
         style=""
      >
      <div
         style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;"
      >
        Hello!
      </div>
      </div>
      </body>
    </html>
```

## API

To use the API params, you can pass them as query parameters
`localhost:3001/?comments=false&minfiy=true`.

| Param      | Type       | Default    | Possible values |
|------------|------------|------------|------------
| comments    | Boolean | false |
| minify    | Boolean | false |
| beautify    | Boolean | false |
| validation    | String | strict | skip, soft, strict

## License

This project is licensed under [MIT License](http://en.wikipedia.org/wiki/MIT_License)
