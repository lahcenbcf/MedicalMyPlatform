import sys
import tensorflow as tf
from PIL import Image
import io
import base64
import cv2
import numpy as np
# Load your TensorFlow model (adjust path as necessary)
def dice_coef(y_true, y_pred):
    y_true_f = K.flatten(y_true)
    y_pred_f = K.flatten(y_pred)
    intersection = K.sum(y_true_f * y_pred_f)
    return (2. * intersection + 1) / (K.sum(y_true_f) + K.sum(y_pred_f) + 1)
model = tf.keras.models.load_model(r"C:\Users\lahcen\medicalMyPlatform\server\model_3.h5",custom_objects={'dice_coef': dice_coef})

# Define image transformations
def preprocess_image(image_path):
    img2=cv2.imread(image_path,cv2.IMREAD_GRAYSCALE)
    img2=cv2.resize(img2,(256,256))
    image_array=np.array(img2)
    image_array=np.expand_dims(image_array,axis=-1)
    image_array=np.expand_dims(image_array,axis=0)
    return image_array

# Function to perform segmentation
def segment_image(image_path):
    input_image = preprocess_image(image_path)
    
    # Perform inference
    with tf.device('/CPU:0'):  # Use CPU for inference
        text = model.predict(input_image)
        text[text<0.5]=0.0
        text[text>0.5]=1.0

    return text

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python script.py <image_path>")
        sys.exit(1)
        
    image_path = sys.argv[1]  # Get image path from command line
    result = segment_image(image_path)
    print(result)  # Print result as base64 string 
