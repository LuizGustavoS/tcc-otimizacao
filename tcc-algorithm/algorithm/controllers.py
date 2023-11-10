import array
import random

import numpy
from deap import algorithms
from deap import base
from deap import creator
from deap import tools

from ..info.controllers import list_all_controller_dic
from .utils import load_data_xlsx, find_indices

num_pop_init = 10
num_geracoes = 100
orcamento_mes = 1000000


def executar_algoritmo(ws_base):

    random.seed(64)

    list_criticidade = list_all_controller_dic(0)
    list_atividade = list_all_controller_dic(1)
    list_prioridade = list_all_controller_dic(2)

    global list_data
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

    print('Melhor individuo', hof.keys[0])
    for index, j in enumerate(hof.items[0]):
        if j == 1:
            list_data[index].priorizado = "Priorizado"

    return list_data


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
