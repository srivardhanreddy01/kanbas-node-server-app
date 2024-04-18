import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    image: String,
    theme: String,
    semester: String,
  },
  { collection: "courses" }
);
export default courseSchema;
