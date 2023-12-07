import uuid

from flask import request, jsonify
from sqlalchemy import desc

from .models import Info
from ..__init__ import db


def list_all_controller_json(tipo):
    items = Info.query.filter(Info.tipo == tipo).order_by(desc(Info.peso), Info.descricao)
    response = []
    for item in items:
        response.append(item.toDict())

    return jsonify(response)


def list_all_controller_dic(tipo):
    items = Info.query.filter(Info.tipo == tipo)
    response = []
    for item in items:
        response.append(item.toDict())

    return response


def create_item_controller():
    request_form = request.get_json()

    info_id = str(uuid.uuid4())
    new_info = Info(
        id=info_id,
        descricao=request_form['descricao'],
        peso=float(request_form['peso']),
        tipo=request_form['tipo']
    )
    db.session.add(new_info)
    db.session.commit()

    response = Info.query.get(info_id).toDict()
    return jsonify(response)


def update_item_controller():
    request_form = request.get_json()
    info = Info.query.get(request_form['id'])

    info.descricao = request_form['descricao']
    info.peso = float(request_form['peso'])
    info.tipo = float(request_form['tipo'])
    db.session.commit()

    response = Info.query.get(request_form['id']).toDict()
    return jsonify(response)


def retrieve_item_controller(info_id):
    response = Info.query.get(info_id).toDict()
    return jsonify(response)


def delete_item_controller(info_id):
    Info.query.filter_by(id=info_id).delete()
    db.session.commit()
    return jsonify()
