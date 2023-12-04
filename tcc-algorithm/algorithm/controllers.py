import array
import datetime
import random
import uuid
from cgitb import text

import numpy
from deap import algorithms
from deap import base
from deap import creator
from deap import tools
from flask import jsonify
from sqlalchemy import desc

from .models import Result, Data
from .utils import load_data_xlsx, find_indices
from ..__init__ import db
from ..configuracao.controllers import retrieve_config_controller_dic
from ..info.controllers import list_all_controller_dic


def executar_algoritmo(ws_base):
    random.seed(64)
    global list_data, orcamento_mes

    configuracao = retrieve_config_controller_dic()
    num_pop_init = configuracao['num_pop_init']
    num_geracoes = configuracao['num_geracoes']
    orcamento_mes = configuracao['orcamento_mes']

    list_criticidade = list_all_controller_dic(0)
    list_atividade = list_all_controller_dic(1)
    list_prioridade = list_all_controller_dic(2)

    list_data = load_data_xlsx(ws_base, list_criticidade, list_atividade, list_prioridade)

    creator.create("FitnessMax", base.Fitness, weights=(1.0,))
    creator.create("Individual", array.array, typecode='b', fitness=creator.FitnessMax)

    toolbox = create_toolbox()
    pop = toolbox.population(n=int(num_pop_init))
    hof = tools.HallOfFame(1)

    stats = tools.Statistics(lambda ind: ind.fitness.values)
    stats.register("avg", numpy.mean)
    stats.register("std", numpy.std)
    stats.register("min", numpy.min)
    stats.register("max", numpy.max)

    pop, log = algorithms.eaSimple(
        pop,
        toolbox,
        cxpb=0.8,
        mutpb=0.2,
        ngen=int(num_geracoes),
        stats=stats,
        halloffame=hof,
        verbose=True
    )

    result = create_result()
    for index, j in enumerate(hof.items[0]):

        data = list_data[index]
        data.id = str(uuid.uuid4())
        data.id_result = result.id

        if j == 1:
            data.priorizado = "Priorizado"

        db.session.add(data)

    db.session.commit()
    return list_all_data_controller_json(result.id)


def list_all_controller_json():
    items = Result.query.filter().order_by(desc(Result.data))
    response = []
    for item in items:
        response.append(item.toDict())

    return jsonify(response)


def list_all_data_controller_json(id_result):
    data = Data.query.filter(Data.id_result == id_result).order_by(Data.priorizado, desc(Data.valor))
    response = []
    for item in data:
        response.append(item.toDict())

    return jsonify(response)


# ----------


def create_result():
    result_id = str(uuid.uuid4())
    new_result = Result(
        id=result_id,
        data=datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f")
    )

    db.session.add(new_result)
    db.session.commit()
    return new_result


def create_toolbox():
    toolbox = base.Toolbox()
    toolbox.register("attr_bool", random.randint, 0, 0)
    toolbox.register("individual", tools.initRepeat, creator.Individual, toolbox.attr_bool, len(list_data))
    toolbox.register("population", tools.initRepeat, list, toolbox.individual)
    toolbox.register("evaluate", eval_one_max)
    toolbox.register("mate", tools.cxTwoPoint)
    toolbox.register("mutate", tools.mutFlipBit, indpb=0.05)
    toolbox.register("select", tools.selTournament, tournsize=3)
    return toolbox


def eval_one_max(individual):
    fitness_v = 0
    orcamento = 0
    list_of_orders = find_indices(individual, 1)

    for index_order in list_of_orders:
        p_e = list_data[index_order].prioridade_equipamento
        p_t = list_data[index_order].prioridade_tam
        p_o = list_data[index_order].prioridade_ordem
        valor = list_data[index_order].valor

        orcamento += valor
        fitness_v += ((p_o + p_t + p_e) / valor)
        if orcamento > orcamento_mes:
            fitness_v = fitness_v - (fitness_v * 0.50)

    return fitness_v,
