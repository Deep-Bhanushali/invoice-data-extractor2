// Load environment variables from a .env file
require('dotenv').config();

const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs').promises;
const app = express();
const PORT = 8000;

// PDF processing dependencies (with fallbacks)
let pdfParse;
try {
    pdfParse = require('pdf-parse');
    console.log("✅ PDF processing library loaded successfully");
} catch (error) {
    console.warn("Warning: pdf-parse not available. PDF text extraction will be limited.");
}

// Get the API Key from environment variables
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("ERROR: GEMINI_API_KEY is not defined in your .env file.");
    process.exit(1);
}

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept images and PDFs
        if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only image files and PDF files are allowed!'), false);
        }
    }
});

// PDF processing function
async function processPDF(buffer) {
    try {
        if (!pdfParse) {
            throw new Error('PDF parsing library not available');
        }

        const data = await pdfParse(buffer);
        return {
            text: data.text,
            pages: data.numpages,
            info: data.info
        };
    } catch (error) {
        console.error('Error processing PDF:', error);
        throw new Error(`Failed to process PDF: ${error.message}`);
    }
}

// Convert file buffer to base64
function bufferToBase64(buffer) {
    return buffer.toString('base64');
}

app.get('/api/key', (req, res) => {
    res.json({ apiKey: apiKey });
});

// PDF processing endpoint
app.post('/api/process-pdf', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        if (req.file.mimetype === 'application/pdf') {
            // Process PDF
            const pdfData = await processPDF(req.file.buffer);
            res.json({
                type: 'pdf',
                text: pdfData.text,
                pages: pdfData.pages,
                info: pdfData.info
            });
        } else {
            // Process image
            const base64 = bufferToBase64(req.file.buffer);
            res.json({
                type: 'image',
                base64: base64,
                mimeType: req.file.mimetype
            });
        }
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ error: error.message });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Open this URL in your browser to use the tool.");
    console.log("PDF processing is now supported!");
});
