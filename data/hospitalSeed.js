import mongoose from "mongoose";
import dotenv from "dotenv";
import Hospital from "../models/hospital.js";
import { getTokenSourceMapRange } from "typescript";

// ✅ Load .env
dotenv.config({ path: "./.env" });

const MONGO_URI = process.env.MONGO_URI;

// ================= HOSPITAL DATA =================
const hospitals = [
  // ================= ONCOLOGY =================
  {
    name: "ASIAN CANCER HOSPITAL", district: "srikakulam", departments: ["oncology"], doctor: "Dr. Ravindra Nandana", address: "https://maps.app.goo.gl/8CxzsjojnoSzZaTg8", type: "private",contact: "7099975999", emergencyAvailable: true,
  },
  {
   name: "MAHATMA GANDHI CANCER HOSPITAL", district: "vizianagaram", departments: ["oncology"], doctor: "Dr. Murali Krishna Voonaa", address: "https://maps.app.goo.gl/bByRagxu351XUwXa7", type: "private", contact: "8341033744", emergencyAvailable: true,
  },
  {
   name: "MAHATMA GANDHI CANCER HOSPITAL", district: "vishakapatnam", departments: "oncolgy", doctor: "Dr. Murali Krishna Voonaa", address: "https://maps.app.goo.gl/bByRagxu351XUwXa7", type: "private", contact: "8341033744", emergencyAvailable: true,
  },
  {
   name: "GSL TRUST CANCER HOSPITAL", district: "east godavari", departments: ["oncology"], doctor: "Dr. Veenkat", address: "https://maps.app.goo.gl/msobrgj15ZefxRaf8", type: "private", contact: "7711834567", emergencyAvailable: true,
  },
  {
   name: "OMEGA CANCER HOSPITAL", district: "west godavari", departments: ["oncology"], doctor: "Dr. Revanth Reddy", address: "https://maps.app.goo.gl/BGSZsUYvQqz95zDJ6", type: "private", contact: "8816293333", emergencyAvailable: true,
  },
  {
   name: "AMERICAN ONCOLOGY INSTITUTE", district: "krishna", departments: ["oncology"], doctor: "Dr. Kranthi Kumar", address: "https://maps.app.goo.gl/ynnqPSzKTL2GoL169", type: "private", contact: "18002082000", emergencyAvailable: true,
  },
 {
  name: "NATCO", district: "guntur", departments: ["oncology"], doctor: "Dr. Venkatreddy pothireddy", address: "https://maps.app.goo.gl/shZSA8sy2mUhcj2u6", type: "government", contact: "not applicable", emergencyAvailable: false,
 },
 {
  name: "HCG MNR CANCER HOSPITAL", district: "prakasam", departments: ["oncology"], doctor: "Dr. Alla Deepthi", address: "https://maps.app.goo.gl/dJLLAAwBGuQoU1o77", type: "private", contact: "6358888813", emergencyAvailable: true,
 },
 {
  name: "MEDICOVER CANCER INSTITUTE", district: "nellore", departments: ["oncology"], doctor: "Dr. Nagendra kadapa", address: "https://maps.app.goo.gl/UmCLBtetmBHi5VNa8", type: "private", contact: "040683344455", emergencyAvailable: true,
 },
 {
  name: "ANANTHAPUR CANCER CENTER", district: "ananthapur", departments: ["oncology"], doctor: "Dr. P. Venkata simha", address: "https://maps.app.goo.gl/megpH84iWjtPqQpTA", type: "private", contact: "7396385478", emergencyAvailable: true,
 },
 {
  name: " STATE CANCER INSTITUTE", district: "kurnool", departments: ["oncology"], doctor: "Dr. C S K Prakash", address: "https://maps.app.goo.gl/JzKJ6ZXCCLtK2F388", type: "government", contact: "not applicable", emergencyAvailable: true,
 },
 {
  name: "AMAN CANCER SURGERY", district: "kadapa", departments: ["oncology"], doctor: "Dr. Shaik Amanulla", address: "https://maps.app.goo.gl/uzqdjjjHgCLzc2Z27", type: "private", contact: "9441056683", emergencyAvailable: true,
 },
 {
  name: "SRI VENKATESWARA INSTITUTE OF CANCER CARE", district: "chittoor", departments: ["oncology"], doctor: "Dr. P Nageswara Reddy", address: "https://maps.app.goo.gl/1GZThX8UsK6ZA44S9", type: "government", contact: "not appplicable", emergencyAvailable: false,
 },
  // ================= NEUROLOGY =================
  
  {name: "DHARANI SUPER SPECIALITY HOSPITAL",district: "srikakulam",departments: ["neurology"],doctor: "Dr. Yamuna Rani",address:"https://maps.app.goo.gl/goUpNFzooeEPbeSY8",type: "private", contact: "7780446506", emergencyAvailable: true, },
  {name: "KIMS", district: "srikakulam",departments: ["neurology"], doctor: "Dr. Gouthami",address:"https://maps.app.goo.gl/pVegbP8V9QivPkgZ9", type: "private", contact: "8942271116", emergencyAvailable: "true", },
  {name: "GLOBAL NEURO CARE", district: "srikakulam", departments: ["neurology"], doctor: "Dr. Goutham Devareddy", address: "https://maps.app.goo.gl/xWiJMURjYQSPzdbv5", type: "private", contact: "8125424282", emergencyAvailable: true,},

  { name: "TIRUMALA MEDICOVER HOSPITAL", district: "vizianagaram", departments: ["neurology"], doctor: "Dr. Reddi Sudheer Naidu", address: "https://maps.app.goo.gl/26sF2REqs6sdpH1A7", type: "private", contact: "8827874872", emergencyAvailable: true,},
  { name: "Dr K V RAMA RAO HOSPITAL", district: "vizianagaram", departments: ["neurology"], doctor: "Dr. S venkatesh", address: "https://maps.app.goo.gl/Fa5nSgpdhqCk39ER6", type: "private", contact: "8688701035", emergencyAvailable: true,},
  { name: "BRAIN SPINE AND NEURO CLINIC", district: "vizianagaram", departments: ["neurology"], doctor: "Dr. Reddi Shankar Rao", address: "https://maps.app.goo.gl/LtqqFrqYYAmoEkyJ6", type: "private", contact: "9908981669", emergencyAvailable: true,},

  { name: "DR RAJESH NEURO AND TRAUMA CENTER", district: "vishakapatnam", departments: ["neurology"], doctor: "Dr. Rajesh", address: "https://maps.app.goo.gl/xHbr4eKR3TsWiuu29", type: "private", contact: "7396797918", emergencyAvailable: true,},
  { name: "MB HOSPITALS", district: "vishakapatnam", departments: ["neurology"], doctor: "Dr. K Vishnu Prasad", address: "https://maps.app.goo.gl/62ZfrJXjX9fNFtkA9", type: "private", contact: "6301991460", emergencyAvailable: true,},
  { name: "BHARATHI NEURO CENTER", district: "vishakapatnam", departments: ["neurology"], doctor: "Dr. Bharathi", address: "https://maps.app.goo.gl/vznokQ4LH2nDJVYP7", type: "private", contact: "8978455323", emergencyAvailable: true,},

  { name: "GODAVARI HOSPITAL", district: "east godavari", departments: ["neurology"], doctor: "Dr. Ujjwal Kumar", address: "https://maps.app.goo.gl/XTruXoMqGyQrnnnT9", type: "private", contact: "7799777536", emergencyAvailable: true,},
  { name: "HARITHA NEURO CENTER", district: "east godavari", departments: ["neurology"], doctor: "Dr. Rajesh", address: "https://maps.app.goo.gl/xnwEkhTKCEC3j8c17", type: "private", contact: "9885252889", emergencyAvailable: true,},
  { name: "PRASAD NEURO HOSPITAL", district: "east godavari", departments: ["neurology"], doctor: "Dr. Y Ashutosh prasad", address: "https://maps.app.goo.gl/wsmbjbEmqzNHMR9P7", type: "private", contact: "8832443304", emergencyAvailable: true,},

  { name: "GIFT FERTILITY IVF HOSPITAL", district: "west godavari", departments: "neuroogy", doctor: "Dr. J S Kumar", address: "https://maps.app.goo.gl/e994HzoJ81dVWgG56", type: "private", contact: "7993194614", emergencyAvailable: true,},
  { name: "GOWTHAMI NEURO AND MULTISPECIALITY HOSPITAL", district: "west godavari", departments: ["neurology"], doctor: "NAME NOT AVAILABLE", address: "https://maps.app.goo.gl/ciYdEpAdTyLDi7Se7", type: "private", contact: "NOT AVAILABLE", emergencyAvailable: true,},
  { name: "KIRAN NEUROLOGY CENTER", district: "west godavari", departments: ["neurology"], doctor: "Dr. B kiran", address: "https://maps.app.goo.gl/jcFRXeaQ1nhHxeUw5", type: "private", contact: "8816222324", emergencyAvailable: true,},
  
  { name: "MANIPAL HOSPITAL", district: "krishna", departments: ["neurology"], doctor: "Dr. Sudheer Kumar", address: "https://maps.app.goo.gl/sF9MxW5ZgwjaoEyV8", type: "private", contact: "18001024647", emergencyAvailable: true,},
  { name: "CITY NEURO CENTER", district: "krishna", departments: ["neurology"], doctor: "Dr. K Ravi Shankar", address: "https://maps.app.goo.gl/ZfEiT1eXL3hzFyPy8", type: "private", contact: "9553096268", emergencyAvailable: true,},
  { name: "SRI SATHYA SAI NEURO CENTER", district: "krishna", departments: ["neurology"], doctor: "Dr. C H Rama Krishna Rao", address: "https://maps.app.goo.gl/iubS4R9jmRf79E1m8", type: "private", contact: "9849700369", emergencyAvailable: true,},

  { name: "SRINIVASA NEURO CENTER", district: "guntur", departments: ["neurology"], doctor: "Dr. Ghanta Srinivasa rao", address: "https://maps.app.goo.gl/qs7esRLi6et6AUet5", type: "private", contact: "Not Available", emergencyAvailable: true,},
  { name: "SAI PRIYA HOSPITAL", district: "guntur", departments: ["neurology"], doctor: "Dr. C H Pavan Kumar", address: "https://maps.app.goo.gl/Kz4eXmHnp1tTicgf6", type: "private", contact: "9490056155", emergencyAvailable: true,},
  { name: "RAGHAVENDRA HOSPITAL", district: "guntur", departments: ["neurology"], doctor: "Dr. Vemuri Naga Shankar", address: "https://maps.app.goo.gl/nCXCAYZGDBM6vHFt7", type: "private", contact: "8632267333", emergencyAvailable: true,},

  { name: "SIMS NEUROLOGY", district: "prakasam", departments: ["neurology"], doctor: "Dr. Sriramineni Sudhir", address: "https://maps.app.goo.gl/AZvhUTkVZ1jTU6iQ7", type: "private", contact: "8647231111", emergencyAvailable: true,},
  { name: "MS HOSPITAL", district: "prakasam", departments: ["neurology"], doctor: "Dr. Murali Raayini", address: "https://maps.app.goo.gl/oq8ZCzjzvpss7pS57", type: "private", contact: "Not Available", emergencyAvailable: true,},
  { name: "SURAKSHA HOSPITALS", district: "prakasam", departments: ["neurology"], doctor: "Dr. K. Neeraja", address: "https://maps.app.goo.gl/RFrkHUQkWkUy6ufLA", type: "private", contact: "7032840598", emergencyAvailable: true,},

  { name: "KRISH NEURO AND ORTHO CLINIC", district: "nellore", departments: ["neurology"], doctor: "Dr. Deekshith Narayana", address: "https://maps.app.goo.gl/zpEsuM9GoQdQuURv8", type: "private", contact: "7382194778", emergencyAvailable: true,},
  { name: "UMA MAHESH NEURO CENTER", district: "nellore", departments: ["neurology"], doctor: "Dr. Uma Maheshwara rao", address: "https://maps.app.goo.gl/ghiRrLQYqZFEyepc7", type: "private", contact: "9000269678", emergencyAvailable: true,},
  { name: "DSR NEURO CENTER", district: "nellore", departments: ["neurology"], doctor: "Dr. Duvvuri Dayakar reddy", address: "https://maps.app.goo.gl/vaxjRUyxDc21gDPt5", type: "private", contact: "9704839276", emergencyAvailable: true,},

  { name: "RAJESH NEURO CENTER", district: "ananthapur", departments: ["neurology"], doctor: "Dr. Rajesh Naik", address: "https://maps.app.goo.gl/NLJ7WJMuLxEnDtHk7", type: "private", contact: "9491861470", emergencyAvailable: true,},
  { name: "SUN RAY HOSPITAL", district: "ananthapur", departments: ["neurology"], doctor: "Dr. Ram Mohan", address: "https://maps.app.goo.gl/XvETcuPL8pV3Gwi69", type: "private", contact: "9989517151", emergencyAvailable: true,},
  { name: "KIMS SAVEERA HOSPITAL", district: "ananthapur", departments: ["neurology"], doctor: "Dr. Joshua Caleb", address: "https://maps.app.goo.gl/1SnEfbPW7DsJF8SY8", type: "private", contact: "8554251234", emergencyAvailable: true,},

  { name: "AARYA NEURO CARE", district: "kadapa", departments: ["neurology"], doctor: "Dr. Sai Kiran P", address: "https://maps.app.goo.gl/ZCU8euqFyNPm87CYA", type: "private", contact: "8639994290", emergencyAvailable: true,},
  { name: "ANITHI NEURO CARE", district: "kadapa", departments: ["neurology"], doctor: "Dr. K Jagadeesh Babu", address: "https://maps.app.goo.gl/ShkNqN267TxsdS416", type: "private", contact: "7013480130", emergencyAvailable: true,},
  { name: "JAGADEESH NEURO CARE", district: "kadapa", departments: ["neurology"], doctor: "Dr. Jagadeeshwar reddy", address: "https://maps.app.goo.gl/XQ4YqAZH3QyS7GPt5", type: "private", contact: "NOT AVAILABLE", emergencyAvailable: true,},

  { name: "MEDICOVER HOSPITALS", district: "kurnool", departments: ["neurology"], doctor: "Dr. M Naga Suresh", address: "https://maps.app.goo.gl/6oF7uj7PWAkDT7JG6", type: "private", contact: "04068334455", emergencyAvailable: true,},
  { name: "KURNOOL NEURO CENTER", district: "kurnool", departments: ["neurology"], doctor: "Dr. Baburao Challapalle", address: "https://maps.app.goo.gl/YMvdaE1HYkXV9EVk9", type: "private", contact: "9490464203", emergencyAvailable: true,},
  { name: "KURNOOL HEART AND MULTISPECIALITY HOSPITAL", district: "kurnool", departments: ["neurology"], doctor: "Dr. K Hemanth Kumar", address: "https://maps.app.goo.gl/HFgebdkEB3LthSuc8", type: "private", contact: "9441094410", emergencyAvailable: true,},

  { name: "AMMA HOSPITAL", district: "chittoor", departments: ["neurology"], doctor: "Dr. Kalyan", address: "https://maps.app.goo.gl/9Wh6Tbzj343XzTGY8", type: "private", contact: "9573375003", emergencyAvailable: true,},
  { name: "GANTA NEURO HOSPITALS", district: "chittoor", departments: ["neurology"], doctor: "Dr.Ganta Rajasekhar", address: "https://maps.app.goo.gl/yfTvxw7FtLfyyTZp6", type: "private", contact: "6304862259", emergencyAvailable: true,},
  { name: "SIREESHA NEURO CARE", district: "chittoor", departments: ["neurology"], doctor: "Dr. Sireesha Rani", address: "https://maps.app.goo.gl/RkSmAwDwMbEuBdxN9", type: "private", contact: "8688663108", emergencyAvailable: true,},

  // ================= OPTHOLOGY =================
 
  { name: "MANCHU EYE CARE", district: "srikakulam",departments: ["opthomology"], doctor: "Dr. M. Vasudeva Rao",address: "https://maps.app.goo.gl/AmnrBUSzYRnSFcFa6", type: "private", contact: "8125703822", emergencyAvailable: true, },
  { name: "DINESH EYE HOSPITAL", district: "srikakulam",departments: ["opthomology"], doctor: "Dr. V. Dinesh",address: "https://maps.app.goo.gl/YVjUhvDjLuQUPFiW9", type: "private", contact: "6302563017", emergencyAvailable: true, },
  { name: "NARAYANA EYE HOSPITAL", district: "srikakulam",departments: ["opthomology"], doctor: "Dr. M. Sudheer Kumar",address: "https://maps.app.goo.gl/MxfvKfhALkY9aRgQA", type: "private", contact: "8555035180", emergencyAvailable: true, },

  { name: "SWAMY EYE HOSPITAL", district: "vizianagaram",departments: ["opthomology"], doctor: "Dr. Manchu Kumar Swamy",address: "https://maps.app.goo.gl/T4SdEH2jZc8fKeG7A", type: "private", contact: "8019905587", emergencyAvailable: true, },
  { name: "PUSHPAGIRI EYE FOUNDATION", district: "vizianagaram",departments: ["opthomology"], doctor: "Dr. Rajat Kapoor",address: "https://maps.app.goo.gl/YxBpfd1UhP2M5C4U8", type: "private", contact: "8922235049", emergencyAvailable: true, },
  { name: "MAXIVISION SUPER SPECIALITY HOSPITAL", district: "vizianagaram",departments: ["opthomology"], doctor: "Dr. K. Padmaja",address: "https://maps.app.goo.gl/4VNMUKdufxnvywGL6", type: "private", contact: "9240214613", emergencyAvailable: true, },

  { name: "CHROMA EYE HOSPITAL", district: "vishakapatnam",departments: ["opthomology"], doctor: "Dr. Vishnu Deepthi",address: "https://maps.app.goo.gl/DavEMYsJ6DcoYzxY8", type: "private", contact: "7981313108", emergencyAvailable: true, },
  { name: "SANKAR FOUNDATION EYE HOSPITAL", district: "vishakapatnam",departments: ["opthomology"], doctor: "Name Not Available",address: "https://maps.app.goo.gl/6NAST3KNBkw51eYZ8", type: "private", contact: "9121005833", emergencyAvailable: true, },
  { name: "MAXIVISION SUPER SPECIALITY EYE HOSPITAL", district: "vishakapatnam",departments: ["opthomology"], doctor: "Dr. Ch. Srinivasa Rao",address: "https://maps.app.goo.gl/T9pueeCQGv2zDk1z6", type: "private", contact: "8912550550", emergencyAvailable: true, },

  { name: "BUDDHUDU HOSPITAL", district: "east godavari",departments: ["opthomology"], doctor: "Dr. Swetha Sajja",address: "https://maps.app.goo.gl/ikDFYjCCvZttGzmX8", type: "private", contact: "7799191470", emergencyAvailable: true, },
  { name: "OM SRI RAM EYE CARE", district: "east godavari",departments: ["opthomology"], doctor: "Dr. V. Ashok Kumar",address: "https://maps.app.goo.gl/hfMSB2cDvxBAmsT49", type: "private", contact: "8834050071", emergencyAvailable: true, },
  { name: "AKIRA EYE HOSPITAL", district: "east godavari",departments: ["opthomology"], doctor: "Dr. N. Prabhakar Rao",address: "https://maps.app.goo.gl/cMFVqZV2aGWQDNWP8", type: "private", contact: "8832477701", emergencyAvailable: true, },

  { name: "PRANALI EYE CARE HOSPITAL", district: "west godavari",departments: ["opthomology"], doctor: "Dr. G. Gopala Rao",address: "https://maps.app.goo.gl/dWK9i7YJWjDejzTU6", type: "private", contact: "7993924025", emergencyAvailable: true, },
  { name: "IDEAL VISION SUPER SPECIALITYEYE HOSPITAL", district: "west godavari",departments: ["opthomology"], doctor: "Dr. P. Suryasoumith",address: "https://maps.app.goo.gl/MCrHaCEc2KTRvoKN8", type: "private", contact: "9493529799", emergencyAvailable: true, },
  { name: "ANU EYE HOSPITAL", district: "west godavari",departments: ["opthomology"], doctor: "Dr. Anu",address: "https://maps.app.goo.gl/Pp8VNdmrKaqHCg5Q9", type: "private", contact: "8019805888", emergencyAvailable: true, },

  { name: "L V PRASAD EYE INSTITUTE", district: "krishna",departments: ["opthomology"], doctor: "Dr. Aravind Roy",address: "https://maps.app.goo.gl/isuYAXKQbSNMEtQPA", type: "private", contact: "8666712020", emergencyAvailable: true, },
  { name: "TRINETRA EYE HOSPITAL", district: "krishna",departments: ["opthomology"], doctor: "Dr. Bindu Madhavi",address: "https://maps.app.goo.gl/FfCPDntrJCBcEnw4A", type: "private", contact: "8977188144", emergencyAvailable: true, },
  { name: "WIN VISION EYE HOSPITAL", district: "krishna",departments: ["opthomology"], doctor: "Dr. Harika Anne",address: "https://maps.app.goo.gl/JYeZqpJdBBAXVcWm8", type: "private", contact: "7450004444", emergencyAvailable: true, },

  { name: "SANKARA EYE HOSPITAL", district: "guntur",departments: ["opthomology"], doctor: "Dr. Madhu Kumar",address: "https://maps.app.goo.gl/o9C7p6is6G4wnR6f9", type: "private", contact: "8632347800", emergencyAvailable: true, },
  { name: "MAXIVISION", district: "guntur",departments: ["opthomology"], doctor: "Dr. Ramalinga Reddy",address: "https://maps.app.goo.gl/jPTYTUs26n3qVTnn9", type: "private", contact: "9240214613", emergencyAvailable: true, },
  { name: "VASAN EYE CARE", district: "guntur",departments: ["opthomology"], doctor: "Dr. Chereddy Srinivasa Reddy",address: "https://maps.app.goo.gl/EkVkqR9v8d48zgnR8", type: "private", contact: "18005712222", emergencyAvailable: true, },

  { name: "DR AGARWALS EYE HOSPITAL", district: "prakasam",departments: ["opthomology"], doctor: "Dr. Sai Yashwanth",address: "https://maps.app.goo.gl/nMyffBxgFXJEBTLQA", type: "private", contact: "9594904863", emergencyAvailable: true, },
  { name: "SMART VISION EYE HOSPITAL", district: "prakasam",departments: ["opthomology"], doctor: "Dr. Harshavardhan",address: "https://maps.app.goo.gl/RGYntSh6KwDDVQ5C7", type: "private", contact: "7842232020", emergencyAvailable: true, },
  { name: "SARVA NETRALAYA RETINA AND EYE HOSPITAL", district: "prakasam",departments: ["opthomology"], doctor: "Dr. P. Manasa",address: "https://maps.app.goo.gl/sYZavWJeJ165YQgT9", type: "private", contact: "9642228090", emergencyAvailable: true, },

  { name: "VIJETHA EYE HOSPITAL", district: "nellore",departments: ["opthology"], doctor: "Dr. Hazrat Babu",address: "https://maps.app.goo.gl/k9Wy39dxhD1d1iHi9", type: "private", contact: "8612303355", emergencyAvailable: true, },
  { name: "DESAI EYE CARE", district: "nellore",departments: ["opthology"], doctor: "Dr. Sanjeev Kumar Desai",address: "https://maps.app.goo.gl/vEXAe1yCsCYrVp5Y6", type: "private", contact: "9100208048", emergencyAvailable: true, },
  { name: "SUSEELA NETRALAYA SUPER SPECIALITY EYE HOSPITAL", district: "nellore",departments: ["opthology"], doctor: "Dr. M. Aparna",address: "https://maps.app.goo.gl/ZVAAWUGLb9GvkanQA", type: "private", contact: "9949546785", emergencyAvailable: true, },

  { name: "FOCUS EYE HOSPITAL", district: "ananthapur",departments: ["opthology"], doctor: "Dr. K. Maheswari",address: "https://maps.app.goo.gl/pt22bvQwPokJnSo69", type: "private", contact: "9521218989", emergencyAvailable: true, },
  { name: "SRI PRAKASH EYE HOSPITAL", district: "ananthapur",departments: ["opthology"], doctor: "Dr. B. Siva Prakash Rao",address: "https://maps.app.goo.gl/HkGQdNUsi5Kw6sZs8", type: "private", contact: "8554221006", emergencyAvailable: true, },
  { name: "SMART VISION EYE HOSPITAL", district: "ananthapur",departments: ["opthology"], doctor: "Name Not Available",address: "https://maps.app.goo.gl/a91cmg27Y3n57uRs7", type: "private", contact: "9703933448", emergencyAvailable: true, },

  { name: "MAA EYE CARE HOSPITAL", district: "kadapa",departments: ["opthology"], doctor: "Dr. Dinesh",address: "https://maps.app.goo.gl/2YCrwuYpEz7cguuT9", type: "private", contact: "9398312808", emergencyAvailable: true, },
  { name: "ARVIND EYE CARE HOSPITAL", district: "kadapa",departments: ["opthology"], doctor: "Dr. Raja Venkat Reddy",address: "https://maps.app.goo.gl/FrmozmTA5x1HTrLC7", type: "private", contact: "not available", emergencyAvailable: true, },
  { name: "ASIF KHAN EYE CARE AND OPTICALS", district: "kadapa",departments: ["opthology"], doctor: "Dr. Asif Khan",address: "https://maps.app.goo.gl/KgJdxZptHMms1Tkb6", type: "private", contact: "9959258856", emergencyAvailable: true, },

  { name: "JAYALAKSHMI NETRALAYA", district: "kurnool",departments: ["opthology"], doctor: "Dr. J J Praveen",address: "https://maps.app.goo.gl/pQ3wfk5tFPFFNiik7", type: "private", contact: "8008311344", emergencyAvailable: true, },
  { name: "SUNSHINE ADVANCED EYECARE", district: "kurnool",departments: ["opthology"], doctor: "Dr. Spurthi Reddy",address: "https://maps.app.goo.gl/N4Kt1bsqSCm5UMHc7", type: "private", contact: "9963276070", emergencyAvailable: true, },
  { name: "SANTHIRAM LASER EYE HOSPITAL", district: "kurnool",departments: ["opthology"], doctor: "Name Not Available",address: "https://maps.app.goo.gl/TYwgX9TSdPZp2yjz9", type: "private", contact: "8989464646", emergencyAvailable: true, },

  { name: "L V PRASAD EYE INSTITUTE", district: "chittoor",departments: ["opthology"], doctor: "Name Not Available",address: "https://maps.app.goo.gl/hZAzGoJ3oaCT1bWa6", type: "private", contact: "9963478754", emergencyAvailable: true, },
  { name: "UMA EYE CARE HOSPITAL", district: "chittoor",departments: ["opthology"], doctor: "Dr. N V Arulmozhi Varman",address: "https://maps.app.goo.gl/ajRftSiPPWveFUNA7", type: "private", contact: "8317639709", emergencyAvailable: true, },
  { name: "AMERICAN LASER EYE HOSPITAL", district: "chittoor",departments: ["opthology"], doctor: "Dr. M Ramesh Chandra",address: "https://maps.app.goo.gl/Y5LpeQeZRZw2oDLu8", type: "private", contact: "8989717171", emergencyAvailable: true, },
  
  // =================    ENT   =================
 
  { name: "DR SINDHUR HOSPITAL",district: "srikakulam",departments: ["ent"],doctor: "Dr. P B Kameswara Rao",address: "https://maps.app.goo.gl/q4psydiVmS5Tq92A7", type: "private", contact: "8942228455",emergencyAvailable: true, },
  { name: "JYOTHI ENT CLINIC",district: "srikakulam",departments: ["ent"],doctor: "Dr. K. Someswara Rao",address: "https://maps.app.goo.gl/w3nFPR3wnDTfu3dt7", type: "private", contact: "9291289768",emergencyAvailable: true, },
  { name: "DR KARUKU SREEKANTH",district: "srikakulam",departments: ["ent"],doctor: "Dr. Karuku Sreekanth",address: "https://maps.app.goo.gl/jZgExeftLRHrM5KE8", type: "private", contact: "08942222722",emergencyAvailable: true, },

  { name: "MEDICOVER HOSPITAL",district: "vizianagaram",departments: ["ent"],doctor: "Dr. Prathyusha Mootha",address: "https://maps.app.goo.gl/GMBxKNY2HhoK5Q1W9", type: "private", contact: "04068334455",emergencyAvailable: true, },
  { name: "SRI MANYA ENT CLINIC",district: "vizianagaram",departments: ["ent"],doctor: "Dr. Naga Manohar",address: "https://maps.app.goo.gl/XWijjuYzWCJoWQYz6", type: "private", contact: "8790048343",emergencyAvailable: true, },
  { name: "SUNIL ENT DOCTOR",district: "vizianagaram",departments: ["ent"],doctor: "Dr. A. Sunil",address: "https://maps.app.goo.gl/6XYYfeStBUhWvn8j8", type: "private", contact: "9030693069",emergencyAvailable: true, },

  { name: "ENT ENDOSCOPIC CLINIC",district: "vishakapatnam",departments: ["ent"],doctor: "Dr. K V Sreedhar",address: "https://maps.app.goo.gl/Qz2iN5epdjCjAtgo9", type: "private", contact: "9492725288",emergencyAvailable: true, },
  { name: "DORA'S ENT CLINIC",district: "vishakapatnam",departments: ["ent"],doctor: "Dr. D Hanumanthu Kishore",address: "https://maps.app.goo.gl/xdFsvaFqhTGGZak69", type: "private", contact: "8639030769",emergencyAvailable: true, },
  { name: "S S ENT CLINIC",district: "vishakapatnam",departments: ["ent"],doctor: "Dr. Pradeep Vundavalli",address: "https://maps.app.goo.gl/Jb4pNj3exL4wRBVWA", type: "private", contact: "9951033133",emergencyAvailable: true, },

  { name: "RISE ENT HOSPITAL",district: "east godavari",departments: ["ent"],doctor: "Dr. Uday Chanukya",address: "https://maps.app.goo.gl/XQgWRx6Rm7qjeLSK8", type: "private", contact: "8179871717",emergencyAvailable: true, },
  { name: "SRI SANTHI ENT HOSPITAL",district: "east godavari",departments: ["ent"],doctor: "Dr S. Ravikanth",address: "https://maps.app.goo.gl/eamfV3tYKrS7L92z5", type: "private", contact: "8832475253",emergencyAvailable: true, },
  { name: "USHODAYA ENT HOSPITAL",district: "east godavari",departments: ["ent"],doctor: "Name Not Available",address: "https://maps.app.goo.gl/L73FZQZ95Qi3SgMV9", type: "private", contact: "7842445777",emergencyAvailable: true, },

  { name: "SRI SANTHI ENT HOSPITAL",district: "west godavari",departments: ["ent"],doctor: "Dr. S. Ravikanth",address: "https://maps.app.goo.gl/v4ZTrhd28PQq78aG7", type: "private", contact: "8814220066",emergencyAvailable: true, },
  { name: "SRI SURYA ENT HOSPITAL",district: "west godavari",departments: ["ent"],doctor: "Dr. P. Sathya Srinivas",address: "https://maps.app.goo.gl/BjCtHUeKmGr9wWpA7", type: "private", contact: "8818228388",emergencyAvailable: true, },
  { name: "KANTHI HOSPITAL",district: "west godavari",departments: ["ent"],doctor: "Dr. S. Mahalakshmi",address: "https://maps.app.goo.gl/j6NLPu1NieyziXtg8", type: "private", contact: "8819241967",emergencyAvailable: true, },

  { name: "KANURU ENT HOSPITAL",district: "krishna",departments: ["ent"],doctor: "Dr. A. Sivaram",address: "https://maps.app.goo.gl/bLMoZ85Q9vLmiWph7", type: "private", contact: "9441575717",emergencyAvailable: true, },
  { name: "DR SANDEEP V V K HOSPITAL",district: "krishna",departments: ["ent"],doctor: "Dr. Venkata Krishna",address: "https://maps.app.goo.gl/oE5tR3jcskSzbxRK8", type: "private", contact: "18001024647",emergencyAvailable: true, },
  { name: "PRADEEP'S ENT HOSPITAL",district: "krishna",departments: ["ent"],doctor: "Dr. Pradeep",address: "https://maps.app.goo.gl/bHWD2Dv7fHDNhqmk6", type: "private", contact: "9494244233",emergencyAvailable: true, },

  { name: "BAYYA ENT AND EYE HOSPITAL",district: "guntur",departments: ["ent"],doctor: "Dr. Bayya Sudhir",address: "https://maps.app.goo.gl/gmFpD2Bba11BdGHs7", type: "private", contact: "09381922827",emergencyAvailable: true, },
  { name: "SRI VIJAYA ENT HOSPITAL",district: "guntur",departments: ["ent"],doctor: "Dr. V V K Sandeep",address: "https://maps.app.goo.gl/adaUZWpBugD9Jr4n8", type: "private", contact: "6302432414",emergencyAvailable: true, },
  { name: "SRI KAMESWARI ENT HOSPITAL",district: "guntur",departments: ["ent"],doctor: "Dr. Devasena",address: "https://maps.app.goo.gl/QB4qqBEMoqPncqtX8", type: "private", contact: "9441215800",emergencyAvailable: true, },

  { name: "VASANTH ENT CLINIC",district: "prakasam",departments: ["ent"],doctor: "Dr. Srinivas",address: "https://maps.app.goo.gl/w8YscC41QS8Q9XRx5", type: "private", contact: "8555956566",emergencyAvailable: true, },
  { name: "VASUDHA KALYAN MULTI SPECIALITY HOSPITAL",district: "prakasam",departments: ["ent"],doctor: "Dr. S. Kalyan kumar",address: "https://maps.app.goo.gl/BpNC6cWG9DB9P8Yq5", type: "private", contact: "8592226123",emergencyAvailable: true, },
  { name: "SUDEEP ENT CARE",district: "prakasam",departments: ["ent"],doctor: "Dr. Sudeep Chandra",address: "https://maps.app.goo.gl/fvAy7cSNSui6voFV8", type: "private", contact: "9515854503",emergencyAvailable: true, },
 
  { name: "AIMS HOSPITAL",district: "nellore",departments: ["ent"],doctor: "Dr. Desu Murali Krishna",address: "https://maps.app.goo.gl/DLJ9mqhgkwkzkZz87", type: "private", contact: "Not Available",emergencyAvailable: true, },
  { name: "NAGENDRA HOSPITALS",district: "nellore",departments: ["ent"],doctor: "Dr. Nagendra",address: "https://maps.app.goo.gl/mPgtcbtKnu5AsZHQA", type: "private", contact: "7032345045",emergencyAvailable: true, },
  { name: "APOLLO HOSPITAL",district: "nellore",departments: ["ent"],doctor: "Dr. Sateesh",address: "https://maps.app.goo.gl/eKjRvwgbjVMCdDn78", type: "private", contact: "08062970497",emergencyAvailable: true, },

  { name: "MITHRA ENT HOSPITAL",district: "ananthapur",departments: ["ent"],doctor: "Dr. Krishna Soumya Reddy",address: "https://maps.app.goo.gl/G1RGDr9n3j5Fnvca6", type: "private", contact: "9114667788",emergencyAvailable: true, },
  { name: "SHASHI ENT AND ALLERGY HOSPITAL",district: "ananthapur",departments: ["ent"],doctor: "Dr. D. Raghavendra Reddy",address: "https://maps.app.goo.gl/8s7Keggr8vLKbiEaA", type: "private", contact: "9440985188",emergencyAvailable: true, },
  { name: "ASMA ENT CLINIC",district: "ananthapur",departments: ["ent"],doctor: "Dr. Asma Tarannum",address: "https://maps.app.goo.gl/3e9eHxvjXWugJiZa7", type: "private", contact: "8309586288",emergencyAvailable: true, },

  { name: "KULDEEP ENT AND EYE HOSPITAL",district: "kadapa",departments: ["ent"],doctor: "Dr. Kuldeep",address: "https://maps.app.goo.gl/SA3r1ySxPg5kFfzD6", type: "private", contact: "7901463966",emergencyAvailable: true, },
  { name: "SRI LAKSHMI HOSPITAL",district: "kadapa",departments: ["ent"],doctor: "Dr. G. Shilpa Sri",address: "https://maps.app.goo.gl/MPmgHveqP1h8U1jAA", type: "private", contact: "7780374144",emergencyAvailable: true, },
  { name: "VIJAYA ENT HOSPITAL",district: "kadapa",departments: ["ent"],doctor: "Dr. V. Harikrishna",address: "https://maps.app.goo.gl/vjdYnVHVrWSX5LGM7", type: "private", contact: "9293055820",emergencyAvailable: true, },

  { name: "SRI SATHYA SAI ENT HOSPITAL",district: "kurnool",departments: ["ent"],doctor: "Dr. B. Jayaprakash Reddy",address: "https://maps.app.goo.gl/gmHLwjonzPN5KppU7", type: "private", contact: "9440293940",emergencyAvailable: true, },
  { name: "ANIL ENT CLINIC",district: "kurnool",departments: ["ent"],doctor: "Dr. S. Anil Kumar",address: "https://maps.app.goo.gl/5NTSwkW3G4eV8fUE7", type: "private", contact: "9505457276",emergencyAvailable: true, },
  { name: "V N ENT CARE",district: "kurnool",departments: ["ent"],doctor: "Dr. M. Neelima",address: "https://maps.app.goo.gl/xmj1DeYZbFHUkuBAA", type: "private", contact: "8074759782",emergencyAvailable: true, },

  { name: "PARVATI ENT HOSPITAL",district: "chittoor",departments: ["ent"],doctor: "Dr. M. Manoj Kumar",address: "https://maps.app.goo.gl/zXm4cjBKKsxPLWMv7", type: "private", contact: "7799955757",emergencyAvailable: true, },
  { name: "S L V ENT HOSPITAL",district: "chittoor",departments: ["ent"],doctor: "Dr. G. Pardhava Krishna Karthik",address: "https://maps.app.goo.gl/EeHTu3DcASwK46yW7", type: "private", contact: "7093480750",emergencyAvailable: true, },
  { name: "VALLABHA HOSPITAL",district: "chittoor",departments: ["ent"],doctor: "Dr. D. Harikumar",address: "https://maps.app.goo.gl/8RzqYuV7ViZT1vkm7", type: "private", contact: "9949380624",emergencyAvailable: true, },

    // ================= DENTAL =================
 
  { name: "V DENTAL HOSPITAL",district: "srikakulam", departments: ["dental"], doctor: "Dr. John Madugula", address:"https://maps.app.goo.gl/KYRmhjhTueMNP8Vi7",type: "private",contact: "9550508480", emergencyAvailable: true,},
  { name: "SANJANA MULTY SPECIALITY DENTAL HOSPITAL",district: "srikakulam", departments: ["dental"], doctor: "Dr. Sanjana", address:"https://maps.app.goo.gl/UEqWKVegoHxNKchH7",type: "private",contact: "9169828999", emergencyAvailable: true,},
  { name: "AMRUTHA MULTI SPECIALITY DENTAL CLINIC",district: "srikakulam", departments: ["dental"], doctor: "Dr. Prem Sakhari", address:"https://maps.app.goo.gl/EjiazDU4uz7pc4HbA",type: "private",contact: "9951948898", emergencyAvailable: true,},

  { name: "DR ANAND'S DENTAL CLINIC",district: "vizianagaram", departments: ["dental"], doctor: "Dr. A. Anand", address:"https://maps.app.goo.gl/Xgjhfvi1JwmyWuKY7",type: "private",contact: "8922315225", emergencyAvailable: true,},
  { name: "APPLE DENTAL SPECIALITIES",district: "vizianagaram", departments: ["dental"], doctor: "Dr. Kalyan Chakravarthy", address:"https://maps.app.goo.gl/KZst6dnojVNLWARt5",type: "private",contact: "8922273430", emergencyAvailable: true,},
  { name: "PARTHA DENTAL CLINIC",district: "vizianagaram", departments: ["dental"], doctor: "Dr. P. Srivani", address:"https://maps.app.goo.gl/grBTs37k9thRjt6p6",type: "private",contact: "7075360099", emergencyAvailable: true,},

  { name: "V DENTAL HOSPITAL",district: "vishakapatnam", departments: ["dental"], doctor: "Dr. M. Anitha", address:"https://maps.app.goo.gl/2KpcsmrrFQSibRb29",type: "private",contact: "8179622722", emergencyAvailable: true,},
  { name: "SMILE AND SHINE DENTAL",district: "vishakapatnam", departments: ["dental"], doctor: "Dr. B. Mohan", address:"https://maps.app.goo.gl/d3LL8xvgRTe7RwZXA",type: "private",contact: "9951444422", emergencyAvailable: true,},
  { name: "CONFIDENTAL CARE",district: "vishakapatnam", departments: ["dental"], doctor: "Dr. Prabhakar", address:"https://maps.app.goo.gl/sWcGyjv2v5MqUKEV8",type: "private",contact: "9502491506", emergencyAvailable: true,},

  { name: "KRISHNA DENTAL CURE",district: "east godavari", departments: ["dental"], doctor: "Dr. D. Srilekya", address:"https://maps.app.goo.gl/ms5N25jWnhtUbW5S9",type: "private",contact: "9246658770", emergencyAvailable: true,},
  { name: "GEETHA MULLAPUDI INTERNATIONAL",district: "east godavari", departments: ["dental"], doctor: "Dr. M. Sangeetha", address:"https://maps.app.goo.gl/gv1GqJNCFgiJEx2v5",type: "private",contact: "8832426392", emergencyAvailable: true,},
  { name: "CITY DENTAL HOSPITAL",district: "east godavari", departments: ["dental"], doctor: "Dr. Vamsi Lanka", address:"https://maps.app.goo.gl/oaJcSWg4MYFM3td46",type: "private",contact: "9882598865", emergencyAvailable: true,},

  { name: "32 DENTAL CARE",district: "west godavari", departments: ["dental"], doctor: "Dr. Goutham", address:"https://maps.app.goo.gl/4jFtrWszZhcotw6aA",type: "private",contact: "9394425555", emergencyAvailable: true,},
  { name: "KALYAN SUPER SPECIALITY HOSPITAL",district: "west godavari", departments: ["dental"], doctor: "Dr. Kalyan Ram", address:"https://maps.app.goo.gl/Cr9k9APa1Q2oVGKn8",type: "private",contact: "8333866589", emergencyAvailable: true,},
  { name: "SHINE DENTAL HOSPITAL",district: "west godavari", departments: ["dental"], doctor: "Dr. U. Shivaji Raju", address:"https://maps.app.goo.gl/p5hVAg9o2RKnJ4vF8",type: "private",contact: "9059727674", emergencyAvailable: true,},

  { name: "HAPPY DENTAL CLINIC",district: "krishna", departments: ["dental"], doctor: "Dr. K V Varun Reddy", address:"https://maps.app.goo.gl/Re8yCVCuuqoeW2Ht5",type: "private",contact: "9059768696", emergencyAvailable: true,},
  { name: "SARADA DENTAL CARE",district: "krishna", departments: ["dental"], doctor: "Dr. Ravi Choudary", address:"https://maps.app.goo.gl/gHoNa5hvRL8uN4Df8",type: "private",contact: "9394245999", emergencyAvailable: true,},
  { name: "TRIDENT SUPER SPECIALITY DENTAL CLINIC",district: "krishna", departments: ["dental"], doctor: "Name Not Available", address:"https://maps.app.goo.gl/AVQUwddcu54zDBMB7",type: "private",contact: "9000233477", emergencyAvailable: true,},

  { name: "SMILE DENTAL CLINIC",district: "guntur", departments: ["dental"], doctor: "Dr. Manasa Reddy", address:"https://maps.app.goo.gl/XfoGn4NrbmX3PmWp6",type: "private",contact: "9550231862", emergencyAvailable: true,},
  { name: "VIJAYA KRISHNA DENTAL",district: "guntur", departments: ["dental"], doctor: "Dr. B. Ramanarayana", address:"https://maps.app.goo.gl/EqRnTd4XYXSX9wUKA",type: "private",contact: "7989126839", emergencyAvailable: true,},
  { name: "SREE SAI SWARAJ DENTAL CLINIC",district: "guntur", departments: ["dental"], doctor: "Dr. K. Sampath Kumar", address:"https://maps.app.goo.gl/seYH91fpX2T5sCoV6",type: "private",contact: "7893352679", emergencyAvailable: true,},

  { name: "J L S DENTAL CARE",district: "prakasam", departments: ["dental"], doctor: "Dr. S. Sai Bharadwaj Gupta", address:"https://maps.app.goo.gl/mskE9TkSfj1MUDxC8",type: "private",contact: "7989407646", emergencyAvailable: true,},
  { name: "HAPPY DENTAL HOSPITAL",district: "prakasam", departments: ["dental"], doctor: "Dr. D. Poojitha", address:"https://maps.app.goo.gl/Y5woJhVBWkb6p9na9",type: "private",contact: "9949334763", emergencyAvailable: true,},
  { name: "RAINBOW DENTAL CARE",district: "prakasam", departments: ["dental"], doctor: "Dr. Bhargavan", address:"https://maps.app.goo.gl/gjLVzn8b8vvP3YZs9",type: "private",contact: "9533969969", emergencyAvailable: true,},

  { name: "SMILE SUPERSPECIALITY HOSPITAL",district: "nellore", departments: ["dental"], doctor: "Dr. G. Kiran", address:"https://maps.app.goo.gl/vsysFd2yknHLF67XA",type: "private",contact: "9246434447", emergencyAvailable: true,},
  { name: "HAPPY DENTAL HOSPITAL",district: "nellore", departments: ["dental"], doctor: "Dr. M. Sridhar Reddy", address:"https://maps.app.goo.gl/mGicJRAzmwLcaKER8",type: "private",contact: "9247033555", emergencyAvailable: true,},
  { name: "SIMHAPURI DENTAL HOSPITAL",district: "nellore", departments: ["dental"], doctor: "Dr. D. Srinivasa Reddy", address:"https://maps.app.goo.gl/nn2btMPKRoUibvxG7",type: "private",contact: "9849151800", emergencyAvailable: true,},

  { name: "SAI DIVYA MULTI SPECIALITY DENTAL",district: "ananthapur", departments: ["dental"], doctor: "Dr. G. Divya Jyothi", address:"https://maps.app.goo.gl/T54oddBKfevVNM259",type: "private",contact: "7989532255", emergencyAvailable: true,},
  { name: "JAYAM SUPER SPECIALITY DENTAL HOSPITAL",district: "ananthapur", departments: ["dental"], doctor: "Dr. Jayam Bharath Kumar", address:"https://maps.app.goo.gl/gXRJ2u92p5hsTWGA6",type: "private",contact: "9490179669", emergencyAvailable: true,},
  { name: "KRISHNA CHAITANYA DENTAL HOSPITAL",district: "ananthapur", departments: ["dental"], doctor: "Dr. N. Krishna Chaitanya", address:"https://maps.app.goo.gl/AteTXndLjckHcVct7",type: "private",contact: "8807681746", emergencyAvailable: true,},

  { name: "SHRI KRISHNA DENTAL CARE",district: "kadapa", departments: ["dental"], doctor: "Dr. B. Brijesh Krishna", address:"https://maps.app.goo.gl/QaB8tty8j6g3FZCE9",type: "private",contact: "8143077567", emergencyAvailable: true,},
  { name: "SHRI SATYA SAI GOKUL DENTAL CLINIC",district: "kadapa", departments: ["dental"], doctor: "Dr. Sanda Surya Prakash", address:"https://maps.app.goo.gl/6visz2UR6KqJToXA8",type: "private",contact: "9866881045", emergencyAvailable: true,},
  { name: "RAVI DENTAL CLINIC",district: "kadapa", departments: ["dental"], doctor: "Dr. Ravi Kumar", address:"https://maps.app.goo.gl/EQQW42Ltmt1Potse7",type: "private",contact: "7794809525", emergencyAvailable: true,},

  { name: "SREE DENTAL CLINIC",district: "kurnool", departments: ["dental"], doctor: "Dr. G. Srikanth", address:"https://maps.app.goo.gl/TkhkmQWde31Foc1d8",type: "private",contact: "7893139182", emergencyAvailable: true,},
  { name: "PARTHA DENTAL CLINIC",district: "kurnool", departments: ["dental"], doctor: "Dr. Dhananjay", address:"https://maps.app.goo.gl/gF2qYFKPbq1qFXJr7",type: "private",contact: "9063841802", emergencyAvailable: true,},
  { name: "SMILE CARE DENTAL CLINIC",district: "kurnool", departments: ["dental"], doctor: "Name Not Available", address:"https://maps.app.goo.gl/FxrUpKbJKVkHe2bq9",type: "private",contact: "9440584651", emergencyAvailable: true,},

  { name: "DR PRADEEP'S KUSHI DENTAL CARE",district: "chittoor", departments: ["dental"], doctor: "Dr. Pradeep", address:"https://maps.app.goo.gl/krS8TR9FHft8bZgV6",type: "private",contact: "8572228555", emergencyAvailable: true,},
  { name: "MARUTHI DENTAL HOSPITAL",district: "chittoor", departments: ["dental"], doctor: "Dr. N Pradeep", address:"https://maps.app.goo.gl/hyYyAfejCX9AmJPy8",type: "private",contact: "8572357210", emergencyAvailable: true,},
  { name: "S J SPECIALITY DENTAL",district: "chittoor", departments: ["dental"], doctor: "Dr. K. Udaya Sree", address:"https://maps.app.goo.gl/RZn93ro9hAD36Y3a6",type: "private",contact: "9502703505", emergencyAvailable: true,},
  
  // ================= ENDOCRINOLOGY =================
 
  { name: "TIRUMALA MEDICAL CENTER",district: "srikakulam", departments: ["endocrinology"], doctor: "Dr. G. Sri Harsha", address:"https://maps.app.goo.gl/mSugcAc6MWXscjiu6",type: "private",contact: "7337322732", emergencyAvailable: true,},
  { name: "MEDICOVER HOSPITALS",district: "srikakulam", departments: ["endocrinology"], doctor: "Name Not Available", address:"https://maps.app.goo.gl/nytu2LdzL9VAcfZo9",type: "private",contact: "04068334455", emergencyAvailable: true,},
  { name: "ARKAYA MULTI SPECIALITY HOSPITAL",district: "srikakulam", departments: ["endocrinology"], doctor: "Dr. K. Chinna Babu", address:"https://maps.app.goo.gl/Q2jv2K3uGZPxj1Dg8",type: "private",contact: "9966630433", emergencyAvailable: true,},

  { name: "VISHISTHA SUGAR THYROID",district: "vizianagaram", departments: ["endocrinology"], doctor: "Dr. Ch. Srinivasa Rao", address:"https://maps.app.goo.gl/XqsDPtJcCKaMZBmn8",type: "private",contact: "8922274409", emergencyAvailable: true,},
  { name: "DR NARAYAN'S ENDO CARE",district: "vizianagaram", departments: ["endocrinology"], doctor: "Dr. M. Navya Sruthi", address:"https://maps.app.goo.gl/HRK2B9yrJ3iV9dNJ6",type: "private",contact: "9032773508", emergencyAvailable: true,},
  { name: "SREE VISHAKA DOCTOR'S PLAZA",district: "vizianagaram", departments: ["endocrinology"], doctor: "Name Not Available", address:"https://maps.app.goo.gl/qgEU9GCjYDNpXnR39",type: "private",contact: "Not Available", emergencyAvailable: true,},

  { name: "HORMONE INDIA",district: "vishakapatnam", departments: ["endocrinology"], doctor: "Dr. G. Sri Harsha", address:"https://maps.app.goo.gl/F2jYuW7vpgGE2eJx6",type: "private",contact: "7337322732", emergencyAvailable: true,},
  { name: "RAMYA DIABETEES",district: "vishakapatnam", departments: ["endocrinology"], doctor: "Dr. Ramya Varada", address:"https://maps.app.goo.gl/iRZwMo5taJjMZk8p8",type: "private",contact: "8712127968", emergencyAvailable: true,},
  { name: "ENDOCARE DIABETEES",district: "vishakapatnam", departments: ["endocrinology"], doctor: "Dr. M. Aruna", address:"https://maps.app.goo.gl/9z6foP7BNb428uDw5",type: "private",contact: "9346281345", emergencyAvailable: true,},

  { name: "ABHIRAM DIABETEES AND ENDOCRINE",district: "east godavari", departments: ["endocrinology"], doctor: "Dr. M V Sekhar Reddy", address:"https://maps.app.goo.gl/pFGze5s75xF98BJR6",type: "private",contact: "8331976789", emergencyAvailable: true,},
  { name: "RAJESH DIABETEES AND ENDOCRINE",district: "east godavari", departments: ["endocrinology"], doctor: "Dr. Rajesh", address:"https://maps.app.goo.gl/kMQqvkH91kWNUfmH7",type: "private",contact: "9966597771", emergencyAvailable: true,},
  { name: "DIET HORMONE HOSPITAL",district: "east godavari", departments: ["endocrinology"], doctor: "Dr. B. Durga Prasad", address:"https://maps.app.goo.gl/acPwK7PSS9ZJP4X7A",type: "private",contact: "8367048888", emergencyAvailable: true,},

  { name: "HARSHA DIABETTES AND ENDOCRINE CLINIC",district: "west godavari", departments: ["endocrinology"], doctor: "Dr. Ch Harsha Vardhan", address:"https://maps.app.goo.gl/PvZZ3SDtfGi1ziWG7",type: "private",contact: "9573269629", emergencyAvailable: true,},
  { name: "ABHIRAM DIABETEES AND ENDOCRINE CENTER",district: "west godavari", departments: ["endocrinology"], doctor: "Dr. M V Sekhar Reddy", address:"https://maps.app.goo.gl/EWZGoyHueG65CN9r5",type: "private",contact: "8331976789", emergencyAvailable: true,},
  { name: "RAJESH DIABETTES AND ENDOCRINE CENTER",district: "west godavari", departments: ["endocrinology"], doctor: "Dr. M. Rajesh", address:"https://maps.app.goo.gl/ZxKJGqzqikXdRwSN9",type: "private",contact: "9966597774", emergencyAvailable: true,},

  { name: "SANJEEVANI HOSPITAL",district: "krishna", departments: ["endocrinology"], doctor: "Dr. Venkata Rakesh", address:"https://maps.app.goo.gl/ZyJzQJWoivXqcV1o9",type: "private",contact: "9700285555", emergencyAvailable: true,},
  { name: "LONDON ENDOCRINE AND DIABETEES",district: "krishna", departments: ["endocrinology"], doctor: "Dr. G. Murali Krishna", address:"https://maps.app.goo.gl/nW6JXNNi6qn1SYnAA",type: "private",contact: "9988284444", emergencyAvailable: true,},
  { name: "BHARGAV ENDOCRINE HOSPITAL",district: "krishna", departments: ["endocrinology"], doctor: "Dr. Bhargav", address:"https://maps.app.goo.gl/U2Z4bhw9HEXDBVik9",type: "private",contact: "9154077745", emergencyAvailable: true,},

  { name: "YELURI HOSPITAL",district: "guntur", departments: ["endocrinology"], doctor: "Dr. Nandipati Sandeep", address:"https://maps.app.goo.gl/2BtZEq1NT7236aL9A",type: "private",contact: "9494408877", emergencyAvailable: true,},
  { name: "BHARANI CLINIC",district: "guntur", departments: ["endocrinology"], doctor: "Dr. B. Bharani", address:"https://maps.app.goo.gl/2E3EyCmtsh1CJSEb9",type: "private",contact: "9115945999", emergencyAvailable: true,},
  { name: "K S R SUPER SPECIALITY",district: "guntur", departments: ["endocrinology"], doctor: "Dr. K. Subbarao", address:"https://maps.app.goo.gl/572n1wN96A2fXsb1A",type: "private",contact: "9951219209", emergencyAvailable: true,},

  { name: "ARAVINDA DIABETEES AND ENDOCRINE CLINIC",district: "prakasam", departments: ["endocrinology"], doctor: "Dr. M. Hanumanthu Rao", address:"https://maps.app.goo.gl/vC8QAeqSs3cdoXZU9",type: "private",contact: "Not Available", emergencyAvailable: true,},
  { name: "KEESARI HOSPITAL",district: "prakasam", departments: ["endocrinology"], doctor: "Dr. K. Raja Mohan Reddy", address:"https://maps.app.goo.gl/cTrEwLCZUEmtmtPQA",type: "private",contact: "7093431411", emergencyAvailable: true,},
  { name: "DHURTHI SUPER SPECIALITY CLINIC",district: "prakasam", departments: ["endocrinology"], doctor: "Name Not Available", address:"https://maps.app.goo.gl/pMezgKeaixXucGGs6",type: "private",contact: "8632352354", emergencyAvailable: true,},

  { name: "APOLLO HOSPITAL",district: "nellore", departments: ["endocrinology"], doctor: "Dr. Nishitha Reddy", address:"https://maps.app.goo.gl/5ENiQ391Byyv9XSt5",type: "private",contact: "08046961837", emergencyAvailable: true,},
  { name: "DIABETEES AND ENDOCRINE CLINIC",district: "nellore", departments: ["endocrinology"], doctor: "Dr. Rama Mohan", address:"https://maps.app.goo.gl/3AZUvbt3SZeSGoKd7",type: "private",contact: "8612326892", emergencyAvailable: true,},
  { name: "SAHAJA DIABETEES AND THYROID CLINIC",district: "nellore", departments: ["endocrinology"], doctor: "Dr. Sahaja Reddy", address:"https://maps.app.goo.gl/4C1zNA1eB11Abc1Z8",type: "private",contact: "7799562767", emergencyAvailable: true,},

  { name: "DR HARITHA CLINIC",district: "ananthapur", departments: ["endocrinology"], doctor: "Dr. Galla Haritha", address:"https://maps.app.goo.gl/ZiZN9CuykL5CQ6uWA",type: "private",contact: "8554278829", emergencyAvailable: true,},
  { name: "SINDHU HARMONE CLINIC",district: "ananthapur", departments: ["endocrinology"], doctor: "Dr. Sindhu Sree Rallapalli", address:"https://maps.app.goo.gl/XMEwokn7VJrwjrhB8",type: "private",contact: "7981229006", emergencyAvailable: true,},

  { name: "M R HOSPITAL",district: "kadapa", departments: ["endocrinology"], doctor: "Dr. Hidayathulla", address:"https://maps.app.goo.gl/nrHRYM14t5X2LkKs7",type: "private",contact: "9963409963", emergencyAvailable: true,},
  { name: "BHATIYA DIABETEES AND ENDOCARE",district: "kadapa", departments: ["endocrinology"], doctor: "Dr. K. Chandra Obul reddy", address:"https://maps.app.goo.gl/SFH79ZU3PmNwSZ498",type: "private",contact: "9985534319", emergencyAvailable: true,},
  { name: "SRI SUDHA DIABETIC AND GENERAL",district: "kadapa", departments: ["endocrinology"], doctor: "Dr. Khaleed", address:"https://maps.app.goo.gl/5gKwXagB9DQwsR3g6",type: "private",contact: "8008353236", emergencyAvailable: true,},

  { name: "BHARAT ENDOCRINE",district: "kurnool", departments: ["endocrinology"], doctor: "Dr. Bharat", address:"https://maps.app.goo.gl/4c5kXDgb28YNzcLU6",type: "private",contact: "9704221123", emergencyAvailable: true,},
  { name: "VASAVI ENDOCRINE CLINIC",district: "kurnool", departments: ["endocrinology"], doctor: "Dr. K. Ravindranath Reddy", address:"https://maps.app.goo.gl/99kG9N174RhyWL1g7",type: "private",contact: "6300624804", emergencyAvailable: true,},
  { name: "SREE DIVYA CARE",district: "kurnool", departments: ["endocrinology"], doctor: "Dr. Sri Divya Reddy", address:"https://maps.app.goo.gl/jLUn5bhjGWG3R5By7",type: "private",contact: "6304688799", emergencyAvailable: true,},

  { name: "SREECHARITHA HOSPITAL",district: "chittoor", departments: ["endocrinology"], doctor: "Dr. Kavya", address:"https://maps.app.goo.gl/xCwLk87XYPTQMPnV7",type: "private",contact: "8008375568", emergencyAvailable: true,},
  { name: "DR MOHAN'S DIABETEES SPECIALITIES",district: "chittoor", departments: ["endocrinology"], doctor: "Dr. Mohan", address:"https://maps.app.goo.gl/m7oWqwAVU2s3nXg87",type: "private",contact: "7825888734", emergencyAvailable: true,},
  { name: "MANORAMA MULTI SPECIALITY HOSPITAL",district: "chittoor", departments: ["endocrinology"], doctor: "Dr. Nobul Rao", address:"https://maps.app.goo.gl/YavKV5dSjtay66th7",type: "private",contact: "7981012759", emergencyAvailable: true,},

  // ================= CARDIOLOGY =================
 
  { name: "DR VIJAY'S HEALTHY HEART",district: "srikakulam", departments: ["cardiology"], doctor: "Dr. L K Vijay Kumar", address:"https://maps.app.goo.gl/k9ovrwguH1qXXboZ6",type: "private",contact: "8897102302", emergencyAvailable: true,}, 
  { name: "DR SASIDHARA HOSPITAL",district: "srikakulam", departments: ["cardiology"], doctor: "Dr. A. Sasidhar", address:"https://maps.app.goo.gl/xZRUK52NC6ZUcQ7v6",type: "private",contact: "9059688646", emergencyAvailable: true,}, 
  { name: "K Y N SUPER SPECIALITY HOSPITAL",district: "srikakulam", departments: ["cardiology"], doctor: "Dr. B. Sai Teja", address:"https://maps.app.goo.gl/SGCXq1NCjQMdWkXe7",type: "private",contact: "8143882425", emergencyAvailable: true,}, 

  { name: "VAISHNAVI HEART CARE CENTER",district: "vizianagaram", departments: ["cardiology"], doctor: "Dr. M. Mahesh", address:"https://maps.app.goo.gl/6Ej5tjk3dGq9GTVN8",type: "private",contact: "Not Available", emergencyAvailable: true,}, 
  { name: "MEDICOVER HOSPITAL",district: "vizianagaram", departments: ["cardiology"], doctor: "Dr. J. Sai Kiran", address:"https://maps.app.goo.gl/wSQRcbZdWhQFEKmL9",type: "private",contact: "04068334455", emergencyAvailable: true,}, 
  { name: "ADITYA HRUDAYAM HEART CARE CLINIC",district: "vizianagaram", departments: ["cardiology"], doctor: "Dr. Aditya", address:"https://maps.app.goo.gl/Tv9jLbfuF4yar4jB9",type: "private",contact: "8790117737", emergencyAvailable: true,}, 

  { name: "CARE HOSPITAL",district: "vishakapatnam", departments: ["cardiology"], doctor: "Dr. Revanth Reddy", address:"https://maps.app.goo.gl/v7uJxxuXfn4QwJzGA",type: "private",contact: "04068106585", emergencyAvailable: true,}, 
  { name: "ONMI HOSPITAL",district: "vishakapatnam", departments: ["cardiology"], doctor: "Dr. Subramanyam", address:"https://maps.app.goo.gl/TVrNCKGL6ENrpdTQ6",type: "private",contact: "Not Available", emergencyAvailable: true,}, 
  { name: "MEDICOVER HOSPITAL",district: "vishakapatnam", departments: ["cardiology"], doctor: "Dr. Hemanth Kumar Behara", address:"https://maps.app.goo.gl/4UY1usgYptMkGbFd9",type: "private",contact: "04068334455", emergencyAvailable: true,}, 

  { name: "PULSE HEART INSTITUTE",district: "east godavari", departments: ["cardiology"], doctor: "Dr. Vamsi Krishna Raju", address:"https://maps.app.goo.gl/EvnFm8PHDd1dMmBe8",type: "private",contact: "7995222511", emergencyAvailable: true,}, 
  { name: "S V HEART CARE CENTER",district: "east godavari", departments: ["cardiology"], doctor: "Dr. A V Subbarao", address:"https://maps.app.goo.gl/hsRMw2Nyn6Qncv526",type: "private",contact: "8832467817", emergencyAvailable: true,}, 
  { name: "KIMS HOSPITAL",district: "east godavari", departments: ["cardiology"], doctor: "Dr. N S Rama Raju", address:"https://maps.app.goo.gl/to4XYs71yGtUVKnT7",type: "private",contact: "8832477779", emergencyAvailable: true,}, 

  { name: "RAVI GUJJU HEART HOSPITAL",district: "west godavari", departments: ["cardiology"], doctor: "Dr. G. Ravi kumar", address:"https://maps.app.goo.gl/YGb69zNXqcKQSF5C6",type: "private",contact: "6305614537", emergencyAvailable: true,}, 
  { name: "LALITH HEART AND LUNGS HOSPITAL",district: "west godavari", departments: ["cardiology"], doctor: "Dr. Yudistara Siripurapu", address:"https://maps.app.goo.gl/vG74QoyVXuPJey5a7",type: "private",contact: "9281469455", emergencyAvailable: true,}, 
  { name: "SRI KESHAV EMERGENCY AND MULTI SPECIALITY HOSPITAL",district: "west godavari", departments: ["cardiology"], doctor: "Dr. P. Shashank", address:"https://maps.app.goo.gl/XmUZiPWXJuUn7Vpb6",type: "private",contact: "9709749999", emergencyAvailable: true,}, 

  { name: "DR SIVAPRASAD HRUDAYALAYA",district: "krishna", departments: ["cardiology"], doctor: "Dr. P V Siva Prasad", address:"https://maps.app.goo.gl/bqu9qfdutkvy9RhR7",type: "private",contact: "9849273634", emergencyAvailable: true,}, 
  { name: "VAMSI HEART CARE CENTER",district: "krishna", departments: ["cardiology"], doctor: "Dr. K. Vamsi Krishna", address:"https://maps.app.goo.gl/VAfNKcyWDGPgyCBh8",type: "private",contact: "9542253858", emergencyAvailable: true,}, 
  { name: "ANDHRA HOSPITAL HEART AND BRAIN",district: "krishna", departments: ["cardiology"], doctor: "Dr. J. Srimannarayana", address:"https://maps.app.goo.gl/Sa9LVDYp8sahV51V6",type: "private",contact: "8662442333", emergencyAvailable: true,}, 

  { name: "SHRI HOSPITAL",district: "guntur", departments: ["cardiology"], doctor: "Dr. B V Narayana Reddy", address:"https://maps.app.goo.gl/gzSdHPq563njw7rz6",type: "private",contact: "9040108108", emergencyAvailable: true,}, 
  { name: "PRIME CARE CARDIAC",district: "guntur", departments: ["cardiology"], doctor: "Dr. Sivaji", address:"https://maps.app.goo.gl/iqqZw1XkvMNUPmzX8",type: "private",contact: "7799345654", emergencyAvailable: true,}, 
  { name: "VIJETHA HOSPITALS",district: "guntur", departments: ["cardiology"], doctor: "Dr. Sudhakar Kanumuri", address:"https://maps.app.goo.gl/Q5UtGn23jvpMxgC37",type: "private",contact: "8988856444", emergencyAvailable: true,}, 

  { name: "AMRUTHA HEART HOSPITAL",district: "prakasam", departments: ["cardiology"], doctor: "Dr. V. Kesava", address:"https://maps.app.goo.gl/BBXFxmLjtGKVskQ56",type: "private",contact: "7382299540", emergencyAvailable: true,}, 
  { name: "VIVEKANANDA SUPER SPECIALITY HOSPITAL",district: "prakasam", departments: ["cardiology"], doctor: "Dr. S. Baji Babu", address:"https://maps.app.goo.gl/ozyRT1de7mULbAXR9",type: "private",contact: "6305234649", emergencyAvailable: true,}, 
  { name: "SRI DATTA SUPER SPECIALITY HOSPITAL",district: "prakasam", departments: ["cardiology"], doctor: "Dr. G. Krishnakanth", address:"https://maps.app.goo.gl/3zLx4Lf3xSYdkKjaA",type: "private",contact: "8647231309", emergencyAvailable: true,}, 

  { name: "KIMS HOSPITAL",district: "nellore", departments: ["cardiology"], doctor: "Dr. Chejarla Sesha Srinivasa Raju", address:"https://maps.app.goo.gl/URZRT4dW5o65A5U46",type: "private",contact: "8612315835", emergencyAvailable: true,}, 
  { name: "MEDICOVER HOSPITALS",district: "nellore", departments: ["cardiology"], doctor: "Dr. M. Jayaram", address:"https://maps.app.goo.gl/aHwFwxMbYLE9qhWo7",type: "private",contact: "04068334455", emergencyAvailable: true,}, 
  { name: "KIMS HOSPITAL",district: "nellore", departments: ["cardiology"], doctor: "Dr. Sahebpeer", address:"https://maps.app.goo.gl/URZRT4dW5o65A5U46",type: "private",contact: "8612315835", emergencyAvailable: true,}, 

  { name: "SWARNA HEART CARE",district: "ananthapur", departments: ["cardiology"], doctor: "Dr. Rakesh", address:"https://maps.app.goo.gl/yS9x8jycvEtiJcEdA",type: "private",contact: "8801503333", emergencyAvailable: true,}, 
  { name: "MARK HEART HOSPITAL",district: "ananthapur", departments: ["cardiology"], doctor: "Dr. B. Phalgum", address:"https://maps.app.goo.gl/Dq2KxgCMgQNPKoai7",type: "private",contact: "7718445566", emergencyAvailable: true,}, 
  { name: "DR SANDEEP HEART CLINIC",district: "ananthapur", departments: ["cardiology"], doctor: "Dr. K. Sandeep Reddy", address:"https://maps.app.goo.gl/G5ERSFuU7JdUFL7x7",type: "private",contact: "6281284009", emergencyAvailable: true,}, 

  { name: "R R HOSPITAL",district: "kadapa", departments: ["cardiology"], doctor: "Dr. Prasad Raju", address:"https://maps.app.goo.gl/HVhvrKBaGEbDFhG19",type: "private",contact: "9550702944", emergencyAvailable: true,}, 
  { name: "G S R HEART CARE",district: "kadapa", departments: ["cardiology"], doctor: "Dr. G. Rama Krishna Reddy", address:"https://maps.app.goo.gl/NnBqWsJ5HZNV399s6",type: "private",contact: "8562249478", emergencyAvailable: true,}, 
  { name: "ARUNACHALA HOSPITAL",district: "kadapa", departments: ["cardiology"], doctor: "Dr. Niranjan Reddy", address:"https://maps.app.goo.gl/AWtEVK6wgtaibvWZ7",type: "private",contact: "9490969797", emergencyAvailable: true,}, 

  { name: "MEDICOVER HOSPITAL",district: "kurnool", departments: ["cardiology"], doctor: "Dr. N. Chaitanya Kumar", address:"https://maps.app.goo.gl/RY2khVug8RuC5u147",type: "private",contact: "04068334455", emergencyAvailable: true,}, 
  { name: "MEDICOVER HOSPITAL",district: "kurnool", departments: ["cardiology"], doctor: "Dr. C S Thejanandan Reddy", address:"https://maps.app.goo.gl/RY2khVug8RuC5u147",type: "private",contact: "04068334455", emergencyAvailable: true,}, 
  { name: "KIMS HOSPITAL",district: "kurnool", departments: ["cardiology"], doctor: "Dr. Nagendra Prasad T", address:"https://maps.app.goo.gl/uxMxdkddt3xqWFY48",type: "private",contact: "8518352000", emergencyAvailable: true,}, 

  { name: "VENKATARAMANA HEART AND MATERNITY ",district: "chittoor", departments: ["cardiology"], doctor: "Dr. C. Venkataramana", address:"https://maps.app.goo.gl/Txwf78M5UKGHrmFq8",type: "private",contact: "8772258183", emergencyAvailable: true,}, 
  { name: "AKS AMMA HOSPITAL",district: "chittoor", departments: ["cardiology"], doctor: "Name not Available", address:"https://maps.app.goo.gl/wx5gqfWexpbwiL6d9",type: "private",contact: "9063263108", emergencyAvailable: true,}, 
  { name: "SRI PADMAVATHI CHILDREN'S HEART",district: "chittoor", departments: ["cardiology"], doctor: "Dr. N. Srinath reddy", address:"https://maps.app.goo.gl/n9CQCCjQyHKFuEZ2A",type: "private",contact: "8772264874", emergencyAvailable: true,}, 

  // ================= PULMONOLOGY =================
 
  { name: "VOOPIRI CHEST AND ALLERGY", district: "srikakulam", departments: ["pulmonology"], doctor: "Dr. G. Chandra Sekhar", address:"https://maps.app.goo.gl/eZrydygi6wnqFeFy5", type: "private",contact: "8096812244", emergencyAvailable: true,},
  { name: "KIMS HOSPITAL", district: "srikakulam", departments: ["pulmonology"], doctor: "Dr. G. Chaitanya Kumar", address:"https://maps.app.goo.gl/wPfiLoMvSe1bVUD27", type: "private",contact: "8942271116", emergencyAvailable: true,},
  { name: "MEDICOVER HOSPITAL", district: "srikakulam", departments: ["pulmonology"], doctor: "Dr. Veluvarthy Vijay", address:"https://maps.app.goo.gl/CGm2qSqsMkze4nGd9", type: "private",contact: "04068334455", emergencyAvailable: true,},

  { name: "DR BHANU'S CHEST CLINIC", district: "vizianagaram", departments: ["pulmonology"], doctor: "Dr. A. Bhanu Prakash", address:"https://maps.app.goo.gl/jmyrEbU9TTTRwj8k8", type: "private",contact: "Not Available", emergencyAvailable: true,},
  { name: "MEDICOVER HOSPITAL", district: "vizianagaram", departments: ["pulmonology"], doctor: "Dr. Veluvarthi Vijay", address:"https://maps.app.goo.gl/wSQRcbZdWhQFEKmL9", type: "private",contact: "04068334455", emergencyAvailable: true,},
  { name: "SRI SWAMY RAMA NANDA CHEST CLINIC", district: "vizianagaram", departments: ["pulmonology"], doctor: "Dr. K. Subramanya Hari Krishna", address:"https://maps.app.goo.gl/uWingm4q8Hv7xLmt5", type: "private",contact: "7386014045", emergencyAvailable: true,},

  { name: "VIZAG CHEST INSTITUTE", district: "vishakapatnam", departments: ["pulmonology"], doctor: "Dr. Sateesh Chandra", address:"https://maps.app.goo.gl/X6pqu11j2LnD95r99", type: "private",contact: "9519595789", emergencyAvailable: true,},
  { name: "KIMS HOSPITAL", district: "vishakapatnam", departments: ["pulmonology"], doctor: "Dr. Satish Chandra Alavaala", address:"https://maps.app.goo.gl/YS7iF34rgq6N4Awm7", type: "private",contact: "9032909363", emergencyAvailable: true,},
  { name: "CARE HOSPITAL", district: "vishakapatnam", departments: ["pulmonology"], doctor: "Dr. Anil Kumar Gandham", address:"https://maps.app.goo.gl/3Tmy8wLVA33Y1hR58", type: "private",contact: "6304095855", emergencyAvailable: true,},

  { name: "ORCHID SCANS", district: "east godavari", departments: ["pulmonology"], doctor: "Dr. P. Madhu Harsha", address:"https://maps.app.goo.gl/SaM8oQebwykhKfV39", type: "private",contact: "9398927334", emergencyAvailable: true,},
  { name: "DR HARITA'S CHEST CLINIC", district: "east godavari", departments: ["pulmonology"], doctor: "Name Not Available", address:"https://maps.app.goo.gl/d7LfpZAoLheRsWrYA", type: "private",contact: "9550989912", emergencyAvailable: true,},
  { name: "SREE NITHYA CHEST AND DIABETES CARE CENTER", district: "east godavari", departments: ["pulmonology"], doctor: "Dr. V S Paparao Sanka", address:"https://maps.app.goo.gl/6LmctZchoQJSE8Av9", type: "private",contact: "8179663750", emergencyAvailable: true,},

  { name: "LALITH HEART AND LUNGS HOSPITAL", district: "west godavari", departments: ["pulmonology"], doctor: "Dr. Gopala Raju", address:"https://maps.app.goo.gl/rfnnzZo5JXJu2pbx8", type: "private",contact: "9281469455", emergencyAvailable: true,},
  { name: "NALLAPARAJU VENKATARAJU HOSPITAL", district: "west godavari", departments: ["pulmonology"], doctor: "Dr. Gopi Krishna", address:"https://maps.app.goo.gl/xTtDMtWHt6eXaBC28", type: "private",contact: "9959799991", emergencyAvailable: true,},
  { name: "SRI DANESWARI CHEST HOSPITAL", district: "west godavari", departments: ["pulmonology"], doctor: "Dr. M. Uday", address:"https://maps.app.goo.gl/oKa8SJEEWWq7FRcQ6", type: "private",contact: "8819222077", emergencyAvailable: true,},

  { name: "MANIPAL HOSPITAL", district: "krishna", departments: ["pulmonology"], doctor: "Dr. Uday Kiran G", address:"https://maps.app.goo.gl/ytvc2SgeQHbsb4KN7", type: "private",contact: "18001024647", emergencyAvailable: true,},
  { name: "MANIPAL HOSPITAL", district: "krishna", departments: ["pulmonology"], doctor: "Dr. Lokesh Gutta", address:"https://maps.app.goo.gl/ytvc2SgeQHbsb4KN7", type: "private",contact: "18001024647", emergencyAvailable: true,},
  { name: "AMRIN HOSPITAL", district: "krishna", departments: ["pulmonology"], doctor: "Dr. Ashraf Shaik", address:"https://maps.app.goo.gl/G3dJxiJ2PKKQ1rDHA", type: "private",contact: "8886707666", emergencyAvailable: true,},

  { name: "MANIPAL HOSPITAL", district: "guntur", departments: ["pulmonology"], doctor: "Dr. Uday Kiran G", address:"https://maps.app.goo.gl/ytvc2SgeQHbsb4KN7", type: "private",contact: "18001024647", emergencyAvailable: true,},
  { name: "TEJA CHEST CLINIC", district: "guntur", departments: ["pulmonology"], doctor: "Dr. S. Teja", address:"https://maps.app.goo.gl/hfU2fjWh4zh2Dm8o6", type: "private",contact: "8121735998", emergencyAvailable: true,},
  { name: "KANUMURI HOSPITAL", district: "guntur", departments: ["pulmonology"], doctor: "Dr. K. Srinivasa Rao", address:"https://maps.app.goo.gl/H29cXJbgpHQ8ySp69", type: "private",contact: "9849532080", emergencyAvailable: true,},

  { name: "APIC HOSPITAL", district: "prakasam", departments: ["pulmonology"], doctor: "Dr. Aravind Vadlamudi", address:"https://maps.app.goo.gl/8CYbBrg7izJNkweK7", type: "private",contact: "7777999565", emergencyAvailable: true,},
  { name: "VENKATA RAMANA NURSING HOME", district: "prakasam", departments: ["pulmonology"], doctor: "Dr. Jaheed Ahmad", address:"https://maps.app.goo.gl/Gmk2o28fuwJrmCap7", type: "private",contact: "9100679099", emergencyAvailable: true,},

  { name: "GNANA CHEST HOSPITAL", district: "nellore", departments: ["pulmonology"], doctor: "Dr. K. Koushik Reddy", address:"https://maps.app.goo.gl/sk5wkF4PMH9NBmq69", type: "private",contact: "Not Available", emergencyAvailable: true,},
  { name: "KIMS HOSPITAL", district: "nellore", departments: ["pulmonology"], doctor: "Dr. C. Sashi Bharat Kumar Reddy", address:"https://maps.app.goo.gl/Ddw72D694m7Up7r99", type: "private",contact: "8612315835", emergencyAvailable: true,},
  { name: "AMRUTHA CHEST CENTER", district: "nellore", departments: ["pulmonology"], doctor: "Dr. K. Mallikarjuna", address:"https://maps.app.goo.gl/zf8AkHpPhHAT5mfYA", type: "private",contact: "9493621808", emergencyAvailable: true,},

  { name: "SAANVIKA CHEST HOSPITAL", district: "ananthapur", departments: ["pulmonology"], doctor: "Dr. Kona Muralidhar Reddy", address:"https://maps.app.goo.gl/4KcWzeijtMYkjBdJA", type: "private",contact: "9346247154", emergencyAvailable: true,},
  { name: "DR MUKUNDHA REDDY CHEST CLINIC", district: "ananthapur", departments: ["pulmonology"], doctor: "Dr. Mukundha Reddy", address:"https://maps.app.goo.gl/1qSy5o41X7MzRswy5", type: "private",contact: "Not Available", emergencyAvailable: true,},
  { name: "NAVEEN CHEST CLINIC", district: "ananthapur", departments: ["pulmonology"], doctor: "Dr. Naveen", address:"https://maps.app.goo.gl/ay7pnM7t7noHTtBh9", type: "private",contact: "8985590599", emergencyAvailable: true,},

  { name: "SRI GANESH CHEST CLINIC", district: "kadapa", departments: ["pulmonology"], doctor: "Dr. P. Akhil", address:"https://maps.app.goo.gl/U1aFh1WMK2zkD3hn7", type: "private",contact: "9666562882", emergencyAvailable: true,},
  { name: "JAYA LAKSHMI MEMORIAL CHEST CLINIC", district: "kadapa", departments: ["pulmonology"], doctor: "Dr. M. Gangadhar Reddy", address:"https://maps.app.goo.gl/wA1F6jjh7W1R4Yec8", type: "private",contact: "8562245550", emergencyAvailable: true,},
  { name: "AKSHAYA CHEST CLINIC", district: "kadapa", departments: ["pulmonology"], doctor: "Dr. C. Suresh Kumar", address:"https://maps.app.goo.gl/rx6VzJ97VUYpXUKr9", type: "private",contact: "9505053900", emergencyAvailable: true,},

  { name: "SRI SWATHI PULMONARY CLINIC", district: "kurnool", departments: ["pulmonology"], doctor: "Dr. G. Mallikarjuna Reddy", address:"https://maps.app.goo.gl/4oabTMkbqJq5B4Wn9", type: "private",contact: "9247447248", emergencyAvailable: true,},
  { name: "CHARVIK SHVAASA CHEST AND TB HOSPITAL", district: "kurnool", departments: ["pulmonology"], doctor: "Dr. K. Siva Krishna", address:"https://maps.app.goo.gl/wDKMLv7tjbrQCZ4X9", type: "private",contact: "9700716443", emergencyAvailable: true,},
  { name: "CHALAM CHEST CLINIC", district: "kurnool", departments: ["pulmonology"], doctor: "Dr. P V Chalamaiah", address:"https://maps.app.goo.gl/SLEXVhwt5855dQqm7", type: "private",contact: "6305398424", emergencyAvailable: true,},

  { name: "AKS AMMA HOSPITAL", district: "chittoor", departments: ["pulmonology"], doctor: "Dr. Ashok", address:"https://maps.app.goo.gl/zqX4vhXyXA2kNNhF9", type: "private",contact: "9344853689", emergencyAvailable: true,},
  { name: "SAMRAKSHA SUPER SPECIALITY HOSPITAL", district: "chittoor", departments: ["pulmonology"], doctor: "Dr. K. Aneef Basha", address:"https://maps.app.goo.gl/YF3SZcnBRGfFT6ccA", type: "private",contact: "9989704606", emergencyAvailable: true,},
  { name: "VAISHNAVI CLINIC", district: "chittoor", departments: ["pulmonology"], doctor: "Name Not Available", address:"https://maps.app.goo.gl/PuiyjqbwJwi14cwz7", type: "private",contact: "9640650569", emergencyAvailable: true,},
  
  
    // ================= GASTROENTEROLOGY =================
  
  { name: "DHARANI SUPER SPECIALITY HOSPITAL", district: "srikakulam", departments: ["gastroenterology"], doctor: "Dr. D. Dharanesh Babu", address: "https://maps.app.goo.gl/XhS4A9NjZgZnqFXy5", type: "private", contact: "7780446506", emergencyAvailable: "true", },
  { name: "MEENAKSHI HOSPITAL", district: "srikakulam", departments: ["gastroenterology"], doctor: "Dr. G. Gangadhar", address: "https://maps.app.goo.gl/qjrpBrqGNyhsk5Ay9", type: "private", contact: "9505355020", emergencyAvailable: "true", },
  { name: "MEDICOVER HOSPITAL", district: "srikakulam", departments: ["gastroenterology"], doctor: "Dr. Manchu Chaitanya", address: "https://maps.app.goo.gl/AK4ZVPpRPy62jsWk8", type: "private", contact: "04068334455", emergencyAvailable: "true", },

  { name: "DR SRAVAN SURGICAL gastroenterology", district: "vizianagaram", departments: ["gastroenterology"], doctor: "Dr. Sravan Kumar", address: "https://maps.app.goo.gl/LGbkq4nqPnpfgnyw7", type: "private", contact: "8309604572", emergencyAvailable: "true", },
  { name: "MEDICOVER HOSPITAL", district: "vizianagaram", departments: ["gastroenterology"], doctor: "Dr. Reddi Durga Sai Kumar", address: "https://maps.app.goo.gl/AK4ZVPpRPy62jsWk8", type: "private", contact: "04068334455", emergencyAvailable: "true", },
  { name: "CHETAN GASTRO AND LIVER CENTER", district: "vizianagaram", departments: ["gastroenterology"], doctor: "Dr. I. Naresh", address: "https://maps.app.goo.gl/3PthZsGNcPjmPDcJ7", type: "private", contact: "8922228722", emergencyAvailable: "true", },

  { name: "DR TIRUPATI GASTRO AND LIVER CENTER", district: "vishakapatnam", departments: ["gastroenterology"], doctor: "Dr. Tirupathi Kesireddy", address: "https://maps.app.goo.gl/j42XuHCwd62NCe5dA", type: "private", contact: "8555881490", emergencyAvailable: "true", },
  { name: "RADHA KRISHNA LIVER AND GASTRO", district: "vishakapatnam", departments: ["gastroenterology"], doctor: "Dr. Y. Radhakrishna", address: "https://maps.app.goo.gl/dakwgtQvP9tHV4BR8", type: "private", contact: "7416581389", emergencyAvailable: "true", },
  { name: "SYNERGY INSTITUTE OF GASTRO", district: "vishakapatnam", departments: ["gastroenterology"], doctor: "Dr. Radhakrishna", address: "https://maps.app.goo.gl/r2j4dBsg3qMq4KNz7", type: "private", contact: "6303432434", emergencyAvailable: "true", },

  { name: "K S L GASTRO LIVER", district: "east godavari", departments: ["gastroenterology"], doctor: "Dr. K N Dharma Teja", address: "https://maps.app.goo.gl/FssChwRjKfuC4NbT9", type: "private", contact: "8977888172", emergencyAvailable: "true", },
  { name: "VARUN GASTRO AND LIVER", district: "east godavari", departments: ["gastroenterology"], doctor: "Dr. Varun", address: "https://maps.app.goo.gl/1StY95hdku4kbNMf9", type: "private", contact: "8008414005", emergencyAvailable: "true", },
  { name: "SUBHADRA HOSPTAL", district: "east godavari", departments: ["gastroenterology"], doctor: "Dr. Akula Durga Prasad", address: "https://maps.app.goo.gl/quyPZaE5EjxwEVC7A", type: "private", contact: "8832474444", emergencyAvailable: "true", },

  { name: "VAMSI GASTRO AND LIVER CARE", district: "west godavari", departments: ["gastroenterology"], doctor: "Dr. Dantuluri Venkateswara Raju", address: "https://maps.app.goo.gl/8Qsa85mLEUPLSAf77", type: "private", contact: "9502232334", emergencyAvailable: "true", },
  { name: "SRI SASI GASTRO AND LIVER", district: "west godavari", departments: ["gastroenterology"], doctor: "Dr. N O A Sasi Kiran", address: "https://maps.app.goo.gl/zNwZcC5uG49gAfAX7", type: "private", contact: "8500951170", emergencyAvailable: "true", },
  { name: "VIJAY gastroenterology", district: "west godavari", departments: ["gastroenterology"], doctor: "Dr. K N Dharmateja", address: "https://maps.app.goo.gl/qntV5kYeGWk2sf3S8", type: "private", contact: "8866558773", emergencyAvailable: "true", },

  { name: "HARINI HOSPITALS", district: "krishna", departments: ["gastroenterology"], doctor: "Dr. N. Tirumala Rao", address: "https://maps.app.goo.gl/Th3eBKhB6dsmgVE48", type: "private", contact: "9848044404", emergencyAvailable: "true", },
  { name: "KRISHNA GSTRO AND LIVER CENTER", district: "krishna", departments: ["gastroenterology"], doctor: "Dr. Ravella Eeshwar Kumar", address: "https://maps.app.goo.gl/DcDYpdmXbZSwkeoC8", type: "private", contact: "8662439999", emergencyAvailable: "true", },
  { name: "LINGACER GASTRO HOSPITAL", district: "krishna", departments: ["gastroenterology"], doctor: "Dr. V. Krishna Priya", address: "https://maps.app.goo.gl/F54Fu8vBXgj4CaTi9", type: "private", contact: "7382032526", emergencyAvailable: "true", },

  { name: "NATIONAL LIVER AND GASTRO HOSPITAL", district: "guntur", departments: ["gastroenterology"], doctor: "Dr. Yakubb Shaik", address: "https://maps.app.goo.gl/xoPp9GRQjYGuzSYU8", type: "private", contact: "9440214706", emergencyAvailable: "true", },
  { name: "SHRI HOSPITAL", district: "guntur", departments: ["gastroenterology"], doctor: "Dr.Varun Palanati", address: "https://maps.app.goo.gl/JrVreTBFiLhuz91B8", type: "private", contact: "9040108108", emergencyAvailable: "true", },
  { name: "SIDDHARTHA GASTRO CARE", district: "guntur", departments: ["gastroenterology"], doctor: "Dr. A. Siddhartha Reddy", address: "https://maps.app.goo.gl/PLjDqvgkUxRtVb2U6", type: "private", contact: "9613374999", emergencyAvailable: "true", },

  { name: "SHRI HOSPITAL", district: "prakasam", departments: ["gastroenterology"], doctor: "Dr. Varun Palanati", address: "https://maps.app.goo.gl/JrVreTBFiLhuz91B8", type: "private", contact: "9040108108", emergencyAvailable: "true", },
  { name: "KIMS SIKHARA", district: "prakasam", departments: ["gastroenterology"], doctor: "Dr. B K Prasanna Kumar", address: "https://maps.app.goo.gl/uT2GZ8FwfBpf9nXA9", type: "private", contact: "7699699499", emergencyAvailable: "true", },
  { name: "SRI PRATHIMA SUPER SPECIALITY HOSPITAL", district: "prakasam", departments: ["gastroenterology"], doctor: "Dr. Saikrishna Balineni", address: "https://maps.app.goo.gl/9hQY8tcQYtZMQuYZ8", type: "private", contact: "8632353255", emergencyAvailable: "true", },

  { name: "APOLLO HOSPITAL", district: "nellore", departments: ["gastroenterology"], doctor: "Dr. Dwarakanath Reddy", address: "https://maps.app.goo.gl/mhT8v9qd6AJJEiwK7", type: "private", contact: "8616667333", emergencyAvailable: "true", },
  { name: "MEDICOVER HOSPITAL", district: "nellore", departments: ["gastroenterology"], doctor: "Dr. Manoj Kumar", address: "https://maps.app.goo.gl/DogSeUiEvriUDdyb6", type: "private", contact: "04068334455", emergencyAvailable: "true", },
  { name: "MEDICOVER HOSPITAL", district: "nellore", departments: ["gastroenterology"], doctor: "Dr. Nitesh Pagadala", address: "https://maps.app.goo.gl/DogSeUiEvriUDdyb6", type: "private", contact: "04068334455", emergencyAvailable: "true", },

  { name: "SIMS HOSPITAL", district: "ananthapur", departments: ["gastroenterology"], doctor: "Dr. N. Mohammad Shahid", address: "https://maps.app.goo.gl/AaFqETAapzk4WP3VA", type: "private", contact: "8554223222", emergencyAvailable: "true", },
  { name: "REVANTH GASTRO AND LIVER HOSPTIAL", district: "ananthapur", departments: ["gastroenterology"], doctor: "Dr. C. Revanth Reddy", address: "https://maps.app.goo.gl/21ijN4oQwXqWY4SN6", type: "private", contact: "9381819689", emergencyAvailable: "true", },
  { name: "SREE GASTRO AND LIVER HOSPITAL", district: "ananthapur", departments: ["gastroenterology"], doctor: "Name not available", address: "https://maps.app.goo.gl/tHDwhKZtB4XX1dr4A", type: "private", contact: "8554234433", emergencyAvailable: "true", },

  { name: "SHANKAR GASTRO HOSPITAL", district: "kadapa", departments: ["gastroenterology"], doctor: "Dr. D. Chaitanya Reddy", address: "https://maps.app.goo.gl/AYhEdoTQmRnZMwTL6", type: "private", contact: "7674988528", emergencyAvailable: "true", },
  { name: "S V GASTRO AND LIVER CLINIC", district: "kadapa", departments: ["gastroenterology"], doctor: "Dr. Ram Charan Reddy", address: "https://maps.app.goo.gl/AYeLvfx8rB2jUZxk6", type: "private", contact: "6309192424", emergencyAvailable: "true", },
  { name: "DR DINESH GASTRO AND LIVER ENDOSCOPY", district: "kadapa", departments: ["gastroenterology"], doctor: "Dr. Dinesh", address: "https://maps.app.goo.gl/xvS9HZeZWCZxdvyJ9", type: "private", contact: "9985850033", emergencyAvailable: "true", },

  { name: "ASHWINI HOSPITAL", district: "kurnool", departments: ["gastroenterology"], doctor: "Dr. V. Suresh Kumar Reddy", address: "https://maps.app.goo.gl/FpKf3NU7RN7FLqL9A", type: "private", contact: "8374775867", emergencyAvailable: "true", },
  { name: "VRINDHA GASTO LIVER AND ENDOSCOPY", district: "kurnool", departments: ["gastroenterology"], doctor: "Dr. L. Rajendra Prasad", address: "https://maps.app.goo.gl/prUCN6mDystfvgdS6", type: "private", contact: "7386365365", emergencyAvailable: "true", },
  { name: "ASHWINI HOSPITAL", district: "kurnool", departments: ["gastroenterology"], doctor: "Dr. Sujith Reddy", address: "https://maps.app.goo.gl/fkGRCaHZuFhDcNxR9", type: "private", contact: "Not Available", emergencyAvailable: "true", },
  
  { name: "ARCHANA MULTI SPECIALITY HOSPITAL", district: "chittoor", departments: ["gastroenterology"], doctor: "Dr. Archana Chilakala", address: "https://maps.app.goo.gl/Y4ki8JTQSTKPeM1w7", type: "private", contact: "9866853684", emergencyAvailable: "true", },
  { name: "MANORAMA MULTI SPECIALITY HOSPITAL", district: "chittoor", departments: ["gastroenterology"], doctor: "Dr. Nobul Rao", address: "https://maps.app.goo.gl/oYaz1s2UZHCkKpFt7", type: "private", contact: "7981012759", emergencyAvailable: "true", },
  { name: "NAUSHREE HOSPITAL", district: "chittoor", departments: ["gastroenterology"], doctor: "Dr. Naveen Reddy G", address: "https://maps.app.goo.gl/6eYtrhU7NGnfwS777", type: "private", contact: "9230108108", emergencyAvailable: "true", },

    // ================= UROLOGY =================
  
  { name: "MEDICOVER HOSPITAL", district: "srikakulam", departments: ["urology"],doctor: "Dr. Dumpala Hari Prasad Rao",address: "https://maps.app.goo.gl/AnVt7zfxgxeZH9ou8", type: "private", contact: "04068334455", emergencyAvailable: "true", },
  { name: "MEDICOVER HOSPITAL", district: "srikakulam", departments: ["urology"],doctor: "Dr. S. Sundeep Varma Kosuri",address: "https://maps.app.goo.gl/9szkUTyfbdYMJPG98", type: "private", contact: "04068334455", emergencyAvailable: "true", },
  { name: "HARI PRASAD KIDNEY CENTER", district: "srikakulam", departments: ["urology"],doctor: "Dr. Hari Prasad",address: "https://maps.app.goo.gl/R8aG2euXofuV1qFYA", type: "private", contact: "9848224977", emergencyAvailable: "true", },

  { name: "TIRUMALA HOSPITAL", district: "vizianagaram", departments: ["urology"],doctor: "Dr. Surya Nihar Seemakurthy",address: "https://maps.app.goo.gl/BV4SkddBrdd5m3WL9", type: "private", contact: "04068334455", emergencyAvailable: "true", },
  { name: "MEDICOVER HOSPITAL", district: "vizianagaram", departments: ["urology"],doctor: "Dr. J Srikanth",address: "https://maps.app.goo.gl/D7iEN2F2tWiBh4SA8", type: "private", contact: "Not available", emergencyAvailable: "true", },

  { name: "KIMS ICON", district: "vishakapatnam", departments: ["urology"],doctor: "Dr. Sandeep Maheswara Reddy",address: "https://maps.app.goo.gl/ExcsRyPNN46MfTUs5", type: "private", contact: "8913536379", emergencyAvailable: "true", },
  { name: "VIZAG KIDNEY AND UROLOGY CENTER", district: "vishakapatnam", departments: ["urology"],doctor: "Dr. M. Prasad Rao",address: "https://maps.app.goo.gl/tHhBkaNBa8aERoZ18", type: "private", contact: "8977572572", emergencyAvailable: "true", },
  { name: "ASIAN INSTITUTE OF NEPHROLOGY", district: "vishakapatnam", departments: ["urology"],doctor: "Dr. G. Ravinfra varma",address: "https://maps.app.goo.gl/9hPuqoB1LbghtUrn8", type: "private", contact: "8916763333", emergencyAvailable: "true", },

  { name: "SATYA KIDNEY AND MULTI SPECIALITY HOSPITAL", district: "east godavari", departments: ["urology"],doctor: "Dr. N. Sathya Prasad",address: "https://maps.app.goo.gl/tLiMjK1Yo1XGSaLWA", type: "private", contact: "8832441666", emergencyAvailable: "true", },
  { name: "GOUTHAM UROLOGY AND KIDNEY CENTER", district: "east godavari", departments: ["urology"],doctor: "Dr. S. Goutham Reddy",address: "https://maps.app.goo.gl/LQTNqQAcpkztshep9", type: "private", contact: "7382474949", emergencyAvailable: "true", },
  { name: "MAURYA HOSPITAL", district: "east godavari", departments: ["urology"],doctor: "Dr. P. Prasad",address: "https://maps.app.goo.gl/r8HHkh59BxjY9pcE7", type: "private", contact: "9444888369", emergencyAvailable: "true", }, 

  { name: "SUDHA UROLOGY AND MATERNITY HOSPITAL", district: "west godavari", departments: ["urology"],doctor: "Dr. Ramana Kumar",address: "https://maps.app.goo.gl/gVc3Nv3mnY5zH95G6", type: "private", contact: "8816235455", emergencyAvailable: "true", },
  { name: "SRI KIRTHI UROLOGY HOSPITAL", district: "west godavari", departments: ["urology"],doctor: "Dr. Y L Sreeranga",address: "https://maps.app.goo.gl/u3dbH8ab6K4TPn2g8", type: "private", contact: "9988473333", emergencyAvailable: "true", },
  { name: "SATHYA KIDNEY AND MULTI SPECIALITY HOSPITAL", district: "west godavari", departments: ["urology"],doctor: "Dr. N Sathyaprasad",address: "https://maps.app.goo.gl/G69rsxMPn1JSNa7V7", type: "private", contact: "9966101530", emergencyAvailable: "true", },

  { name: "K K HOSPITAL", district: "krishna", departments: ["urology"],doctor: "Dr. Krishna Kishore",address: "https://maps.app.goo.gl/TJ8x6wxnhaG7KG2P9", type: "private", contact: "7416465771", emergencyAvailable: "true", },
  { name: "SINU HOSPITAL", district: "krishna", departments: ["urology"],doctor: "Dr. Lokesh Gutta",address: "https://maps.app.goo.gl/yaF45GTMmdMc7Bdk8", type: "private", contact: "9440144477", emergencyAvailable: "true", },
  { name: "SENTINI HOSPITAL", district: "krishna", departments: ["urology"],doctor: "Dr. Ajay Kumar",address: "https://maps.app.goo.gl/kAFTTG8ysDUk6w9j7", type: "private", contact: "9063598054", emergencyAvailable: "true", },

  { name: "CHANDANA UROLOGY AND KIDNEY CENTER", district: "guntur", departments: ["urology"],doctor: "Dr. J. Arjun Prakash",address: "https://maps.app.goo.gl/Ed5HNEmfKF5Jpr9n9", type: "private", contact: "7399155999", emergencyAvailable: "true", },
  { name: "GUNTUR KIDNEY AND MULTISPECIALITY HOSPITAL", district: "guntur", departments: ["urology"],doctor: "Dr. Venkata Naidu",address: "https://maps.app.goo.gl/REKnojZBQFNPwv9T6", type: "private", contact: "8632252123", emergencyAvailable: "true", },
  { name: "MADDINENI HOSPITAL", district: "guntur", departments: ["urology"],doctor: "Dr. M. Rama Krishna",address: "https://maps.app.goo.gl/iTqrgy4qoy9Z59iy7", type: "private", contact: "8632220806", emergencyAvailable: "true", },

  { name: "PRAKASAM SUPER SPECIALITY HOSPITAL", district: "prakasam", departments: ["urology"],doctor: "Dr. Krishna Rao",address: "https://maps.app.goo.gl/8zEKhZDdjQXte2Gd9", type: "private", contact: "7799866666", emergencyAvailable: "true", },
  { name: "SURESH KIDNEY AND MATERNITY CLINIC", district: "prakasam", departments: ["urology"],doctor: "Dr. Manikanta Suresh",address: "https://maps.app.goo.gl/ghgBBUcCDXS8Bte47", type: "private", contact: "7386336338", emergencyAvailable: "true", },
  { name: "KIDNEY CARE HOSPITAL", district: "prakasam", departments: ["urology"],doctor: "Dr. Jaheer Abbas",address: "https://maps.app.goo.gl/2HAKkQj9KgBPBrJL9", type: "private", contact: "7036555545", emergencyAvailable: "true", },

  { name: "A R KIDNEY HOSPITAL", district: "nellore", departments: ["urology"],doctor: "Dr. Nischal Prasad",address: "https://maps.app.goo.gl/vRpkESjJZGj237jx6", type: "private", contact: "9989926369", emergencyAvailable: "true", },
  { name: "GOKUL UROLOGY AND ANDROLOGY", district: "nellore", departments: ["urology"],doctor: "Dr. N. Gokul",address: "https://maps.app.goo.gl/VT68H5LuRMzxgDcg9", type: "private", contact: "8089778588", emergencyAvailable: "true", },
  { name: "APOLLO HOSPITALS", district: "nellore", departments: ["urology"],doctor: "Dr. Vedamurthy",address: "https://maps.app.goo.gl/nekof4cYYxfGVAGW8", type: "private", contact: "8616667333", emergencyAvailable: "true", },

  { name: "SREE NIDHI HOSPITAL", district: "ananthapur", departments: ["urology"],doctor: "Dr. Harinath Reddy",address: "https://maps.app.goo.gl/qyXCyfrtY3yLSXaT9", type: "private", contact: "8554243377", emergencyAvailable: "true", },
  { name: "UMA MAHESWARI KIDNEY HOSPITAL", district: "ananthapur", departments: ["urology"],doctor: "Dr. B. Sathyanarayana",address: "https://maps.app.goo.gl/oNCMXw9tb6HjkLsf6", type: "private", contact: "6303761597", emergencyAvailable: "true", },
  { name: "SRI DURGA HOSPITAL", district: "ananthapur", departments: ["urology"],doctor: "Dr. Durga Prasad",address: "https://maps.app.goo.gl/9kanhWdU6nNJER548", type: "private", contact: "9100820295", emergencyAvailable: "true", },

  { name: "MAMILLA NAGA PRASANTH UROCARE", district: "kadapa", departments: ["urology"],doctor: "Dr. Mamilla Naga Prasanth",address: "https://maps.app.goo.gl/Q4tD9oZ2szT9K7oc9", type: "private", contact: "Not Available", emergencyAvailable: "true", },
  { name: "MURALI KIDNEY AND EYE HOSPITAL", district: "kadapa", departments: ["urology"],doctor: "Dr. Srideep Siddhavaram",address: "https://maps.app.goo.gl/kKexWMYAGH2ANZMn8", type: "private", contact: "7330738138", emergencyAvailable: "true", },
  { name: "SRI VINAYAKA KIDNEY CENTER", district: "kadapa", departments: ["urology"],doctor: "Dr. N. Dinesh Kumar reddy",address: "https://maps.app.goo.gl/Ph7PH2A8khSeWLnv6", type: "private", contact: "9666015678", emergencyAvailable: "true", },

  { name: "MEDICOVER HOSPITAL", district: "kurnool", departments: ["urology"],doctor: "Dr. S. Abdul Samsad",address: "https://maps.app.goo.gl/RHTEeFxfJimykBsT7", type: "private", contact: "04068334455", emergencyAvailable: "true", },
  { name: "SEPURI KIDNEY CENTER", district: "kurnool", departments: ["urology"],doctor: "Dr. Bala Raviteja",address: "https://maps.app.goo.gl/NuNDtjm1BJ7eoFdL7", type: "private", contact: "8500723828", emergencyAvailable: "true", },
  { name: "SHRI GURU RAGHAVENDRA HOSPITAL", district: "kurnool", departments: ["urology"],doctor: "Dr. K. Sitharamaiah",address: "https://maps.app.goo.gl/2XJJmcfSMm4xfovr8", type: "private", contact: "8518231007", emergencyAvailable: "true", },

  { name: "DR MANOJ UROLOGY AND KIDNEY CARE", district: "chittoor", departments: ["urology"],doctor: "Dr. B. Manoj",address: "https://maps.app.goo.gl/1HM3J2eBxPa9HhDq5", type: "private", contact: "9949492894", emergencyAvailable: "true", },
  { name: "MANOHARI SUPER SPECIALITY HOSPITAL", district: "chittoor", departments: ["urology"],doctor: "Dr. Harsha",address: "https://maps.app.goo.gl/nxSsvPk6dKvDme6E7", type: "private", contact: "8772220244", emergencyAvailable: "true", },
  { name: "KIDNEY STONE LASER CENTER", district: "chittoor", departments: ["urology"],doctor: "Name not Available",address: "https://maps.app.goo.gl/MjBdgTTufZMjLZfK8", type: "private", contact: "8500530530", emergencyAvailable: "true", },

    // ================= ORTHOPEDIC =================
  
  {name: "SRI SOUKHYA HOSPITAL", district: "srikakulam", departments: ["orthopedic"], doctor: "Dr. S. Rajesh", address: "https://maps.app.goo.gl/MnvCX9KKWerUVMoYA", type: "private", contact: "9059683956", emergencyAvailable: "true",},
  {name: "ABHAYA HOSPITAL", district: "srikakulam", departments: ["orthopedic"], doctor: "Dr. N. Aditya Sekhar", address: "https://maps.app.goo.gl/FkAWR9vFa1uNB4t69", type: "private", contact: "9703444108", emergencyAvailable: "true",},
  {name: "DANETI SRIDHAR HOSPITAL", district: "srikakulam", departments: ["orthopedic"], doctor: "Dr. A. Siva Prasad", address: "https://maps.app.goo.gl/8YfqSjWV4hzAkDbT9", type: "private", contact: "Not Availabe", emergencyAvailable: "true",},

  {name: "SANTHOSH ORTHO CARE", district: "vizianagaram", departments: ["orthopedic"], doctor: "Dr. M. Santhosh", address: "https://maps.app.goo.gl/rhAb5Q75f8kmc2GCA", type: "private", contact: "9014453458", emergencyAvailable: "true",},
  {name: "KASHVI HOSPITAL", district: "vizianagaram", departments: ["orthopedic"], doctor: "Dr. Vivek Authnoori", address: "https://maps.app.goo.gl/LjEDc75hpQSM2228A", type: "private", contact: "9888771133", emergencyAvailable: "true",},
  {name: "SASI INTERNATIONAL HOSPITAL", district: "vizianagaram", departments: ["orthopedic"], doctor: "Dr. S. Sasi Bhushan Rao", address: "https://maps.app.goo.gl/BygM4Kf6t68xeomQ8", type: "private", contact: "9059474225", emergencyAvailable: "true",},

  {name: "Q1 HOSPITAL", district: "vishakapatnam", departments: ["orthopedic"], doctor: "Dr.T. Ramana murthy", address: "https://maps.app.goo.gl/uka1J9qoe4fqw2mX8", type: "private", contact: "9966700002", emergencyAvailable: "true",},
  {name: "APOLLO HOSPITAL", district: "vishakapatnam", departments: ["orthopedic"], doctor: "Dr. D. Abdul Khan", address: "https://maps.app.goo.gl/UaZvVjtDNgFUF5eJ9", type: "private", contact: "6305628096", emergencyAvailable: "true",},
  {name: "S R S ORTHO", district: "vishakapatnam", departments: ["orthopedic"], doctor: "Dr. G. Srinivas", address: "https://maps.app.goo.gl/aHkV6XUwkZHjyFZ28", type: "private", contact: "9264123234", emergencyAvailable: "true",},

  {name: "DR BALA'S ORTHO", district: "east godavari", departments: ["orthopedic"], doctor: "Dr. K V Bala Subramanyam", address: "https://maps.app.goo.gl/ZkPZjZHPzP1L91uv8", type: "private", contact: "Not Available", emergencyAvailable: "true",},
  {name: "RAJAHMUNDRY ORTHOPEDIC", district: "east godavari", departments: ["orthopedic"], doctor: "Dr. Subbarao K V S", address: "https://maps.app.goo.gl/HVRCmnncBtwSdB5j8", type: "private", contact: "8832468110", emergencyAvailable: "true",},
  {name: "SRI RAVI ORTHOPEDIC HOSPITAL", district: "east godavari", departments: ["orthopedic"], doctor: "Dr. Ravindra Babu", address: "https://maps.app.goo.gl/H1oYYwuZNEgWizDfA", type: "private", contact: "9866255678", emergencyAvailable: "true",},

  {name: "AKSHARA SPECIALITY HOSPITAL", district: "west godavari", departments: ["orthopedic"], doctor: "Dr. G. Somaraju", address: "https://maps.app.goo.gl/ezfv6aFr5A87FEMe9", type: "private", contact: "7036601444", emergencyAvailable: "true",},
  {name: "SRI CHAKRA ORTHOPEDIC", district: "west godavari", departments: ["orthopedic"], doctor: "Dr. M. Rajendra", address: "https://maps.app.goo.gl/TTopmGUGnYWbwVYRA", type: "private", contact: "7777879191", emergencyAvailable: "true",},
  {name: "SRI VIJAYA ORTHOPEDIC", district: "west godavari", departments: ["orthopedic"], doctor: "Dr. K. Veerareddy", address: "https://maps.app.goo.gl/7g18SijPwsPeBQ917", type: "private", contact: "8855255442", emergencyAvailable: "true",},

  {name: "M J NAIDU SUPER SPECIALITY HOSPITAL", district: "krishna", departments: ["orthopedic"], doctor: "Dr. M J Naidu", address: "https://maps.app.goo.gl/MhSnroTQ8kScu4cg9", type: "private", contact: "9640133302", emergencyAvailable: "true",},
  {name: "SENTINI HOSPITAL", district: "krishna", departments: ["orthopedic"], doctor: "Dr. Gopi Krishna Kakarla", address: "https://maps.app.goo.gl/eMES2yNQERJhREf4A", type: "private", contact: "Not Available", emergencyAvailable: "true",},
  {name: "ROOPA ORTHOPEDIC", district: "krishna", departments: ["orthopedic"], doctor: "Dr. M V Hariprasad", address: "https://maps.app.goo.gl/JDevx5BYbnZBZcxz9", type: "private", contact: "8005900600", emergencyAvailable: "true",},

  {name: "SHRI RAMACHANDRA JOINT REPLACEMENT", district: "guntur", departments: ["orthopedic"], doctor: "Dr. B. Siviah", address: "https://maps.app.goo.gl/2QYn48qKW68BiGtr5", type: "private", contact: "9030797989", emergencyAvailable: "true",},
  {name: "YELURI HOSPITAL", district: "guntur", departments: ["orthopedic"], doctor: "Dr. Yeluri Ramakrishna", address: "https://maps.app.goo.gl/Xd9k64bsHe1GDmYf8", type: "private", contact: "9494408877", emergencyAvailable: "true",},
  {name: "KIMS SIKHARA HOSPITAL", district: "guntur", departments: ["orthopedic"], doctor: "Dr. Srinivas Polisetty", address: "https://maps.app.goo.gl/tU7TdcfKUUvAadAz6", type: "private", contact: "7699699499", emergencyAvailable: "true",},

  {name: "AMAR HOSPITALS", district: "prakasam", departments: ["orthopedic"], doctor: "Dr. R. Amarnath Reddy", address: "https://maps.app.goo.gl/CU1v7oduRh4RQXTEA", type: "private", contact: "Not Available", emergencyAvailable: "true",},
  {name: "SRI BALAJI MULTI SPECIALITY HOSPITAL", district: "prakasam", departments: ["orthopedic"], doctor: "Dr. B. Kasi Vishwamadh", address: "https://maps.app.goo.gl/ryn1HaQ4gPzp89HS6", type: "private", contact: "7842511455", emergencyAvailable: "true",},
  {name: "SAI SINDHURA INSTITUTE OF MEDICAL SCIENCES", district: "prakasam", departments: ["orthopedic"], doctor: "Dr. J. Manjunath", address: "https://maps.app.goo.gl/3b2SUb5wqE4kQx6Z6", type: "private", contact: "6300852710", emergencyAvailable: "true",},

  {name: "SRI SAI SPECIALITY HOSPITAL", district: "nellore", departments: ["orthopedic"], doctor: "Dr. V K C Reddy", address: "https://maps.app.goo.gl/ssB72wM5d1iDFSCa7", type: "private", contact: "8612329299", emergencyAvailable: "true",},
  {name: "DEEKSHA HOSPITAL", district: "nellore", departments: ["orthopedic"], doctor: "Dr. Anvesh Gattu", address: "https://maps.app.goo.gl/KfCtTqTz1oCeV8mAA", type: "private", contact: "7230943943", emergencyAvailable: "true",},
  {name: "BHASHKAR ORTHOPEDIC", district: "nellore", departments: ["orthopedic"], doctor: "Dr. K. Bhashkar", address: "https://maps.app.goo.gl/upFrRyCrX6YSsDxw9", type: "private", contact: "7207209313", emergencyAvailable: "true",},

  {name: "AHMAD ORTHO AND MULTI SPECIALITY HOSPITAL", district: "ananthapur", departments: ["orthopedic"], doctor: "Dr. Irshad Ahmed", address: "https://maps.app.goo.gl/JRE2VyuVqWZYnmQu5", type: "private", contact: "9052874107", emergencyAvailable: "true",},
  {name: "CARE AND CURE HOSPITAL", district: "ananthapur", departments: ["orthopedic"], doctor: "Dr. Abhishek reddy Lingala", address: "https://maps.app.goo.gl/ci1HXcXbNfUdCv8d6", type: "private", contact: "8554220555", emergencyAvailable: "true",},
  {name: "SUNRAY HOSPITAL", district: "ananthapur", departments: ["orthopedic"], doctor: "Dr. R P Raghavendra Raju", address: "https://maps.app.goo.gl/onLWxzPHdSC1ALFt5", type: "private", contact: "9989517151", emergencyAvailable: "true",},

  {name: "J B HOSPITAL", district: "kadapa", departments: ["orthopedic"], doctor: "Dr. Jahangeer Basha", address: "https://maps.app.goo.gl/RgFXsdoAugWrTLc39", type: "private", contact: "8790412295", emergencyAvailable: "true",},
  {name: "VIDYA SAGAR HOSPITAL", district: "kadapa", departments: ["orthopedic"], doctor: "Dr. Vidya Sagar Reddy", address: "https://maps.app.goo.gl/88K5fo6UqznYRUUS7", type: "private", contact: "7337003322", emergencyAvailable: "true",},
  {name: "LEELAVATHI ORTHO CARE", district: "kadapa", departments: ["orthopedic"], doctor: "Dr. Sivananda reddy", address: "https://maps.app.goo.gl/NHLERuTDKtDEELyT6", type: "private", contact: "8341581166", emergencyAvailable: "true",},

  {name: "AARKA HOSPITAL", district: "kurnool", departments: ["orthopedic"], doctor: "Dr. G. Giri Mahesh Yadav", address: "https://maps.app.goo.gl/hindMwWYT9GvoaU46", type: "private", contact: "8958938989", emergencyAvailable: "true",},
  {name: "APPLE HOSPITAL", district: "kurnool", departments: ["orthopedic"], doctor: "Dr. S. Achyutha Rao", address: "https://maps.app.goo.gl/dh1zrSMxx1bDsVna9", type: "private", contact: "8790172084", emergencyAvailable: "true",},
  {name: "SIRI NOBLE HOSPITAL", district: "kurnool", departments: ["orthopedic"], doctor: "Dr. D V Ramana", address: "https://maps.app.goo.gl/mjfLMVuvHnnQtkLG7", type: "private", contact: "8518224133", emergencyAvailable: "true",},

  {name: "HOPE HOSPITAL", district: "chittoor", departments: ["orthopedic"], doctor: "Dr. G. Harish", address: "https://maps.app.goo.gl/pnTDPXqVFJbkeJxm9", type: "private", contact: "Not Available", emergencyAvailable: "true",},
  {name: "SRI CHAKRA HOSPITAL", district: "chittoor", departments: ["orthopedic"], doctor: "Dr. V. Rajesh", address: "https://maps.app.goo.gl/sJYFFJokk5PdDSo67", type: "private", contact: "9177000231", emergencyAvailable: "true",},
  {name: "SHRI SAI JAGADEESH ORTHOPEDIC", district: "chittoor", departments: ["orthopedic"], doctor: "Dr. Jagadeesh M", address: "https://maps.app.goo.gl/6a9s8o73cF3LgqiPA", type: "private", contact: "9985625235", emergencyAvailable: "true",},
  
    // ================= GYENECOLOGY =================
   
  { name: "MEENAKSHI HOSPITAL", district: "srikakulam",departments: ["gyenecology"],doctor: "Dr. Ch. Haritha",address: "https://maps.app.goo.gl/AxER3spz2YZsQC2o9", type: "private", contact: "9505355020",emergencyAvailable: "true",},
  { name: "DAY AND NIGHT MEDICAL COMPLEX", district: "srikakulam",departments: ["gyenecology"],doctor: "Dr. Vanajakshi Jami",address: "https://maps.app.goo.gl/ecGH5FTHQmPEBtDU7", type: "private", contact: "Not Available",emergencyAvailable: "true",},
  { name: "SIRI UNNATI HOSPITAL", district: "srikakulam",departments: ["gyenecology"],doctor: "Dr. Sireesha",address: "https://maps.app.goo.gl/sYKfctCVx5ZXdpG2A", type: "private", contact: "9392693839",emergencyAvailable: "true",},

  { name: "VENKATADRI HOSPITAL", district: "vizianagaram",departments: ["gyenecology"],doctor: "Dr. A V S Usha Rani",address: "https://maps.app.goo.gl/XMnieFLK7WE5gFxc9", type: "private", contact: "8922231688",emergencyAvailable: "true",},
  { name: "VENKATAPADMA HOSPITAL", district: "vizianagaram",departments: ["gyenecology"],doctor: "Dr. M. Padma Kumari",address: "https://maps.app.goo.gl/mcSygXT2kpghAiok8", type: "private", contact: "9000267654",emergencyAvailable: "true",},
  { name: "JYOTHI HOSPITAL", district: "vizianagaram",departments: ["gyenecology"],doctor: "Dr. P. Sunitha",address: "https://maps.app.goo.gl/X8emjtXu8uxVdq3BA", type: "private", contact: "Not Available",emergencyAvailable: "true",},

  { name: "MEDICOVER HOSPITAL", district: "vishakapatnam",departments: ["gyenecology"],doctor: "Dr. Vidyarama",address: "https://maps.app.goo.gl/HyKmsgnCbSsE6xw46", type: "private", contact: "4068334455",emergencyAvailable: "true",},
  { name: "ARIYA HOSPITAL", district: "vishakapatnam",departments: ["gyenecology"],doctor: "Dr. Shilpahasa Samalla",address: "https://maps.app.goo.gl/5eH7MTFjUcbrg9c98", type: "private", contact: "7095925747",emergencyAvailable: "true",},
  { name: "GIGGLES BY OMNI HOSPITAL", district: "vishakapatnam",departments: ["gyenecology"],doctor: "Dr. B. Sowdamini",address: "https://maps.app.goo.gl/7aR1GFthQNRwgshN9", type: "private", contact: "8880101000",emergencyAvailable: "true",},

  { name: "G V S GASTRO AND GYENAC", district: "east godavari",departments: ["gyenecology"],doctor: "Name Not Available",address: "https://maps.app.goo.gl/4uCtVvzqxPGtzoMo8", type: "private", contact: "8832444333",emergencyAvailable: "true",},
  { name: "THOLATH MEMORIAL MULTI SPECIALITY HOSPITAL", district: "east godavari",departments: ["gyenecology"],doctor: "Dr. Ashwini Soundarya",address: "https://maps.app.goo.gl/UngadsKCqTSjtzeRA", type: "private", contact: "Not Available",emergencyAvailable: "true",},
  { name: "PRASANNA MATERNITY AND MULTI SPECIALITY HOSPITAL", district: "east godavari",departments: ["gyenecology"],doctor: "Dr. P. Surya Lakshmi Prasanna",address: "https://maps.app.goo.gl/5zCPNScCLMmyLypKA", type: "private", contact: "8832445656",emergencyAvailable: "true",},

  { name: "MOTHERNESS FERTILITY WOMEN'S AND CHILDRENS HOSPITAL", district: "west godavari",departments: ["gyenecology"],doctor: "Dr. K. Manasa Sravya",address: "https://maps.app.goo.gl/B6qyv6tfjLHFZHr88", type: "private", contact: "9550090251",emergencyAvailable: "true",},
  { name: "UMA HOSPITAL", district: "west godavari",departments: ["gyenecology"],doctor: "Dr. Uma",address: "https://maps.app.goo.gl/14PpptCactsfo8xW9", type: "private", contact: "9491629868",emergencyAvailable: "true",},
  { name: "AVIDEEP MOTHER AND CHILDREN HOSPITAL", district: "west godavari",departments: ["gyenecology"],doctor: "Dr. A. Asha Deepthi",address: "https://maps.app.goo.gl/rmUJPw9J9Y6GQzWR6", type: "private", contact: "9959958453",emergencyAvailable: "true",},

  { name: "SRAVANTHI HOSPITAL", district: "krishna",departments: ["gyenecology"],doctor: "Dr. Sravanthi D",address: "https://maps.app.goo.gl/EGFfw6dzxewixFui8", type: "private", contact: "9160024567",emergencyAvailable: "true",},
  { name: "AKKINENI HOSPITAL", district: "krishna",departments: ["gyenecology"],doctor: "Dr. A. Mani",address: "https://maps.app.goo.gl/6doYF6CVhKdAa46r6", type: "private", contact: "7386765599",emergencyAvailable: "true",},
  { name: "RAINBOW CHILDREN HOSPITAL", district: "krishna",departments: ["gyenecology"],doctor: "Dr. Uma",address: "https://maps.app.goo.gl/EeqMG4ZpFbz96K8d7", type: "private", contact: "8069662201",emergencyAvailable: "true",},

  { name: "HELP HOSPITAL", district: "guntur",departments: ["gyenecology"],doctor: "Dr. Nelluri Bharathi",address: "https://maps.app.goo.gl/HE6TR8UaeYwA4J838", type: "private", contact: "8632265559",emergencyAvailable: "true",},
  { name: "AZIZIA HOSPITAL", district: "guntur",departments: ["gyenecology"],doctor: "Dr. Malika Azizia",address: "https://maps.app.goo.gl/deMAjxNS6QuPPtX3A", type: "private", contact: "8977015170",emergencyAvailable: "true",},
  { name: "AHALYA NURSING HOME", district: "guntur",departments: ["gyenecology"],doctor: "Dr. S. Aruna",address: "https://maps.app.goo.gl/tPUDJejQWy6r2o3t9", type: "private", contact: "8632225105",emergencyAvailable: "true",},

  { name: "VARALAKSHMI FERTILITY AND MATERNITY HOSPITAL", district: "prakasam",departments: ["gyenecology"],doctor: "Dr. G. Varalakshmi",address: "https://maps.app.goo.gl/ynB3DkyMX8gyCV9MA", type: "private", contact: "7799033339",emergencyAvailable: "true",},
  { name: "VIJAYA HOSPITAL", district: "prakasam",departments: ["gyenecology"],doctor: "Dr. Meena",address: "https://maps.app.goo.gl/prhy9tZ7Wf9y27iG9", type: "private", contact: "9642146111",emergencyAvailable: "true",},
  { name: "PRAKASAM SUPER SPECIALITY HOSPITAL", district: "prakasam",departments: ["gyenecology"],doctor: "Dr. Deepika Boppana",address: "https://maps.app.goo.gl/PFX87fe96J3XXrWBA", type: "private", contact: "7799866666",emergencyAvailable: "true",},

  { name: "SAI RAM HOSPITAL", district: "nellore",departments: ["gyenecology"],doctor: "Dr. K. Lalitha",address: "https://maps.app.goo.gl/8ZnDLofrjeLLxtyk8", type: "private", contact: "7032124536",emergencyAvailable: "true",},
  { name: "LOTUS HOSPITAL", district: "nellore",departments: ["gyenecology"],doctor: "Dr. Ch. Veeramma",address: "https://maps.app.goo.gl/E1NVL5CeLH6G2uio9", type: "private", contact: "9533998838",emergencyAvailable: "true",},
  { name: "R S R STAR HOSPITAL", district: "nellore",departments: ["gyenecology"],doctor: "Dr. Krishna Charitha Reddy",address: "https://maps.app.goo.gl/n4kXtThArbqvbT1K9", type: "private", contact: "Not Available",emergencyAvailable: "true",},

  { name: "LIFE LINE HOSPITAL", district: "ananthapur",departments: ["gyenecology"],doctor: "Dr. Divya Deepak",address: "https://maps.app.goo.gl/TRmVds24Yf2aif297", type: "private", contact: "8790120721",emergencyAvailable: "true",},
  { name: "K G N HOSPITAL", district: "ananthapur",departments: ["gyenecology"],doctor: "Dr. Mobben Taj",address: "https://maps.app.goo.gl/pDevELa2xAyiSQEm8", type: "private", contact: "6302120321",emergencyAvailable: "true",},
  { name: "SHRITHA HOSPITAL", district: "ananthapur",departments: ["gyenecology"],doctor: "Dr. Chavva Bindhu",address: "https://maps.app.goo.gl/u4jceq33mYwmuFKGA", type: "private", contact: "9494440450",emergencyAvailable: "true",},

  { name: "GAJJALA MATERNITY HOSPITAL", district: "kadapa",departments: ["gyenecology"],doctor: "Dr. A. Shakunthala",address: "https://maps.app.goo.gl/8g22DjeeMMKxFxj57", type: "private", contact: "9490136901",emergencyAvailable: "true",},
  { name: "SRI LAKSHMI HOSPITAL", district: "kadapa",departments: ["gyenecology"],doctor: "Dr. Sasikala",address: "https://maps.app.goo.gl/yfZW2vxakD7wq9ce9", type: "private", contact: "8341851675",emergencyAvailable: "true",},
  { name: "LEELA MOTHER AND CHILD HOSPITAL", district: "kadapa",departments: ["gyenecology"],doctor: "Dr. G. Leelavathi",address: "https://maps.app.goo.gl/67Nx5Qzx7dLghDtv6", type: "private", contact: "8008857099",emergencyAvailable: "true",},

  { name: "ASHWINI HOSPITAL", district: "kurnool",departments: ["gyenecology"],doctor: "Dr. Vijaya Lakshmi K",address: "https://maps.app.goo.gl/9HBsQA8jwDtPG6MP8", type: "private", contact: "8374775867",emergencyAvailable: "true",},
  { name: "SAHITHI CLINIC", district: "kurnool",departments: ["gyenecology"],doctor: "Dr. Shashikala",address: "https://maps.app.goo.gl/ws5A9C8gNkj3L14H7", type: "private", contact: "Not Available",emergencyAvailable: "true",},
  { name: "MEDICOVER HOSPITAL", district: "kurnool",departments: ["gyenecology"],doctor: "Dr. T. Jyotsna",address: "https://maps.app.goo.gl/mcAE1m27kuiDApAP9", type: "private", contact: "04068334455",emergencyAvailable: "true",},

  { name: "MOTHER HOSPITAL", district: "chittoor",departments: ["gyenecology"],doctor: "Dr. B. Gouthami",address: "https://maps.app.goo.gl/tbNvoQLujor6TdYP6", type: "private", contact: "9618916106",emergencyAvailable: "true",},
  { name: "SRESHTA HOSPITAL", district: "chittoor",departments: ["gyenecology"],doctor: "Dr. Shalini",address: "https://maps.app.goo.gl/EcMUPxvtTeAssitu9", type: "private", contact: "7386963388",emergencyAvailable: "true",},
  { name: "SREE AMRUTHA MATERNITY AND FERTILITY CLINIC", district: "chittoor",departments: ["gyenecology"],doctor: "Dr. D. Deepa",address: "https://maps.app.goo.gl/8XEk5ZYftDZuZK4v6", type: "private", contact: "9347290472",emergencyAvailable: "true",},
  
    // ================= PEDIATRICS =================
    
  { name: "LITTLE MASTER'S HOSPITAL", district: "srikakulam", departmentss: ["pediatrics"], doctor: "Dr. Aanvesh Amiti", address: "https://maps.app.goo.gl/VzeNEcr89DfhAufz6", type: "private", contact: "9559699599",emergencyAvailable: "true"},
  { name: "SRI R K MOTHER AND CHILD CARE HOSPITAL", district: "srikakulam", departmentss: ["pediatrics"], doctor: "Dr. B. Rama Koteswara rao", address: "https://maps.app.goo.gl/9wasXKD5vrp9shsv7", type: "private", contact: "Not Available",emergencyAvailable: "true"},
  { name: "VANDANA HOSPITAL", district: "srikakulam", departmentss: ["pediatrics"], doctor: "Dr. K. Sachitra", address: "https://maps.app.goo.gl/3mjVTngJ2X7Z6trx9", type: "private", contact: "9392566399",emergencyAvailable: "true"},

  { name: "AJAY CHILDREN'S HOSPITAL", district: "vizianagaram", departmentss: ["pediatrics"], doctor: "Dr. Ajay Kumar Ch", address: "https://maps.app.goo.gl/YUuWU5eYLyixQsNA9", type: "private", contact: "8464070196",emergencyAvailable: "true"},
  { name: "QUEEN'S  NRI HOSPITAL", district: "vizianagaram", departmentss: ["pediatrics"], doctor: "Dr. K. Santhosh Kalyan", address: "https://maps.app.goo.gl/MgR8zX3P4hD1LS1u6", type: "private", contact: "8922225177",emergencyAvailable: "true"},
  { name: "JYOTHI HOSPITALS", district: "vizianagaram", departments: ["pediatrics"], doctor: "Dr. S. Uday", address: "https://maps.app.goo.gl/BDACDc9ViihS8a7P8", type: "private", contact: "8922225102",emergencyAvailable: "true"},

  { name: "LOTUS HOSPITAL FOR WOMEN AND CHILDREN", district: "vishakapatnam", departments: ["pediatrics"], doctor: "Dr. K. Seshagiri", address: "https://maps.app.goo.gl/gcKT7bWG2yzNCADy9", type: "private", contact: "9154321216",emergencyAvailable: "true"},
  { name: "KIMS CUDDLES", district: "vishakapatnam", departments: ["pediatrics"], doctor: "Dr. Manoj Kumar Reddy", address: "https://maps.app.goo.gl/TQXrbv5Uw6SWhSw36", type: "private", contact: "Not Available",emergencyAvailable: "true"},
  { name: "RAINBOW CHILDREN'S CLINIC", district: "vishakapatnam", departments: ["pediatrics"], doctor: "Dr. K. Radhakrishna", address: "https://maps.app.goo.gl/jM2mvUN8Gvqyxoa96", type: "private", contact: "8037836553",emergencyAvailable: "true"},

  { name: "KUSUMA CHILDREN'S HOSPITAL", district: "east godavari", departments: ["pediatrics"], doctor: "Dr. S K N Manikanta", address: "https://maps.app.goo.gl/BArfX4gFQz4VmdyD7", type: "private", contact: "7799246555",emergencyAvailable: "true"},
  { name: "KIFY CHILDREN HOSPITAL", district: "east godavari", departments: ["pediatrics"], doctor: "Dr. Tejaswi Karuturi", address: "https://maps.app.goo.gl/5Yintj6iahkLS1Pw7", type: "private", contact: "8500023456",emergencyAvailable: "true"},
  { name: "RAINBOW CHILDREN HOSPITAL", district: "east godavari", departments: ["pediatrics"], doctor: "Dr. N. Hemakumar", address: "https://maps.app.goo.gl/5kNjjzEQ6gQrZ9rh8", type: "private", contact: "8045234425",emergencyAvailable: "true"},

  { name: "SUKHIBHAVA CHILDREN'S HOSPITAL", district: "west godavari", departments: ["pediatrics"], doctor: "Dr. G V Sireesha", address: "https://maps.app.goo.gl/pR6x5GJ6pt6wWtrg8", type: "private", contact: "9396449992",emergencyAvailable: "true"},
  { name: "SRI BALA CHILDREN'S HOSPITAL", district: "west godavari", departments: ["pediatrics"], doctor: "Dr. Y. Venkatesh Babu", address: "https://maps.app.goo.gl/gvBuAqZsSjrNyh9m9", type: "private", contact: "9094867867",emergencyAvailable: "true"},
  { name: "LOTUS CHILDREN HOSPITAL", district: "west godavari", departments: ["pediatrics"], doctor: "Dr. V. Lokeswara Reddy", address: "https://maps.app.goo.gl/EoeDFt15xWnAwnfo9", type: "private", contact: "8819228108",emergencyAvailable: "true"},

  { name: "BRIGHT CHILDREN'S HOSPITAL", district: "krishna", departments: ["pediatrics"], doctor: "Dr. R. Srinivas", address: "https://maps.app.goo.gl/wGz2eB2R7HwFjxPP6", type: "private", contact: "7416699108",emergencyAvailable: "true"},
  { name: "KRISHNA SOMASIYARAM CHILDREN'S MULTI SPECIALITY HOSPITAL", district: "krishna", departments: ["pediatrics"], doctor: "Dr. M. Neelima", address: "https://maps.app.goo.gl/TVfHymwNu7fsmbgE7", type: "private", contact: "9985862841",emergencyAvailable: "true"},
  { name: "SRI SRINIVASA CHILDREN'S HOSPITAL", district: "krishna", departments: ["pediatrics"], doctor: "Dr. J. Bhuvaneswara Rao", address: "https://maps.app.goo.gl/sRFwudb8JD8ci6Ga8", type: "private", contact: "8662438090",emergencyAvailable: "true"},

  { name: "AAYUSHMAN MOTHER AND CHILDREN'S HOSPITAL", district: "guntur", departments: ["pediatrics"], doctor: "Dr. D. Rakesh Babu", address: "https://maps.app.goo.gl/V8Baz4gpsk1DFwWB8", type: "private", contact: "6304744199",emergencyAvailable: "true"},
  { name: "BLOSSOM CHILDREN'S HOSPITAL", district: "guntur", departments: ["pediatrics"], doctor: "Dr. M N Sudheer Kumar", address: "https://maps.app.goo.gl/L5QAFBYR7gfVvXL36", type: "private", contact: "8632222339",emergencyAvailable: "true"},
  { name: "AMARAVATHI CHILDREN'S HOSPITAL", district: "guntur", departments: ["pediatrics"], doctor: "Dr. Harish", address: "https://maps.app.goo.gl/XNm62RyQXqzqznzt9", type: "private", contact: "8008237744",emergencyAvailable: "true"},

  { name: "SAI VEENA MOTHER AND CHILDREN'S HOSPITAL", district: "prakasam", departments: ["pediatrics"], doctor: "Dr. L. Suneel Kumar", address: "https://maps.app.goo.gl/NeHeWy4izZXKZ4FN9", type: "private", contact: "Not Available",emergencyAvailable: "true"},
  { name: "RAMACHANDRA CHILDREN HOSPITAL", district: "prakasam", departments: ["pediatrics"], doctor: "Dr. T. Chandra Sekhar Reddy", address: "https://maps.app.goo.gl/pEq4d16wRPkiKP2e9", type: "private", contact: "8632323743",emergencyAvailable: "true"},
  { name: "AMARAVATHI CHILDREN'S HOSPITAL", district: "prakasam", departments: ["pediatrics"], doctor: "Dr. Harish paleti", address: "https://maps.app.goo.gl/XNm62RyQXqzqznzt9", type: "private", contact: "8008237744",emergencyAvailable: "true"},

  { name: "APOLLO HOSPITAL", district: "nellore", departments: ["pediatrics"], doctor: "Dr. Mohammed Rafi", address: "https://maps.app.goo.gl/ubqEkmrzPtrQbWZJ7", type: "private", contact: "9063652912",emergencyAvailable: "true"},
  { name: "NIZAM'S LITTLE STAR CHILDREN'S HOSPITAL", district: "nellore", departments: ["pediatrics"], doctor: "Dr. Srinivas", address: "https://maps.app.goo.gl/ZnjdgMeJFd1GvRwf9", type: "private", contact: "8612315776",emergencyAvailable: "true"},
  { name: "PRIME CHILDREN'S HOSPITAL", district: "nellore", departments: ["pediatrics"], doctor: "Dr. A. Kalyan Chakravarthy", address: "https://maps.app.goo.gl/a12W5CBgXsTuGiXg9", type: "private", contact: "7032544744",emergencyAvailable: "true"},

  { name: "STAR KIDS CHILDREN HOSPITAL", district: "ananthapur", departments: ["pediatrics"], doctor: "Dr. Raghuvamsi Chaitra", address: "https://maps.app.goo.gl/camcdVgQF96Ei76Z6", type: "private", contact: "7901009911",emergencyAvailable: "true"},
  { name: "SREENIVASA CHILDREN HOSPITAL", district: "ananthapur", departments: ["pediatrics"], doctor: "Dr. Srikanth Reddy", address: "https://maps.app.goo.gl/w65dWpFsfFXbhTCWA", type: "private", contact: "8554241104",emergencyAvailable: "true"},
  { name: "HRUDAYA CHILDREN'S HOSPITAL", district: "ananthapur", departments: ["pediatrics"], doctor: "Dr. Srinivasa M", address: "https://maps.app.goo.gl/UmUVhXSkfMXZceYZ9", type: "private", contact: "7989106060",emergencyAvailable: "true"},

  { name: "HEMANTH CHILDREN'S HOSPITAL", district: "kadapa", departments: ["pediatrics"], doctor: "Dr. Hemanth", address: "https://maps.app.goo.gl/4UK6wKGGTVLF25Zx8", type: "private", contact: "8121687008",emergencyAvailable: "true"},
  { name: "MOKSHA CHILDREN'S HOSPITAL", district: "kadapa", departments: ["pediatrics"], doctor: "Name Not Available", address: "https://maps.app.goo.gl/18V4HuQg4LicsTHz7", type: "private", contact: "9703087515",emergencyAvailable: "true"},
  { name: "ISHAN CHILDREN'S HOSPITAL", district: "kadapa", departments: ["pediatrics"], doctor: "Dr. C. Obul Reddy", address: "https://maps.app.goo.gl/WP7CxDFSEvXqKuEw9", type: "private", contact: "8333997171",emergencyAvailable: "true"},

  { name: "KIMS CUDDLES", district: "kurnool", departments: ["pediatrics"], doctor: "Dr. G. Sudhakar", address: "https://maps.app.goo.gl/UFYWAuZyyoqPoFSr5", type: "private", contact: "8518352000",emergencyAvailable: "true"},
  { name: "G V R CHILDREN'S HOSPITAL", district: "kurnool", departments: ["pediatrics"], doctor: "Dr. M. Bhuvaneswari", address: "https://maps.app.goo.gl/RdUyk8ppNoHPwdrSA", type: "private", contact: "8518225648",emergencyAvailable: "true"},
  { name: "A B C  CHILDREN HOSPITAL", district: "kurnool", departments: ["pediatrics"], doctor: "Dr. T. Krishna Reddy", address: "https://maps.app.goo.gl/L1WcZybafdQMGgzFA", type: "private", contact: "8518233341",emergencyAvailable: "true"},

  { name: "SURAKSHA CHILDREN HOSPITAL", district: "chittoor", departments: ["pediatrics"], doctor: "Dr. Abhiram Kumar", address: "https://maps.app.goo.gl/s9cEAfbbFV2TNLe9A", type: "private", contact: "Not Available",emergencyAvailable: "true"},
  { name: "NAANI'S MOTHER AND CHILD HOSPITAL", district: "chittoor", departments: ["pediatrics"], doctor: "Dr. Pallavi Reddy", address: "https://maps.app.goo.gl/AC3EKXNL4bj72PucA", type: "private", contact: "9553888989",emergencyAvailable: "true"},
  { name: "VISHNU CHILDREN'S HOSPITAL", district: "chittoor", departments: ["pediatrics"], doctor: "Dr. P. Vishnu Vardhan Redy", address: "https://maps.app.goo.gl/5QLJwYh7s31RnT9XA", type: "private", contact: "9502700306",emergencyAvailable: "true"},
];

// ================= SEED FUNCTION =================
async function seedHospitals() {
  try {
    if (!MONGO_URI) {
      throw new Error("❌ MONGO_URI missing in .env");
    }

    // ✅ Connect DB
    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB Connected");

    // ✅ Clear old hospitals
    await Hospital.deleteMany();

    // ✅ Insert hospitals
    await Hospital.insertMany(hospitals);

    console.log("✅ Hospital data inserted successfully");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);

    process.exit(1);
  }
}

seedHospitals();