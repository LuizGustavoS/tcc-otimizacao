import pandas
from flask import request

from ..algorithm.controllers import executar_algoritmo, list_all_controller_json, list_all_data_controller_json
from ..app import app


@app.route("/algorithm", methods=['POST'])
def execute_algorithm():
    file = request.files['file']
    data = pandas.read_excel(file)
    return executar_algoritmo(data)


@app.route("/algorithm", methods=['GET'])
def get():
    if request.method == 'GET':
        return list_all_controller_json()


@app.route("/algorithm/<id_result>", methods=['GET'])
def get_data(id_result):
    if request.method == 'GET':
        return list_all_data_controller_json(id_result)
