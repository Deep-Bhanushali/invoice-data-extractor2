# Invoice Data Extractor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[Live Demo](https://invoice-data-extractor-32yw.vercel.app)  

> **Project:** Automated Invoice Data Extraction and CSV Generation  
> **Objective:** To develop an automated system that extracts key information from various invoice formats and generates a structured CSV file for efficient data management and analysis.

---

## Table of Contents

1. [Features](#features)  
2. [Architecture / Tech Stack](#architecture--tech-stack)  
3. [Installation](#installation)  
4. [Usage](#usage)  
5. [Project Structure](#project-structure)  
6. [Contributing](#contributing)  
7. [License](#license)  
8. [Acknowledgements](#acknowledgements)  

---

## Features

- Upload invoice documents (PDF, images, etc.)
- **NEW:** Full PDF text extraction and processing support
- Automatically detect and parse key fields (e.g. Invoice Number, Date, Vendor, Line Items, Totals)
- Data validation and error handling
- Export parsed data into a structured **CSV** format
- Support for multiple invoice layouts / templates
- Batch processing of multiple files simultaneously
- Web interface + backend API integration with PDF processing server

---

## Architecture / Tech Stack

| Layer | Technology / Library |
|---|---|
| Frontend / Web UI | HTML, CSS, JavaScript |
| Backend / Server | Node.js, Express |
| PDF Processing | pdf-parse |
| AI / OCR / Extraction | Google Gemini AI API |
| Data Output | CSV file generation |
| File Upload Handling | Multer middleware |
| Deployment / Hosting | (e.g. Vercel, Heroku, etc.) |

> **Note:** The system now includes dedicated PDF text extraction using pdf-parse library, combined with Google Gemini AI for intelligent data extraction from both images and PDF text content.

---

## Installation

> These instructions assume you have **Node.js** and **npm** installed.

1. Clone this repository
   ```bash
   git clone https://github.com/Deep-Bhanushali/Invoice-Data-Extractor.git
   cd Invoice-Data-Extractor
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the server
   ```bash
   npm start
   ```

   The server will start on `http://localhost:8000` and display a message confirming PDF processing support.

## Usage

1. **Access the Application**: Open your browser and navigate to `http://localhost:8000`

2. **Upload Documents**:
   - Click on the file input area or drag and drop files
   - Supported formats:
     - **Images**: PNG, JPEG, WebP
     - **PDFs**: Standard PDF files (text-based PDFs work best)

3. **Processing**:
   - Click "Extract Data from All Files"
   - The system will process each file individually:
     - **Images**: Converted to base64 and sent directly to Gemini AI
     - **PDFs**: Processed through the server to extract text content, then sent to Gemini AI
   - Progress is shown in real-time with success/failure indicators

4. **Download Results**:
   - Once processing is complete, click "Download Combined CSV"
   - All extracted data is combined into a single CSV file with proper headers

### PDF Processing Notes

- **Text-based PDFs**: Work best as they contain extractable text content
- **Multiple Invoices**: Single PDF files containing multiple invoices are automatically detected and separated
- **Scanned PDFs**: May have limited success depending on text extraction quality
- **Large PDFs**: Processed efficiently with progress tracking
- **Error Handling**: Individual PDF failures won't stop batch processing
- **Smart Detection**: System automatically identifies multiple invoices within a single PDF file
