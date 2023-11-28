import json

from sqlalchemy import inspect

from ..__init__ import db  # from __init__.py


class Result(db.Model):

    id = db.Column(db.String(50), primary_key=True, nullable=False, unique=True)
    data = db.Column(db.String(50))

    def toDict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}


class Data(db.Model):

    id = db.Column(db.String(50), primary_key=True, nullable=False, unique=True)
    ordem = db.Column(db.String(50))
    data = db.Column(db.String(50))
    equipamento = db.Column(db.String(50))
    prioridade_equipamento = db.Column(db.Float)
    tam = db.Column(db.String(50))
    prioridade_tam = db.Column(db.Float)
    pom = db.Column(db.String(50))
    prioridade_ordem = db.Column(db.Float)
    valor = db.Column(db.Float)
    id_result = db.Column(db.String(50))

    def __init__(self, ordem, data, equipamento, prioridade_equipamento,
                 tam, prioridade_tam, pom, prioridade_ordem, valor, id):
        self.ordem = ordem
        self.data = data
        self.equipamento = equipamento
        self.prioridade_equipamento = prioridade_equipamento
        self.tam = tam
        self.prioridade_tam = prioridade_tam
        self.pom = pom
        self.prioridade_ordem = prioridade_ordem
        self.valor = valor
        self.id = id

    def toDict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__)