import { Home } from "./api/Home";
import registerApis from "./api/apis";

const Koa = require('koa');
const Cors = require('koa2-cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const server = (port = 3333) => {
    const app = new Koa();
    const router = new Router();
    const home = new Home();
    // Define routes
    router.get('/', async (ctx) => {
        // ctx.body = 'Hello, Koa';
        home.action(ctx);
    });
    registerApis(router);
    // Use middleware
    // Enable CORS for all routes
    app.use(Cors({ origin: '*' }));
    app.use(bodyParser());
    app.use(router.routes());
    // Listen for HTTP requests
    const server = app.listen(port, () => {
        console.log(`listen on port ${port}`);
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