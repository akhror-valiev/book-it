import catchAsynsErrors from "./catchAsynsErrors";
import ErrorHandler from "../utils/errorHandler";
import { getSession } from "next-auth/react";

const isAuthenticatedUser = catchAsynsErrors(async (req, res, next) => {
    const session = await getSession({ req });



    if (!session) {
        return next(new ErrorHandler("Login first to access this resource", 401));
    }

    req.user = session.user;
    next();
});


export {
    isAuthenticatedUser
}