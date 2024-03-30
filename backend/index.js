const express = require('express');
const multer = require('multer');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('pdfFile'), (req, res) => {
  if (!req.file || req.file.mimetype !== 'application/pdf') {
    return res.status(400).json({ error: 'Please upload a valid PDF file.' });
  }

  const uploadedFile = req.file;
  const filePath = uploadedFile.path;

  res.status(200).json({ message: 'File uploaded successfully.', filePath });
});

app.get('/pdf/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = `uploads/${fileName}`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found.' });
  }

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

app.post('/extract', async (req, res) => {
  const { filePath, selectedPages } = req.body;

  const existingPdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const copiedPages = [];

  for (const pageNum of selectedPages) {
    const [copiedPage] = await pdfDoc.copyPages(pdfDoc.getPage(pageNum - 1));
    copiedPages.push(copiedPage);
  }

  const newPdfDoc = await PDFDocument.create();
  for (const page of copiedPages) {
    newPdfDoc.addPage(page);
  }

  const newPdfBytes = await newPdfDoc.save();
  const newFileName = `output_${Date.now()}.pdf`;

  fs.writeFileSync(`uploads/${newFileName}`, newPdfBytes);

  res.status(200).json({ message: 'New PDF created successfully.', newPdfPath: newFileName });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
