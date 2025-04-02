import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserModel from "./models/UserModel.js"; // Adjust path if necessary

const updatePassword = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/employee_management_system", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const hashedPassword = await bcrypt.hash("cso123", 10);

    const result = await UserModel.updateOne({ username: "cso" }, { $set: { password: hashedPassword } });

    if (result.modifiedCount > 0) {
      console.log("✅ Password updated successfully");
    } else {
      console.log("❌ No user found or password already updated");
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("🚨 Error updating password:", error);
  }
};

updatePassword();
