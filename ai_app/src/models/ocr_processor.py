import cv2
import numpy as np
import pytesseract
from PIL import Image
from pathlib import Path
from typing import Dict, Union, List
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class OCRProcessor:
    def __init__(self):
        """Initialize the OCR processor with default configurations"""
        self.supported_formats = ['.jpg', '.jpeg', '.png', '.pdf']
        
    def preprocess_image(self, image: np.ndarray) -> np.ndarray:
        """
        Preprocess the image for better OCR results
        """
        try:
            # Convert to grayscale
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            
            # Apply thresholding to preprocess the image
            gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
            
            # Apply dilation to connect text components
            kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))
            gray = cv2.dilate(gray, kernel, iterations=1)
            
            return gray
        except Exception as e:
            logger.error(f"Error in image preprocessing: {str(e)}")
            raise

    def extract_text(self, image_path: Union[str, Path]) -> Dict:
        """
        Extract text from the image and return structured data
        """
        try:
            # Read the image
            image_path = str(image_path)
            image = cv2.imread(image_path)
            if image is None:
                raise ValueError("Could not read the image")

            # Preprocess the image
            processed_image = self.preprocess_image(image)
            
            # Extract text using Tesseract
            text = pytesseract.image_to_string(processed_image)
            
            # Extract structured data
            data = self._parse_text(text)
            
            return {
                'status': 'success',
                'data': data,
                'raw_text': text
            }
            
        except Exception as e:
            logger.error(f"Error in text extraction: {str(e)}")
            return {
                'status': 'error',
                'error': str(e)
            }

    def _parse_text(self, text: str) -> Dict:
        """
        Parse the extracted text to identify key fields
        """
        lines = text.split('\n')
        data = {
            'invoice_number': None,
            'date': None,
            'amount': None,
            'items': [],
            'total': None
        }
        
        for line in lines:
            line = line.strip()
            # Add your specific parsing logic here based on the e-bill/chalan format
            # This is a basic example - you'll need to customize based on your documents
            if 'invoice' in line.lower():
                # Extract invoice number using regex or string operations
                pass
            elif any(month in line.lower() for month in ['january', 'february', 'march']):
                # Extract date
                pass
            elif 'rs.' in line.lower() or '₹' in line:
                # Extract amount
                pass
                
        return data

    def validate_file(self, file_path: Union[str, Path]) -> bool:
        """
        Validate if the file is in a supported format
        """
        file_path = Path(file_path)
        return file_path.suffix.lower() in self.supported_formats 