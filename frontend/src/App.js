import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [message, setMessage] = useState('');
  const [newPdfPath, setNewPdfPath] = useState('');

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('pdfFile', pdfFile);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to upload file.');
    }
  };

  const handleExtract = async () => {
    try {
      const response = await axios.post('http://localhost:3001/extract', {
        filePath: pdfFile && pdfFile.name,
        selectedPages,
      });
      setMessage(response.data.message);
      setNewPdfPath(response.data.newPdfPath);
    } catch (error) {
      setMessage('Failed to extract pages.');
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
      <br />
      <div>
        {pdfFile && (
          <>
            <p>Select pages to extract:</p>
            {[...Array(10).keys()].map((page) => (
              <label key={page}>
                <input
                  type="checkbox"
                  checked={selectedPages.includes(page + 1)}
                  onChange={() =>
                    setSelectedPages((prevPages) =>
                      prevPages.includes(page + 1)
                        ? prevPages.filter((p) => p !== page + 1)
                        : [...prevPages, page + 1]
                    )
                  }
                />
                Page {page + 1}
              </label>
            ))}
            <br />
            <button onClick={handleExtract}>Extract Pages</button>
          </>
        )}
      </div>
      {message && <p>{message}</p>}
      {newPdfPath && (
        <a href={`http://localhost:3001/uploads/${newPdfPath}`} download="new_pdf.pdf">
          Download New PDF
        </a>
      )}
    </div>
  );
};

export default App;
