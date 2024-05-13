import { default as express } from 'express';
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

import { procRouter } from './routes';
class AllMaps {
    private app: express.Application;
    private port: number;
    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.port = Number(process.env.PORT) || 3000;
        this.configureRoutes();
        this.initializeMiddlewares();
    }

    public run = () => {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    private configureRoutes = () => {
        this.app.use('/api/proc', procRouter);
    }

    private initializeMiddlewares() {
        this.app.use(cors({
            origin: "*",
            methods: "GET,POST,PUT,DELETE,PATCH"
        }));

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