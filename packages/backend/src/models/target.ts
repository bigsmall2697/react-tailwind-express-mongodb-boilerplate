import mongoose from "mongoose";

const targetSchema = new mongoose.Schema({
  url: String,
  xFrameOptions: String,
  hsts: String,
  csp: String,
});

const Target = mongoose.model("Target", targetSchema);

export default Target;
