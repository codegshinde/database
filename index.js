"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = require("fastify-plugin");
const mongoose_1 = __importDefault(require("mongoose"));
async function connectToDatabase() {
    try {
        const mongodbURI = process.env.DATABASE_URI;
        await mongoose_1.default.connect(mongodbURI);
        console.log("Database Plugin Registered: Connected to MongoDB ✔");
    }
    catch (error) {
        throw new Error(`Error connecting to the database: ${error}`);
    }
}
async function disconnectDatabase() {
    await mongoose_1.default.disconnect();
    console.log("Disconnected from MongoDB");
}
const databasePlugin = async (fastify) => {
    await connectToDatabase();
    fastify.addHook("onClose", disconnectDatabase);
};
exports.default = (0, fastify_plugin_1.fastifyPlugin)(databasePlugin);
