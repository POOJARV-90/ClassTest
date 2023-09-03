import UserModal from "../Modal/User.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, role, password , number , pin } = req.body.userdata

    if (!name || !email || !role || !password ||!number ||!pin)
      return res.json({ success: false, message: "all fields aree mandatory" });

    const isEmailexist = await UserModal.find({ email: email });
    if (isEmailexist.length) {
      return res.json({ success: false, message: "email alrady exist" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = new UserModal({ name, email, role, password: hashedpassword ,number,pin });
    await user.save();

    return res.json({
      success: true,
      message: "Registerd successsfully",
      user,
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body.userdata;
    if (!email || !password)
      return res.json({ success: false, message: "all fields aree mandatory" });
    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }

    const isPasswordright = await bcrypt.compare(password, user.password);

    if (isPasswordright) {
      const userobj = {
        name: user.name,
        email: user.email,
        _id: user._id,
        role: user.role,
      };
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return res.json({
        success: true,
        message: "Login Succesfull",
        user: userobj,
        token: token,
      });
    }
    return res.json({ success: false, message: "password is wrong" });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

export const getCurrentUser = async(req , res) =>{
    try {
        const {token} = req.body
        if(!token)return res.json({ success: false, message: "token is mandetory" });

        const decodededData = jwt.verify(token,process.env.JWT_SECRET)
        if(!decodededData){
            return res.json({ success: false, message: "not a valid token" });
        }

        const userId = decodededData?.userId
        const user = await UserModal.findById(userId)
        if(!user){
            return res.json({ success: false, message: "user not found" });
        }
        const userobj = {
            name: user.name,
            email: user.email,
            _id: user._id,
            role: user.role,
          };

          return res.json({ success: true, user:userobj });
        
    } catch (error) {
        return res.json({ success: false, message: error });
    }
}
