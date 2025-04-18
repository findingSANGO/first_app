from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import uvicorn
import shutil
import os
from tempfile import NamedTemporaryFile
from models.ocr_processor import OCRProcessor

# Initialize FastAPI app
app = FastAPI(
    title="E-Bill OCR API",
    description="API for processing e-bills and chalans using OCR",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Modify this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OCR processor
ocr_processor = OCRProcessor()

@app.post("/process-document/")
async def process_document(file: UploadFile = File(...)):
    """
    Process an uploaded document (image/PDF) and extract text using OCR
    """
    try:
        # Validate file type
        file_extension = Path(file.filename).suffix.lower()
        if not ocr_processor.validate_file(file.filename):
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file format. Supported formats: {', '.join(ocr_processor.supported_formats)}"
            )

        # Save uploaded file temporarily
        with NamedTemporaryFile(delete=False, suffix=file_extension) as temp_file:
            shutil.copyfileobj(file.file, temp_file)
            temp_path = temp_file.name

        try:
            # Process the document
            result = ocr_processor.extract_text(temp_path)
            
            if result['status'] == 'error':
                raise HTTPException(status_code=500, detail=result['error'])
                
            return result
            
        finally:
            # Clean up temporary file
            os.unlink(temp_path)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 