const { Nuxt, Builder, Generator } = require('nuxt');
const fs = require('fs');

const distDir = `${__dirname}/../dist`;
const headersFilePath = `${distDir}/_headers`;

describe('no `resources` property', () => {
  let nuxt;
  const config = require('./fixture/nuxt.config.no-resource');

  beforeAll(async () => {
    nuxt = new Nuxt(config);
    const builder = new Builder(nuxt);
    await new Generator(nuxt, builder).generate();
  }, 60000);

  test('skip generating _headers file', async () => {
    const headersFilePath = `${distDir}/_headers`;
    expect(fs.existsSync(headersFilePath)).toBeFalsy();
  });
});

describe('basic', () => {
  let nuxt;
  const config = require('./fixture/nuxt.config');

  beforeAll(async () => {
    nuxt = new Nuxt(config);
    const builder = new Builder(nuxt);
    await new Generator(nuxt, builder).generate();
  }, 60000);

  test('generate a new _headers file', async () => {
    const files = [];
    expect(fs.existsSync(headersFilePath)).toBeTruthy();
    const data = await fs.readFileSync(headersFilePath, 'utf8');
    fs.readdirSync(`${distDir}/_nuxt/`, 'utf8').map(file => {
      if (file.match(/\.js$/)) {
        files.push(file);
      }
    });
    fs.readdirSync(`${distDir}/images/`, 'utf8').map(file => {
      if (file.match(/\.jpg$/)) {
        files.push(file);
      }
    });
    files.forEach(file => {
      expect(data).toMatch(new RegExp(file));
    });
  });
});

describe('append', () => {
  let nuxt;
  const config = require('./fixture/nuxt.config');

  beforeAll(async () => {
    fs.copyFileSync(
      `${__dirname}/fixture/_headers`,
      `${__dirname}/fixture/static/_headers`
    );

    nuxt = new Nuxt(config);
    const builder = new Builder(nuxt);
    await new Generator(nuxt, builder).generate();
  }, 60000);

  afterAll(() => {
    fs.unlinkSync(`${__dirname}/fixture/static/_headers`);
  });

  test('append to the _headers file', async () => {
    const files = [];
    expect(fs.existsSync(headersFilePath)).toBeTruthy();
    const data = await fs.readFileSync(headersFilePath, 'utf8');
    fs.readdirSync(`${distDir}/_nuxt/`, 'utf8').map(file => {
      if (file.match(/\.js$/)) {
        files.push(file);
      }
    });
    fs.readdirSync(`${distDir}/images/`, 'utf8').map(file => {
      if (file.match(/\.jpg$/)) {
        files.push(file);
      }
    });
    files.forEach(file => {
      expect(data).toMatch(new RegExp(file));
    });
    expect(data).toMatch('X-Frame-Options: DENY');
    expect(data).toMatch('X-XSS-Protection: 1; mode=block');
  });
});
