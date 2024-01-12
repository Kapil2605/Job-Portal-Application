const jobModel = require("../models/jobModel");

//CREATE JOBS
const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  req.body.createdBy = req.userId;
  const job = await jobModel.create(req.body);
  res.status(201).json({ message: "Job created Successfully", job });
};

//GET JOB CREATED BY USER
const getJobController = async (req, res, next) => {
  const jobs = await jobModel.find({ createdBy: req.userId });
  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};

//UPDATE THE CREATED JOB
const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  //validation
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  //find job
  const job = await jobModel.findOne({ _id: id });
  //validation
  if (!job) {
    next(`no jobs found with this id ${id}`);
  }
  //   if (!req.user.userId === job.createdBy.toString()) {
  //     next("Your Not Authorized to update this job");
  //     return;
  //   }
  const updateJob = await jobModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  //res
  res.status(200).json({ message: "Job Updated Successfully", updateJob });
};

//DELETE JOBS
const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  //find job
  const job = await jobModel.findOne({ _id: id });
  //validation
  if (!job) {
    next(`No Job Found With This ID ${id}`);
  }
  //   if (!req.user.userId === job.createdBy.toString()) {
  //     next("Your Not Authorize to delete this job");
  //     return;
  //   }
  await job.deleteOne();
  res.status(200).json({ message: "Success, Job Deleted!" });
};

module.exports = {
  createJobController,
  getJobController,
  updateJobController,
  deleteJobController,
};
