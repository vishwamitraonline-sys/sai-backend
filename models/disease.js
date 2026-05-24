import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema(
  {
    // ✅ Disease Name
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    // ✅ Symptoms
    symptoms: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    // ✅ Medications
    medications: [
      {
        type: String,
        trim: true,
      },
    ],

    // ✅ Precautions
    precautions: [
      {
        type: String,
        trim: true,
      },
    ],

    // ✅ Diet
    diet: [
      {
        type: String,
        trim: true,
      },
    ],

    // ✅ MEDICAL DEPARTMENT
    // neurology, cardiology, orthopedics
    department: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // ✅ Severity
    severity: {
      type: String,

      enum: [
        "low",
        "medium",
        "high",
      ],

      default: "medium",
    },

    // ✅ Emergency
    emergency: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Disease = mongoose.model(
  "Disease",
  diseaseSchema
);

export default Disease;