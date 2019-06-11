# nuxt-netlify-http2-server-push

[![npm (scoped with tag)](https://img.shields.io/npm/v/nuxt-netlify-http2-server-push/latest.svg?style=flat-square)](https://npmjs.com/package/nuxt-netlify-http2-server-push)
[![npm](https://img.shields.io/npm/dt/nuxt-netlify-http2-server-push.svg?style=flat-square)](https://npmjs.com/package/nuxt-netlify-http2-server-push)
[![CircleCI](https://img.shields.io/circleci/project/github/jmblog/nuxt-netlify-http2-server-push.svg?style=flat-square)](https://circleci.com/gh/jmblog/nuxt-netlify-http2-server-push)
[![Codecov](https://img.shields.io/codecov/c/github/jmblog/nuxt-netlify-http2-server-push.svg?style=flat-square)](https://codecov.io/gh/jmblog/nuxt-netlify-http2-server-push)
[![Dependencies](https://david-dm.org/jmblog/nuxt-netlify-http2-server-push/status.svg?style=flat-square)](https://david-dm.org/jmblog/nuxt-netlify-http2-server-push)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

> Nuxt.js module for enabling HTTP/2 server push on Netlify

[📖 **Release Notes**](./CHANGELOG.md)

## Features

This module generates a `_headers` file which enables HTTP/2 server push on Netlify.

## Setup

- Add `nuxt-netlify-http2-server-push` dependency using yarn or npm to your project

```sh
$ npm install --save nuxt-netlify-http2-server-push
# or
$ yarn add nuxt-netlify-http2-server-push
```

- Add `nuxt-netlify-http2-server-push` to the `modules` section of `nuxt.config.js` and configure the `resources` property

```js
{
  modules: [
    [
      'nuxt-netlify-http2-server-push',
      {
        // Specify relative path to the dist directory and its content type
        resources: [
          { path: '**/*.js', as: 'script' },
          { path: 'images/hero.jpg', as: 'image' },
          { path: 'fonts/*.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
          { path: 'images/bg-image-narrow.png', as: 'image', media: '(max-width: 600px)', },
        ]
      }
    ]
  ]
}
```

## Usage

Just run `nuxt generate` or call `nuxt.generate()`.

This module will generate a `_headers` file in the root of the `dist` directory. If you have your own `_headers` file, the additional lines will be appended to it.

Please read https://www.netlify.com/blog/2017/07/18/http/2-server-push-on-netlify/
for more details about HTTP/2 Server Push on Netlify.

## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Yoshihide Jimbo
