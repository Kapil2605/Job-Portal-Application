const express = require("express");
const {
  createJobController,
  getJobController,
  updateJobController,
  deleteJobController,
} = require("../controllers/jobController");
const router = express.Router();
//CREATE-JOB || POST
router.post("/create-job", createJobController);
//GET-JOB || GET
router.get("/get-job", getJobController);
//UPDATE JOB || PUT/PATCH
router.put("/update-job/:id", updateJobController);
//DELETE JOB || DELETE
router.delete("/delete-job/:id", deleteJobController);
module.exports = router;
