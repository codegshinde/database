import { FastifyInstance } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import mongoose from "mongoose";

/**
 * Connects to the MongoDB database using the specified URI.
 * Throws an error if the connection fails.
 */
async function connectToDatabase() {
  try {
    // Get the MongoDB URI from the environment variables
    const mongodbURI = process.env.DATABASE_URI as string;

    // Connect to MongoDB using Mongoose
    await mongoose.connect(mongodbURI);

    // Log a success message when the connection is established
    console.log("Database Plugin Registered: Connected to MongoDB ✔");
  } catch (error) {
    // If an error occurs during the connection, throw an error
    throw new Error(`Error connecting to the database: ${error}`);
  }
}

/**
 * Disconnects from the MongoDB database.
 */
async function disconnectDatabase() {
  // Disconnect from MongoDB using Mongoose
  await mongoose.disconnect();

  // Log a message indicating successful disconnection
  console.log("Disconnected from MongoDB");
}

/**
 * Fastify plugin to establish a connection to the MongoDB database and
 * add a hook to disconnect when Fastify is closing.
 * @param fastify - The FastifyInstance to which the plugin is registered.
 */
const databasePlugin = async (fastify: FastifyInstance) => {
  // Connect to the database when the plugin is registered
  await connectToDatabase();

  // Add a hook to disconnect when Fastify is closing
  fastify.addHook("onClose", disconnectDatabase);
};

// Export the Fastify plugin
export default fastifyPlugin(databasePlugin);
