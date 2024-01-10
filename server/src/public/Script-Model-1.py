import sys
import tensorflow as tf
from PIL import Image
import io
import base64
import cv2
import os
import numpy as np
from tensorflow.keras import backend as K  # Import K from tensorflow.keras

# Load your TensorFlow model (adjust path as necessary)
def dice_coef(y_true, y_pred):
    y_true_f = K.flatten(y_true)
    y_pred_f = K.flatten(y_pred)
    intersection = K.sum(y_true_f * y_pred_f)
    return (2. * intersection + 1) / (K.sum(y_true_f) + K.sum(y_pred_f) + 1)

model = tf.keras.models.load_model(r"C:\Users\lahcen\medicalMyPlatform\server\model2.h5", custom_objects={'dice_coef': dice_coef})

# Define image transformations
def preprocess_image(image_path):
    img2 = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    img2 = cv2.resize(img2, (256, 256))
    image_array = np.array(img2)
    image_array=image_array/255
    image_array = np.expand_dims(image_array, axis=-1)
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

# Function to perform segmentation and save the result
def segment_image(image_path):
    save_path = r"C:\Users\lahcen\medicalMyPlatform\server\uploads2\segmented_image.JPEG"  # Fixed save path

    input_image = preprocess_image(image_path)

    # Perform inference
    with tf.device('/CPU:0'):  # Use CPU for inference
        segmented_image = model.predict(input_image)
        segmented_image[segmented_image > 0.5] = 1.0
        segmented_image[segmented_image < 0.5] = 0.0

    # Convert to PIL Image
    # output_image = Image.fromarray(np.squeeze(segmented_image[0], axis=-1).astype('uint8'))
    print(input_image.shape)
    print(segmented_image.shape)

    segmented_image_2d = np.squeeze(segmented_image, axis=(0, -1))  # Fix the axis for squeezing
    segmented_image_2d = Image.fromarray((segmented_image_2d* 255).astype('uint8'), mode='L')
    segmented_image_2d.save(save_path, format="JPEG")

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python script.py <image_path>")
        sys.exit(1)

    image_path = sys.argv[1]  # Get image path from command line
    segment_image(image_path)


