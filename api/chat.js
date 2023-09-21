const express = require("express");
const { generateResponse } = require("./functions");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const requestBody = req.body;
    const userInput = requestBody.input;
    const response = await generateResponse(userInput);
    console.log("response:", response);

    res.json({ response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
