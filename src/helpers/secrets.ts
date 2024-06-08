import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
const secret_name = "/allmaps/production/doppler";
const client = new SecretsManagerClient({ region: "ca-central-1" });

// This function is used to get the secret asynchronously
export const getSecret = async () => {
    let response;

    try {
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        );
    } catch (error) {
        throw error;
    }

    const secret = response.SecretString;
    return JSON.parse(secret);
};


// This function is used to get the secret synchronously
export const getSecretSync = () => {
    return client.send(new GetSecretValueCommand({ SecretId: secret_name }))
        .then((response) => JSON.parse(response.SecretString))
        .catch((error) => console.error(error));
};