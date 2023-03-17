import nc from "next-connect";
import dbConnect from "../../config/dbConnect";
import onError from "../../middlewares/errors";
import { isAuthenticatedUser } from "../../middlewares/auth";
import { updateProfile } from "../../controllers/authControllers";
import { currentUserProfile } from "../../controllers/authControllers";


const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(currentUserProfile);

export default handler;
