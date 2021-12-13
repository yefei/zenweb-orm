# ZenWeb ORM module

[ZenWeb](https://www.npmjs.com/package/zenweb)

```
npm i @zenweb/mysql @zenweb/orm zenorm
```

app/index.js
```js
import { create } from 'zenweb';

export const app = create({
  // database config
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'test',
    charset: 'utf8mb4',
    timezone: '+08:00',
  },
  // ORM Support
  orm: {},
});
```

app/controller/test.js
```js
import { Router } from 'zenweb';
export const router = new Router();

router.get('/', async ctx => {
  ctx.body = await ctx.model.user.find().all();
});
```

## 如何更新模型代码文件

在第一次运行时，或删除 modelsFile 一般位于 ./app/model/index.js
