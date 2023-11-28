create table info
(
    id        varchar(50)      not null primary key,
    descricao varchar(50)      not null,
    peso      double precision not null,
    tipo      double precision not null
);

create table config
(
    id            int not null primary key,
    num_pop_init  double precision not null,
    num_geracoes  double precision not null,
    orcamento_mes decimal not null
);

CREATE TABLE result
(
    id              varchar(50) not null primary key,
    data            varchar(50) not null
);

CREATE TABLE data
(
    id                     varchar(50) not null primary key,
    ordem                  varchar(50),
    data                   varchar(50),
    equipamento            varchar(50),
    prioridade_equipamento decimal,
    tam                    varchar(50),
    prioridade_tam         decimal,
    pom                    varchar(50),
    prioridade_ordem       decimal,
    valor                  decimal,
    id_result              varchar(50) references result(id)
);

INSERT INTO info(id, descricao, tipo, peso)
VALUES (gen_random_uuid(), 'A', 0, 15),
       (gen_random_uuid(), 'B', 0, 10),
       (gen_random_uuid(), 'C', 0, 5),
       (gen_random_uuid(), 'D', 0, 2);

INSERT INTO info(id, descricao, tipo, peso)
VALUES (gen_random_uuid(), 'PR', 1, 7),
       (gen_random_uuid(), 'MR', 1, 10),
       (gen_random_uuid(), 'IR', 1, 15),
       (gen_random_uuid(), 'CP', 1, 10),
       (gen_random_uuid(), 'AD', 1, 20),
       (gen_random_uuid(), 'PD', 1, 12),
       (gen_random_uuid(), 'GM', 1, 10),
       (gen_random_uuid(), 'MP', 1, 2),
       (gen_random_uuid(), 'NP', 1, 20),
       (gen_random_uuid(), 'OC', 1, 5),
       (gen_random_uuid(), 'EM', 1, 25),
       (gen_random_uuid(), 'MS', 1, 20),
       (gen_random_uuid(), 'SG', 1, 20),
       (gen_random_uuid(), 'MA', 1, 9),
       (gen_random_uuid(), 'IP', 1, 12),
       (gen_random_uuid(), 'LU', 1, 18),
       (gen_random_uuid(), 'MV', 1, 7),
       (gen_random_uuid(), 'CI', 1, 3),
       (gen_random_uuid(), 'RC', 1, 3),
       (gen_random_uuid(), 'OP', 1, 9),
       (gen_random_uuid(), 'RV', 1, 7),
       (gen_random_uuid(), 'TR', 1, 1),
       (gen_random_uuid(), 'IS', 1, 20);

INSERT INTO info(id, descricao, tipo, peso)
VALUES (gen_random_uuid(), 'Emergência',   2, 10),
       (gen_random_uuid(), 'Urgência',     2, 5),
       (gen_random_uuid(), 'Importante',   2, 2),
       (gen_random_uuid(), 'Normal',       2, 1),
       (gen_random_uuid(), 'Data Marcada', 2, 0);

INSERT INTO config(id, num_pop_init, num_geracoes, orcamento_mes)
VALUES (1, 10, 100, 1000000);