"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https = require('https');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const routes_1 = require("./routes");
const helpers_1 = require("./helpers");
class AllMaps {
    constructor() {
        // Run the server
        this.run = () => {
            // const keyPath = path.join(__dirname, '../cert/key.pem');
            // const certPath = path.join(__dirname, '../cert/cert.pem');
            // if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
            //     console.error('Key or certificate file not found. Make sure the paths are correct.');
            //     process.exit(1);
            // }
            // const key = fs.readFileSync(keyPath);
            // console.log(key)
            // const cert = fs.readFileSync(certPath);
            // Get the keys and certificates from the secrets manager
            let key;
            let cert;
            (0, helpers_1.getSecret)().then((response) => {
                key = response.SSL_KEY;
                cert = response.SSL_CERT;
                this.createServer(key, cert);
            }).catch((error) => {
                console.error(error);
            });
        };
        this.createServer = (key, cert) => {
            https.createServer({
                key: key,
                cert: cert,
            }, this.app).listen(this.port, () => {
                console.log(`Server running on port ${this.port}`);
            });
        };
        this.configureRoutes = () => {
            this.app.use('/api/proc', routes_1.procRouter);
        };
        this.app = (0, express_1.default)();
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
    initializeMiddlewares() {
        this.app.use(express_1.default.urlencoded({
            extended: true,
            limit: '100KB'
        }));
        this.app.use(express_1.default.json({
            limit: '200KB',
            strict: false
        }));
    }
}
const app = new AllMaps();
app.run();
//# sourceMappingURL=app.js.map