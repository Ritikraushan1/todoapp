const { asyncError, errorHandler } = require("@/middleware/error");
import { User } from "../../../models/user";
import {
  connectDB,
  cookieSetter,
  generateToken,
} from "../../../utils/features";
import bcrypt from "bcrypt";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only Post Method allowed");
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return errorHandler(res, 400, "Enter all the fields");

  await connectDB();

  let user = await User.findOne({ email });

  if (user) return errorHandler(res, 400, "User already exists. Kindly Login");

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user._id);

  cookieSetter(res, token, true);

  res.status(201).json({
    success: true,
    message: "Registration Successful",
    user,
  });
});

export default handler;
