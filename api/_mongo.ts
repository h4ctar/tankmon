import { MongoClient, ServerApiVersion } from "mongodb";

export const client = new MongoClient(process.env.MONGO_URI, {
    sslKey: process.env.MONGO_CERT,
    sslCert: process.env.MONGO_CERT,
    serverApi: ServerApiVersion.v1,
});
