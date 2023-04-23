import registerApis from "./api/apis";

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const server = (port = 3003) => {
    const app = new Koa();
    const router = new Router();

    // Define routes
    router.get('/', async (ctx) => {
        ctx.body = 'Hello, Koa';
    });
    registerApis(router);
    // Use middleware
    app.use(bodyParser());
    app.use(router.routes());
    // Listen for HTTP requests
    const server = app.listen(port, () => {
        console.log(`server listening on port ${port}`);
    });
    process.on('SIGINT', () => {
        console.log('Shutting down server...');
        server.close(() => {
            console.log('Server has been shut down');
            process.exit();
        });
    });
}
export default server