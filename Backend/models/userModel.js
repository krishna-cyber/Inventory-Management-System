const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "Email already exists"],
      lowercase: true,
      trim: true,
      match: [
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: [6, "Minimum password length is 6 characters"],
      maxLength: [12, "Maximum password length is 12 characters"],
    },
    photo: {
      type: String,
      required: [true, "Please provide a photo"],
      default:
        "https://th.bing.com/th/id/R.ece30115246bf066a7c5028a97006bb3?rik=TMO1yB9PB9zt%2bQ&pid=ImgRaw&r=0",
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    bio: {
      type: String,
      maxLength: [200, "Maximum bio length is 200 characters"],
      default: "simple bio",
    },
  },
  {
    timestamps: true,
  }
);

//saving hashed password before saving to database
userSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

//creating function for this user to compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
