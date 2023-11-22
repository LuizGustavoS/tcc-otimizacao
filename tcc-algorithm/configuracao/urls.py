from flask import request

from ..app import app
from ..configuracao.controllers import update_config_controller, retrieve_config_controller_json


@app.route("/config", methods=['PUT'])
def list_create_config():
    if request.method == 'PUT':
        return update_config_controller()


@app.route("/config", methods=['GET'])
def retrieve_config():
    if request.method == 'GET':
        return retrieve_config_controller_json()
