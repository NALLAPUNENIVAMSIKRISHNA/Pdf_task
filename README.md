Here users can upload PDF files, select pages for extraction, and generate a new PDF based on their selections, with improved error handling and user feedback in both the frontend and backend.
### Backend (Node.js) Explanation:

1. **index.js:**

   - This file is the entry point of our Node.js server using Express.js.
   - It sets up endpoints for handling file uploads (`/upload`), retrieving uploaded PDFs (`/pdf/:fileName`), and extracting pages to create a new PDF (`/extract`).
   - We use Multer for file upload handling, PDF-lib for PDF manipulation, and the built-in `fs` module for file system operations.
   - The `/upload` endpoint checks if the uploaded file is a valid PDF and saves it to the `uploads/` directory on the server.
   - The `/pdf/:fileName` endpoint serves the uploaded PDF files to the frontend for display or download.
   - The `/extract` endpoint extracts selected pages from the uploaded PDF, creates a new PDF, and saves it to the server.
   - Error handling is improved, and meaningful error messages are returned in the responses.

### Frontend (React) Explanation:

1. **App.js:**

   - This component represents the main functionality of our frontend React application.
   - It uses React Hooks (`useState`) for managing state variables like `pdfFile`, `selectedPages`, `message`, and `newPdfPath`.
   - The `handleFileChange` function is triggered when a user selects a PDF file for upload. It updates the `pdfFile` state with the selected file.
   - The `handleUpload` function sends a POST request to the backend `/upload` endpoint to upload the PDF file. It also displays a message based on the response.
   - The `handleExtract` function sends a POST request to the backend `/extract` endpoint with the uploaded PDF file path (`filePath`) and selected pages (`selectedPages`). It updates the `message` state with the extraction result and provides a download link for the new PDF (`newPdfPath`).
   - Checkbox inputs are dynamically generated based on the number of pages in the uploaded PDF, allowing users to select pages for extraction.
   - Error handling is improved, and error messages are displayed to the user if file upload or extraction fails.

### Process Overview:

1. **Uploading a PDF File:**
   - The user selects a PDF file using the file input in the frontend.
   - The `handleFileChange` function updates the `pdfFile` state with the selected file.
   - When the user clicks the "Upload PDF" button, the `handleUpload` function sends a POST request to the backend `/upload` endpoint with the PDF file data.
   - The backend checks if the uploaded file is a valid PDF and saves it to the server in the `uploads/` directory.

2. **Displaying Uploaded PDF and Selecting Pages:**
   - After successful upload, the backend responds with a message and the file path of the uploaded PDF (`filePath`).
   - The frontend displays a message to confirm successful upload and loads the pages of the uploaded PDF.
   - Checkbox inputs are generated for each page, allowing the user to select pages for extraction.

3. **Extracting Selected Pages and Generating a New PDF:**
   - When the user clicks the "Extract Pages" button, the `handleExtract` function sends a POST request to the backend `/extract` endpoint with the uploaded PDF file path (`filePath`) and selected pages (`selectedPages`).
   - The backend extracts the selected pages from the uploaded PDF using PDF-lib, creates a new PDF, and saves it to the server.
   - The backend responds with a message indicating successful extraction and the file path of the newly generated PDF (`newPdfPath`).
   - The frontend displays a message confirming successful extraction and provides a download link for the new PDF.
