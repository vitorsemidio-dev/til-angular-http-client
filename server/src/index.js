const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();

// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multipartMiddleware = multipart({
  uploadDir: './uploads',
});

app.post('/upload', multipartMiddleware, (req, res) => {
  const files = req.files;
  console.log(files);
  return res.json({
    message: files,
  });
});

app.use((err, req, res, next) => res.json({ error: err.message }));

app.listen(3000, () => {
  console.log('server is running');
});
