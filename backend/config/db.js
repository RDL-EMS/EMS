import mongoose from "mongoose";
import dotenv from "dotenv";

// ✅ Load environment variables
dotenv.config();

// ✅ Database connection function
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// ✅ Export PORT from .env or use 5000 as default
export const PORT = process.env.PORT || 5000;
