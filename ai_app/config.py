import os
from pathlib import Path

# Base directory of the AI application
BASE_DIR = Path(__file__).resolve().parent

# Data directories
DATA_DIR = BASE_DIR / "data"
MODELS_DIR = BASE_DIR / "models"

# Create directories if they don't exist
DATA_DIR.mkdir(exist_ok=True)
MODELS_DIR.mkdir(exist_ok=True)

# Model training configuration
MODEL_CONFIG = {
    'random_state': 42,
    'test_size': 0.2,
    'validation_size': 0.2
}

# Neural Network configuration
NN_CONFIG = {
    'epochs': 100,
    'batch_size': 32,
    'learning_rate': 0.001,
    'early_stopping_patience': 10
}

# Feature engineering configuration
FEATURE_CONFIG = {
    'scaling': 'standard',  # Options: 'standard', 'minmax', 'robust'
    'handle_missing': 'mean',  # Options: 'mean', 'median', 'most_frequent'
} 