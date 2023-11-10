import json

import pandas
from flask import request, make_response

from ..algorithm.controllers import executar_algoritmo
from ..app import app


@app.route("/algorithm", methods=['POST'])
def execute_algorithm():
    file = request.files['file']
    data = pandas.read_excel(file)

    result = executar_algoritmo(data)

    to_json = []
    for i in result:
        item = i.__dict__
        item.pop('id')
        to_json.append(item)

    return make_response(json.dumps(to_json))
