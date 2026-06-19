import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";
import courseRouter from "./routes/course.routes.js";
import cartRouter from "./routes/cart.routes.js";

//routes declaration
//step 3: write the full route here
//http://localhost:8000/api/v1/users

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/cart", cartRouter);


export { app };
