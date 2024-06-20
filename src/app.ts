import { default as express } from 'express';
import { Request, Response } from 'express';
const https = require('https');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
import { procRouter } from './routes';
import { getSecret } from './helpers';

class AllMaps {
    private app: express.Application;
    private readonly port: number;
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

    // Run Http Server
    public run = () => {
        this.app.listen(this.port, () => {
            console.log(`HTTP server running on port ${this.port}`);
        });
    }


    // Run Https Server
    public secureRun = () => {
        let key: any;
        let cert: any;
        getSecret().then((response) => {
            key = response.SSL_KEY;
            cert = response.SSL_CERT;
            this.createServer(key, cert)
        }).catch((error) => {
            console.error(error);
        });
    }

    private createServer = (key: any, cert: any) => {
        https.createServer({
            key: key,
            cert: cert,
        }, this.app).listen(this.port, () => {
            console.log(`HTTPS server running on port ${this.port}`);
        });
    };

    private configureRoutes = () => {
        this.app.use('/api/proc', procRouter);
        this.app.use('/', (req: Request, res: Response) => {
            res.send('Welcome to the AllMaps API');
        });
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