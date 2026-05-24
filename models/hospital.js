import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    // ✅ Hospital Name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ District
    district: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // ✅ DEPARTMENTS AVAILABLE
    departments: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    // ✅ Doctor Name
    doctor: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ Maps URL / Address
    address: {
      type: String,
      required: true,
    },

    // ✅ Hospital Type
    type: {
      type: String,

      enum: [
        "government",
        "private",
        "clinic",
        "corporate",
      ],

      default: "private",
    },

    // ✅ Contact
    contact: {
      type: String,
      default: "",
    },

    // ✅ Emergency Availability
    emergencyAvailable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Hospital = mongoose.model(
  "Hospital",
  hospitalSchema
);

export default Hospital;