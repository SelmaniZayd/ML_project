# imports
import tensorflow as tf
physical_devices = tf.config.list_physical_devices('GPU')
tf.config.experimental.set_memory_growth(physical_devices[0], True)
from flask import Flask, request
from flask_restful import Resource, Api
from joblib import load
from flask_restful import reqparse
from flask_cors import CORS
from keras.applications.vgg16 import preprocess_input
from keras.preprocessing.image import load_img, img_to_array
import PIL
from PIL import Image
import numpy as np
from keras.applications import ResNet50
from keras.applications.resnet50 import decode_predictions

my_model = ResNet50()

# App init
app = Flask(__name__)
api = Api(app)
CORS(app)

# Loading the Machine learning trained models
rf = load('ml_models/rf.pk1')
dt = load('ml_models/dt.pk1')
svc = load('ml_models/svc.pk1')

# Columns of dataset to make prediction
columns = ['city', 'city_development_index', 'gender','relevent_experience', 'enrolled_university', 'education_level','major_discipline', 'experience', 'company_size', 'company_type','last_new_job', 'training_hours']

# Parsing the expected keys from the request's body
parser = reqparse.RequestParser()
for col in columns:
    parser.add_argument(col)

deep_parser = reqparse.RequestParser()
deep_parser.add_argument("image")

# Controllers
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}
    def post(self):
        # Gettting body parameters
        args = parser.parse_args()
        array = json_to_array(args)
        
        # Making predictions
        rf_res = rf.predict(array)
        dt_res = dt.predict(array)
        svc_res = svc.predict(array)
        
        # Sending Response
        return {"RF": int(rf_res[0]), "DT": int(dt_res[0]), "SVC": int(svc_res[0])}

class DeepPredict(Resource):
    def get(self):
        return {'hello': 'deep'}
    def post(self):
        args = deep_parser.parse_args()
        file = request.files['image']
        img = Image.open(file.stream).resize((224,224))

        imaa = np.array([img_to_array(img)])
        output = preprocess_input(imaa)
        
        preds = my_model.predict(output)
        most_likely_labels = decode_predictions(preds, top=3)[0]

        # Sending Response
        return {
            str(most_likely_labels[0][1]): str(most_likely_labels[0][2]), 
            str(most_likely_labels[1][1]): str(most_likely_labels[1][2]), 
            str(most_likely_labels[2][1]): str(most_likely_labels[2][2])
        }


# Routes
api.add_resource(HelloWorld, '/')
api.add_resource(DeepPredict, '/deep')


# Helper functions
def json_to_array(args):
    array = []
    for col in columns:
        array.append(int(args[col]))
    return [array]

if __name__ == '__main__':
    app.run(debug=True)