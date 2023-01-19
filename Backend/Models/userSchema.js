const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },

    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: [true, "Email already exists"],
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [6, "Password must be at least 6 characters long"],
    },

    photo: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
      match: [/^[0-9]{10}$/, "Please add a valid phone number"],
    },

    bio: {
      type: String,
      maxlength: [250, "Bio must be at most 250 characters long"],
      default: "Hey there",
    },
  },
  {
    timestamps: true,
    updatedAt: true,
  }
);

// Encrypt password using bcrypt before saving
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
