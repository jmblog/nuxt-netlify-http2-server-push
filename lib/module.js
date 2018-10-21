const consola = require('consola');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const logger = consola.withScope('nuxt:netlify-http2-server-push');

module.exports = async function module(moduleOptions) {
  const options = Object.assign({}, moduleOptions);

  if (!options.resources) {
    logger.error('The `resources` property is required.');
    return;
  }

  const hook = () => {
    logger.start('Generating a _headers file...');
    generateHeaderFile(this, options.resources || []);
  };

  this.nuxt.hook('generate:distCopied', hook);
};

const generateHeaderFile = (context, resources) => {
  const generateDir = path.resolve(context.options.generate.dir);
  const headersFile = `${generateDir}/_headers`;
  let content = '/*\n';
  resources.forEach(resource => {
    const files = glob.sync(`${generateDir}/${resource.path}`);
    files.forEach(file => {
      const url = file.replace(generateDir, '');
      content += `  Link: <${url}>; rel=preload; as=${resource.as}\n`;
    });
  });
  fs.appendFile(headersFile, content, err => {
    if (err) {
      logger.error(err);
    } else {
      logger.success('Generated /_headers');
    }
  });
};

module.exports.meta = require('../package.json');
