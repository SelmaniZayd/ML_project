# imports
from flask import Flask
from flask_restful import Resource, Api
from joblib import load
from flask_restful import reqparse

# App init
app = Flask(__name__)
api = Api(app)

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

# Routes
api.add_resource(HelloWorld, '/')


# Helper functions
def json_to_array(args):
    array = []
    for col in columns:
        array.append(int(args[col]))
    return [array]

if __name__ == '__main__':
    app.run(debug=True)