from sqlalchemy import inspect

from ..__init__ import db  # from __init__.py


class Config(db.Model):

    id = db.Column(db.Float, primary_key=True, nullable=False, unique=True)
    num_pop_init = db.Column(db.Float, nullable=False)
    num_geracoes = db.Column(db.Float, nullable=False)
    orcamento_mes = db.Column(db.Float, nullable=False)

    # How to serialize SqlAlchemy PostgreSQL Query to JSON => https://stackoverflow.com/a/46180522
    def toDict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
