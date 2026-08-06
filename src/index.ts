import express, { type Request, type Response } from "express";

// import middlewares
import morgan from "morgan";

const app = express();
const port = 3000;

import myInfo from "./routes/infoRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import busketRoutes from "./routes/busketRoutes.js";

// body parser middleware
app.use(express.json());

// logger middleware
app.use(morgan("dev"));
// app.use(morgan("combined"));

// Endpoints
app.get("/", (req: Request, res: Response) => {
  res.send("Quiz #2 - API service");
});

app.get("/me", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Quiz #2 - API service",
  });
});

app.use("/myinfo", myInfo);
app.use("/api/v888/auth", usersRoutes);
app.use("/api/v888/busket", busketRoutes);

app.get("/myInfo", (req: Request, res: Response) => {
  return res.json({
    ok: true,
    fullName: "Panupong Wang-Gae",
    studentId: "660610888",
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

// Export app for vercel deployment
export default app;
