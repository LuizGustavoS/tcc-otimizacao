import numpy

from .models import Data


def load_data_xlsx(ws_base, list_criticidade, list_atividade, list_prioridade):
    list_infos = []
    list_dados = numpy.asarray(ws_base)

    for dados in list_dados:
        ordem = dados[0]
        data = dados[1]
        criticicade = dados[2]
        atividade = dados[3]
        prioridade = dados[4]
        valor = dados[5]

        peso_criticidade = load_peso(list_criticidade, criticicade)
        peso_atividade = load_peso(list_atividade, atividade)
        peso_prioridade = load_peso(list_prioridade, prioridade)

        list_infos.append(Data(
            int(ordem),
            data.strftime("%x"),
            peso_criticidade['descricao'],
            peso_criticidade['peso'],
            peso_atividade['descricao'],
            peso_atividade['peso'],
            peso_prioridade['descricao'],
            peso_prioridade['peso'],
            valor,
            id
        ))

    return list_infos


def load_peso(c_params, prio):
    for param in c_params:
        if param['descricao'] == prio:
            return param


def find_indices(list_to_check, item_to_find):
    array = numpy.array(list_to_check)
    indices = numpy.where(array == item_to_find)[0]
    return list(indices)
