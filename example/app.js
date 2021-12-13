import { Core } from '@zenweb/core';
import { setup } from '../index.js';

const app = new Core();
app.setup('@zenweb/router');
app.setup('@zenweb/mysql');
app.setup(setup);
app.start();
