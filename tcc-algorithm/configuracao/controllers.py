from flask import request, jsonify

from .models import Config
from ..__init__ import db


def update_config_controller():
    request_form = request.get_json()
    config = Config.query.get(1)

    config.num_pop_init = float(request_form['num_pop_init'])
    config.num_geracoes = float(request_form['num_geracoes'])
    config.orcamento_mes = float(request_form['orcamento_mes'])
    db.session.commit()

    response = Config.query.get(1).toDict()
    return jsonify(response)


def retrieve_config_controller_json():
    response = Config.query.get(1).toDict()
    return jsonify(response)


def retrieve_config_controller_dic():
    return Config.query.get(1).toDict()
