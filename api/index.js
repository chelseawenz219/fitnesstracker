const jwt = require("jsonwebtoken");
const express = require("express");
const apiRouter = express.Router();
require("dotenv").config();
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db/users");

// apiRouter.use(async (req, res, next)=>{
//     res.send("Hello");
// })

apiRouter.use(async (req, res, next) => {
    const prefix = "Bearer ";
    const auth = req.header("Authorization");
    if (!auth) {
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      console.log("JWT:", JWT_SECRET, "token:", token);
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
        console.log("id", id);
        if (id) {
          req.user = await getUserById(id);
          console.log("req.user", req.user);
          next();
        }
      } catch ({ name, message }) {
        console.log(name, message);
        next({ hi:"Chelsea", name, message });
      }
    } else {
      next({
        name: "AuthorizationHeaderError",
        message: `Authorization token must start with ${prefix}`,
      });
}});


const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const activitiesRouter = require("./activities");
apiRouter.use("/activities", activitiesRouter);

const routinesRouter = require("./routines");
apiRouter.use("/routines", routinesRouter);

const routineActivitiesRouter = require("./routine_activities");
apiRouter.use("/routine_activities", routineActivitiesRouter);

module.exports = apiRouter;