import { default as express } from 'express';
const https = require('https');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
import fs from 'fs';
import path from 'path';
import { procRouter } from './routes';
class AllMaps {
    private app: express.Application;
    private port: number;
    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(cors({
            origin: "*",
            accessControlAllowOrigin: "*",
            accessControlAllowHeaders: "*",
            accessControlAllowMethods: "*",
            methods: "GET,POST,PUT,DELETE,PATCH"
        }));
        this.port = Number(process.env.PORT) || 3000;
        this.configureRoutes();
        this.initializeMiddlewares();
    }

    public run = () => {
        const keyPath = path.join(__dirname, '../cert/key.pem');
        const certPath = path.join(__dirname, '../cert/cert.pem');

        if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
            console.error('Key or certificate file not found. Make sure the paths are correct.');
            process.exit(1);
        }

        const key = fs.readFileSync(keyPath);
        const cert = fs.readFileSync(certPath);

        https.createServer({
            key: key,
            cert: cert,
        }, this.app).listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    private configureRoutes = () => {
        this.app.use('/api/proc', procRouter);
    }

    private initializeMiddlewares() {

        this.app.use(express.urlencoded({
            extended: true,
            limit: '100KB'
        }))
        this.app.use(express.json({
            limit: '200KB',
            strict: false
        }));
    }
}

const app = new AllMaps();
app.run();