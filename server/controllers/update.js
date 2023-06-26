const User = require("../model/User.js");

const handleScore = async (req, res) => {
  try {
    const { value, email, token } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const result = user.score + value;
    console.log(result);
    user.score = result;
    await user.save();
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const handleLevel = async (req, res) => {
  try {
    const { value, email, token } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });
    user.level = value;
    await user.save();
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { handleScore, handleLevel };
