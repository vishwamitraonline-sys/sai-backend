import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import connectDB from "./database/mongodb.js";
import Disease from "./models/disease.js";
import Hospital from "./models/hospital.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARE =================
app.use(cors());

app.use(
  express.json({
    limit: "10mb",
  })
);

// ================= DATABASE =================
connectDB();

// ================= USER MODEL =================
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  messageCount: {
    type: Number,
    default: 0,
  },
  lastReset: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

// ================= AUTH =================
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret123"
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("AUTH ERROR:", err.message);

    return res.status(401).json({
      error: "Invalid token",
    });
  }
};

// ================= SIGNUP =================
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required",
      });
    }

    const cleanedEmail = email.trim().toLowerCase();

    const existing = await User.findOne({
      email: cleanedEmail,
    });

    if (existing) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: cleanedEmail,
      password: hashed,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET || "secret123",
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Signup failed",
    });
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required",
      });
    }

    const cleanedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: cleanedEmail,
    });

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET || "secret123",
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Login failed",
    });
  }
});

// ================= OPENAI =================
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ================= HELPERS =================
const normalizeText = (text = "") => {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const escapeRegex = (text = "") => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const hasSymptomMatch = (prompt, symptom) => {
  const cleanedPrompt = normalizeText(prompt);
  const cleanedSymptom = normalizeText(symptom);

  if (!cleanedSymptom) return false;

  const regex = new RegExp(`\\b${escapeRegex(cleanedSymptom)}\\b`, "i");

  return regex.test(cleanedPrompt) || cleanedPrompt.includes(cleanedSymptom);
};

const getDiseaseDepartment = (disease) => {
  return normalizeText(
    disease.department || disease.specialization || "general"
  );
};

// ================= DEPARTMENT DETECTION =================
const detectDepartmentFromPrompt = (prompt) => {
  const text = normalizeText(prompt);

  const departmentKeywords = [
    {
      department: "pulmonology",
      keywords: [
        "breathing problem",
        "breathing difficulty",
        "difficulty breathing",
        "shortness of breath",
        "short breath",
        "breathlessness",
        "wheezing",
        "asthma",
        "cough",
        "dry cough",
        "chest congestion",
        "lung",
        "lungs",
        "oxygen problem",
        "respiratory problem",
      ],
    },
    {
      department: "cardiology",
      keywords: [
        "chest pain",
        "heart pain",
        "heart problem",
        "palpitations",
        "fast heartbeat",
        "slow heartbeat",
        "bp",
        "blood pressure",
        "high blood pressure",
        "low blood pressure",
        "cardiac",
      ],
    },
    {
      department: "neurology",
      keywords: [
        "headache",
        "severe headache",
        "migraine",
        "fits",
        "seizure",
        "dizziness",
        "numbness",
        "weakness",
        "stroke",
        "memory loss",
        "nerve pain",
      ],
    },
    {
      department: "ophthalmology",
      keywords: [
        "eye pain",
        "eye problem",
        "blurred vision",
        "vision problem",
        "red eye",
        "watery eyes",
        "eye infection",
        "loss of vision",
        "glaucoma",
      ],
    },
    {
      department: "ent",
      keywords: [
        "ear pain",
        "ear problem",
        "throat pain",
        "sore throat",
        "nose block",
        "blocked nose",
        "sinus",
        "hearing problem",
        "tonsils",
        "tonsillitis",
      ],
    },
    {
      department: "dental",
      keywords: [
        "tooth pain",
        "teeth pain",
        "gum pain",
        "dental pain",
        "tooth decay",
        "bleeding gums",
        "mouth ulcer",
      ],
    },
    {
      department: "gastroenterology",
      keywords: [
        "stomach pain",
        "abdominal pain",
        "vomiting",
        "vomitings",
        "nausea",
        "loose motions",
        "diarrhea",
        "constipation",
        "gastric",
        "acidity",
        "liver",
        "digestion",
      ],
    },
    {
      department: "urology",
      keywords: [
        "urine problem",
        "urinary problem",
        "burning urination",
        "kidney stone",
        "kidney pain",
        "frequent urination",
        "blood in urine",
        "urology",
      ],
    },
    {
      department: "nephrology",
      keywords: [
        "kidney problem",
        "kidney failure",
        "dialysis",
        "swelling legs",
        "creatinine",
        "nephrology",
      ],
    },
    {
      department: "orthopedic",
      keywords: [
        "joint pain",
        "bone pain",
        "back pain",
        "knee pain",
        "fracture",
        "leg pain",
        "shoulder pain",
        "neck pain",
        "arthritis",
      ],
    },
    {
      department: "gynecology",
      keywords: [
        "period problem",
        "period pain",
        "pregnancy",
        "pregnant",
        "pcod",
        "pcos",
        "white discharge",
        "gynecology",
      ],
    },
    {
      department: "endocrinology",
      keywords: [
        "diabetes",
        "sugar",
        "thyroid",
        "hormone",
        "weight gain",
        "weight loss",
        "endocrine",
      ],
    },
  ];

  for (const item of departmentKeywords) {
    for (const keyword of item.keywords) {
      if (hasSymptomMatch(text, keyword)) {
        return item.department;
      }
    }
  }

  return "general";
};

// ================= CHAT =================
app.post("/chat", authMiddleware, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt required",
      });
    }

    const cleanedPrompt = normalizeText(prompt);
    const detectedDepartment = detectDepartmentFromPrompt(prompt);

    console.log("USER PROMPT:", cleanedPrompt);
    console.log("DETECTED DEPARTMENT:", detectedDepartment);

    // ================= SHOW HOSPITALS COMMAND =================
    if (
      cleanedPrompt.includes("hospital") ||
      cleanedPrompt.includes("hospitals") ||
      cleanedPrompt.includes("show hospital") ||
      cleanedPrompt.includes("show hospitals") ||
      cleanedPrompt.includes("nearby hospital") ||
      cleanedPrompt.includes("nearby hospitals")
    ) {
      const districts = await Hospital.distinct("district");

      const sortedDistricts = districts
        .filter(Boolean)
        .map((d) => d.toLowerCase())
        .sort();

      console.log("DISTRICTS FOUND:", sortedDistricts.length);

      return res.json({
        source: "districts",
        districts: sortedDistricts,
      });
    }

    // ================= DISEASE MATCHING =================
    const diseases = await Disease.find();

    let bestMatch = null;
    let highestScore = 0;

    for (const disease of diseases) {
      let score = 0;

      for (const symptom of disease.symptoms || []) {
        if (hasSymptomMatch(cleanedPrompt, symptom)) {
          score++;
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = disease;
      }
    }

    console.log("BEST MATCH:", bestMatch?.name);
    console.log("MATCH SCORE:", highestScore);

    // Minimum 2 symptom matches required.
    if (bestMatch && highestScore >= 2) {
      const department = getDiseaseDepartment(bestMatch);

      return res.json({
        source: "database",

        disease: bestMatch.name,

        medications: bestMatch.medications || [],

        precautions: bestMatch.precautions || [],

        diet: bestMatch.diet || [],

        department,

        severity: bestMatch.severity || "medium",

        suggestHospital: true,
      });
    }

    // ================= AI FALLBACK WITH DEPARTMENT =================
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content: `
You are a medical educational assistant.

Important safety rules:
1. Do not give final diagnosis.
2. Say "Possible condition" only.
3. Keep response short and simple.
4. Mention:
- Possible condition
- Medication awareness
- Precautions
- Diet
5. Do not prescribe strong medicines or exact dosage.
6. Always advise doctor consultation for serious symptoms.
7. The likely related medical department is: ${detectedDepartment}.
8. Add this small disclaimer at the end:
"S.A.I can make mistakes. This information is for educational purposes only. Please consult a qualified doctor for medical advice."
`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "No response available.";

    res.json({
      source: "ai",
      reply,
      department: detectedDepartment,
      suggestHospital: detectedDepartment !== "general",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "AI request failed",
    });
  }
});

// ================= DISTRICTS =================
app.get("/districts", async (req, res) => {
  try {
    const districts = await Hospital.distinct("district");

    const sortedDistricts = districts
      .filter(Boolean)
      .map((d) => d.toLowerCase())
      .sort();

    console.log("DISTRICTS:", sortedDistricts);

    res.json({
      source: "districts",
      districts: sortedDistricts,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to load districts",
    });
  }
});

// ================= HOSPITALS =================
app.get("/hospitals/:district/:department", async (req, res) => {
  try {
    const district = normalizeText(req.params.district);
    const department = normalizeText(req.params.department || "general");

    console.log("DISTRICT:", district);
    console.log("DEPARTMENT:", department);

    let query = {
      district: {
        $regex: new RegExp(`^${escapeRegex(district)}$`, "i"),
      },
    };

    // If department is general, show all hospitals in selected district.
    // If department is specific, show only matching department hospitals.
    if (department && department !== "general" && department !== "all") {
      query.departments = {
        $elemMatch: {
          $regex: new RegExp(`^${escapeRegex(department)}$`, "i"),
        },
      };
    }

    const hospitals = await Hospital.find(query);

    console.log("HOSPITAL COUNT:", hospitals.length);

    res.json({
      source: "hospitals",
      hospitals,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to load hospitals",
    });
  }
});

// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("Medical AI Server Running");
});

// ================= START =================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});