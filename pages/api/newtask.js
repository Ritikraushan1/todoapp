import { connectDB, checkAuth } from "../../utils/features";
import { Task } from "../../models/task";
import { asyncError, errorHandler } from "../../middleware/error";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only Post Method allowed");
  await connectDB();
  const { title, description } = req.body;

  if (!title || !description)
    return errorHandler(res, 400, "Enter both title and description.");

  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login First");

  await Task.create({
    title,
    description,
    user: user._id,
  });

  res.json({
    success: true,
    message: "Task Created",
  });
});

export default handler;
