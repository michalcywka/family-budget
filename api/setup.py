"""
REST API for family budget
"""
import pathlib
import connexion
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

DB_NAME = 'budget'
DB_USER = 'admin'
DB_PASS = 'admin'
DB_HOST = 'localhost'
DB_PORT = '5432'

workdir = pathlib.Path(__file__).parent.resolve()
conn_app = connexion.App(__name__, specification_dir=workdir)

flask_app = conn_app.app
flask_app.config["SQLALCHEMY_DATABASE_URI"] = f'postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}'


db = SQLAlchemy(flask_app)
ma = Marshmallow(flask_app)


@flask_app.after_request 
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin','*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE')
    return response