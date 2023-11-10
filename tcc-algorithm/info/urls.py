from flask import request

from ..info.controllers import create_item_controller, retrieve_item_controller, update_item_controller, \
    delete_item_controller, list_all_controller_json
from ..app import app


@app.route("/info", methods=['POST', 'PUT'])
def list_create_items():
    if request.method == 'POST':
        return create_item_controller()
    if request.method == 'PUT':
        return update_item_controller()


@app.route("/info/<item_id>", methods=['GET', 'DELETE'])
def retrieve_update_destroy_item(item_id):
    if request.method == 'GET':
        return retrieve_item_controller(item_id)
    if request.method == 'DELETE':
        return delete_item_controller(item_id)


@app.route("/info/tipo/<tipo_id>", methods=['GET'])
def retrieve_info_tipo(tipo_id):
    if request.method == 'GET':
        return list_all_controller_json(tipo_id)
