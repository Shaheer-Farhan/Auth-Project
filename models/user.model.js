import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = mongoose.Schema(
    {
        username: {
          type: String,
          required: true,
    
        },
        email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,
        },
        
        password: {
          type: String,
          required: [true, "Password is required"],
        },
        isAdmin: {
          type: Boolean,
          default: false,
        },
    
    },
      {
        timestamps: true,
      },
)

// Hash the password before saving the user model   
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });

//USERSCHEMA METHODS 


userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }

userSchema.methods.generateAccessToken = function() {
    const payload = {
      _id: this._id,
      email: this.email,
      isAdmin: this.isAdmin,
    };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
  }

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
  {
    _id: this._id
  },
  process.env.REFRESH_TOKEN_SECRET,
  
  { expiresIn:          
      process.env.REFRESH_TOKEN_EXPIRY
  
  })
}

const User = mongoose.model("User", userSchema)

export default User