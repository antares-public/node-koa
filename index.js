const Koa = require('koa');
const Router = require('koa-router');
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgresql://postgres:root@localhost:5432/test');

const app = new Koa();
const router = new Router();

class User extends Model { }
User.init({
    username: DataTypes.STRING,
}, { sequelize, modelName: 'user' });

router
    .get('/', (ctx, next) => {
        ctx.body = 'Hello World!';
    })
    .post('/', async (ctx, next) => {
        await sequelize.sync();
        const jane = await User.create({
            username: 'janedoe',
        });
        ctx.body = jane.toJSON();
    })

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => console.log('SERVER STARTED'))