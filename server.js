const express = require("express");
const colors = require("colors");
const app = express();
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config();

connectDB();

// Middleware to parse JSON in the request body
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// Swagger api config
// swagger api options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs Job Portal Application",
    },
    servers: [
      {
        //url: "http://localhost:8080",
        url: "https://job-portal-application-b54c.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};


//routes
//app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", require("./routes/authRoutes.js"));
app.use("/api/v1/user", require("./routes/userRoutes.js"));
app.use("/api/v1/job", require("./routes/jobsRoutes.js"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`
      .bgBlue.white
  );
});
