CREATE TABLE info
(
    id        VARCHAR(36)      NOT NULL PRIMARY KEY,
    descricao VARCHAR(50)      NOT NULL,
    peso      DOUBLE PRECISION NOT NULL,
    tipo      DOUBLE PRECISION NOT NULL
);

CREATE TABLE config
(
    id            INT              NOT NULL PRIMARY KEY,
    num_pop_init  DOUBLE PRECISION NOT NULL,
    num_geracoes  DOUBLE PRECISION NOT NULL,
    orcamento_mes DECIMAL          NOT NULL
);

CREATE TABLE result
(
    id              VARCHAR(36)  NOT NULL PRIMARY KEY,
    data            VARCHAR(50) NOT NULL
);

CREATE TABLE data   
(
    id                     VARCHAR(36) NOT NULL PRIMARY KEY,
    ordem                  VARCHAR(50),
    data                   VARCHAR(8),
    equipamento            VARCHAR(50),
    prioridade_equipamento DECIMAL,
    tam                    VARCHAR(50),
    prioridade_tam         DECIMAL,
    pom                    VARCHAR(50),
    prioridade_ordem       DECIMAL,
    valor                  DECIMAL,
    priorizado             VARCHAR(50),
    id_result              VARCHAR(36) NOT NULL REFERENCES result(id)
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
VALUES (1, 10, 100, 700000);