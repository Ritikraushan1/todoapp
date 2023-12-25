const { asyncError, errorHandler } = require("@/middleware/error");
import { cookieSetter } from "../../../utils/features";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET Method allowed");

  cookieSetter(res, null, false);

  res.status(202).json({
    success: true,
    message: `Good Bye ${user.name}`,
  });
});

export default handler;
