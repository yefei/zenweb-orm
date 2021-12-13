import { Router } from '@zenweb/router';
export const router = new Router();

router.get('/', async ctx => {
  ctx.body = await ctx.model.user.find().all();
});
