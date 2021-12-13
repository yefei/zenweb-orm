import fs from 'node:fs';
import path from 'node:path';
import Debug from 'debug';
import { generate } from 'zenorm';

const debug = Debug('zenweb:orm');

/**
 * 绝对路径
 * @param {string} filename
 * @returns {string}
 */
function absolutePath(filename) {
  return filename.startsWith('./') ? path.join(process.cwd(), filename) : filename;
}

/**
 * 安装
 * @param {import('@zenweb/core').Core} core
 */
export async function setup(core, option) {
  option = Object.assign({
    getQuery: ctx => core.mysql,
    contextProperty: 'model',
    optionsDir: './app/model/options',
    typingFile: './app/model/index.d.ts',
    modelsFile: './app/model/index.js',
  }, option);
  debug('option: %O', option);
  const modelsFile = absolutePath(option.modelsFile);
  if (!fs.existsSync(modelsFile)) {
    const optionsDir = absolutePath(option.optionsDir);
    const typingFile = absolutePath(option.typingFile);
    debug('absolute path: %O', { optionsDir, typingFile, modelsFile });
    await generate(option.getQuery(), {
      optionsDir,
      modelsFile,
      typingFile,
      declareQueriesToModule: `koa.BaseContext.${option.contextProperty}`,
    });
  }
  const { queries } = await import('file://' + modelsFile);
  core.defineContextCacheProperty(option.contextProperty, ctx => queries(option.getQuery(ctx)));
}
