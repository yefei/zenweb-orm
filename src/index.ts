import * as path from 'path';
import { Context } from 'koa';
import { Query } from 'zenorm';
import { SetupFunction } from '@zenweb/core';

/**
 * 绝对路径
 */
function absolutePath(filename: string) {
  return filename.startsWith('./') ? path.join(process.cwd(), filename) : filename;
}

export interface ORMOption {
  /**
   * 取得数据库查询对象
   * @default {ctx.db}
   */
  getQuery?: (ctx: Context) => Query;

  /**
   * 挂载到 ctx 中的属性名
   * @default 'model'
   */
  contextProperty?: string;

  /**
   * 数据库表配置项文件夹
   * @default './app/model/options'
   */
  optionsDir?: string;

  /**
   * 生成 typing 文件路径
   * @default './app/model/index.d.ts'
   */
  typingFile?: string;

  /**
   * 生成 models 文件路径
   * @default './app/model/index.js'
   */
  modelsFile?: string;
}

const defaultOption: ORMOption = {
  getQuery: ctx => ctx.db,
  contextProperty: 'model',
  optionsDir: './app/model/options',
  typingFile: './app/model/index.d.ts',
  modelsFile: './app/model/index.js',
};

export default function setup(option?: ORMOption): SetupFunction {
  option = Object.assign({}, defaultOption, option);
  return async function orm(setup) {
    setup.debug('option: %o', option);
    const modelsFile = absolutePath(option.modelsFile);
    // if (!existsSync(modelsFile)) {
    //   const optionsDir = absolutePath(option.optionsDir);
    //   const typingFile = absolutePath(option.typingFile);
    //   setup.debug('absolute path: %O', { optionsDir, typingFile, modelsFile });
    //   await generate(option.getQuery(), {
    //     optionsDir,
    //     modelsFile,
    //     typingFile,
    //     declareQueriesToModule: `koa.BaseContext.${option.contextProperty}`,
    //   });
    // }
    const { queries } = require(modelsFile);
    setup.defineContextCacheProperty(option.contextProperty, ctx => queries(option.getQuery(ctx)));
  }
}
