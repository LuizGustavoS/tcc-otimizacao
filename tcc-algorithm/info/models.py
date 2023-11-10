from sqlalchemy import inspect

from ..__init__ import db  # from __init__.py


class Info(db.Model):

    id = db.Column(db.String(50), primary_key=True, nullable=False, unique=True)
    descricao = db.Column(db.String(50), nullable=False)
    peso = db.Column(db.Float, nullable=False, default=0.00)
    tipo = db.Column(db.Float, nullable= False)

    # How to serialize SqlAlchemy PostgreSQL Query to JSON => https://stackoverflow.com/a/46180522
    def toDict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
