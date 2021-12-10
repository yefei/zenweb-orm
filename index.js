import path from 'node:path';

/**
 * 安装
 * @param {import('@zenweb/core').Core} core
 */
export function setup(core, option) {
  option = Object.assign({
    getQuery: ctx => core.mysql,
    queries: null,
    contextProperty: 'model',
    typingFile: null, // `./typings/${contextProperty}.d.ts`,
  }, option);
  let typingFile = option.typingFile || `./typings/${option.contextProperty}.d.ts`;
  typingFile = typingFile.startsWith('./') ? path.join(process.cwd(), typingFile) : typingFile;
  console.log({ typingFile })
  core.defineContextCacheProperty(option.contextProperty, ctx => option.queries(option.getQuery(ctx)));
}
