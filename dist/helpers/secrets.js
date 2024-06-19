"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecretSync = exports.getSecret = void 0;
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const secret_name = "/allmaps/production/doppler";
const client = new client_secrets_manager_1.SecretsManagerClient({ region: "ca-central-1" });
// This function is used to get the secret asynchronously
const getSecret = async () => {
    let response;
    try {
        response = await client.send(new client_secrets_manager_1.GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        }));
    }
    catch (error) {
        throw error;
    }
    const secret = response.SecretString;
    return JSON.parse(secret);
};
exports.getSecret = getSecret;
// This function is used to get the secret synchronously
const getSecretSync = () => {
    return client.send(new client_secrets_manager_1.GetSecretValueCommand({ SecretId: secret_name }))
        .then((response) => JSON.parse(response.SecretString))
        .catch((error) => console.error(error));
};
exports.getSecretSync = getSecretSync;
//# sourceMappingURL=secrets.js.map