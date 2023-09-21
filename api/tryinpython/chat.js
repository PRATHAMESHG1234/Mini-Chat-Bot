const express = require("express");
const { spawn } = require("child_process");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const requestBody = req.body;
    const userInput = requestBody.input;

    // Spawn a Python child process
    const pythonProcess = spawn("python", ["my_python_script.py"], {
      // Set the cwd (current working directory) to the directory containing your Python script
      cwd: __dirname,
    });

    // Send the user input to the Python child process
    pythonProcess.stdin.write(userInput + "\n");
    pythonProcess.stdin.end();

    let response = "";

    // Listen for data events from the Python child process
    pythonProcess.stdout.on("data", (data) => {
      response += data.toString();
    });

    // Listen for the child process to exit
    pythonProcess.on("close", (code) => {
      console.log("Python child process exited with code " + code);

      // Send the response back to the client
      res.json({ response });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
