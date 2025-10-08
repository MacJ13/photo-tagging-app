import mongoose from "mongoose";
import { MONGO_URI } from "../config/db.config";

class DBService {
  private static instance: DBService;

  public static getInstance(): DBService {
    if (!DBService.instance) {
      DBService.instance = new DBService();
    }
    return DBService.instance;
  }
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
}
export default DBService;
// export default new DBService().connect();
// Singleton pattern to ensure a single instance of DBService
// Usage: import DBService from './service/db.service'; DBService.getInstance().connect();
// This ensures that the database connection is established only once throughout the application lifecycle.
// The connect method is asynchronous and returns a promise, allowing for proper handling of connection success or failure.
