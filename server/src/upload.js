const multer = require('multer');
const { Image } = require('./models/Image');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + `.${file.originalname.split('.')[1]}`
    );
  },
});

var upload = multer({ storage: storage });

const uploadPhoto = async (req, res) => {
  try {
    const scriptPath = path.join(__dirname, 'public', 'Script-Model-1.py');
    const pythonProcess = spawn('python', [scriptPath, req.file.path]);

    let responseData = ''; // Variable to store the response data

    pythonProcess.stdout.on('data', (data) => {
      // Accumulate the data
      responseData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      // Handle errors, but don't send the response here
      // You might want to accumulate errors in a variable and send them back together
    });

    pythonProcess.on('close', (code) => {
      // The Python process has finished
      if (code === 0) {
        // Send the response once, after the Python process has completed
        return res.send(responseData);
      } else {
        // Handle errors and send a single response
        console.error(`Python process exited with code ${code}`);
        return res.status(500).send('An error occurred');
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadPhoto,
  upload,
};
