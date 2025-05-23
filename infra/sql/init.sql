CREATE TABLE Aluno (
    id_aluno SERIAL PRIMARY KEY,
	cpf VARCHAR (11	) NOT NULL,
    nome VARCHAR (50) NOT NULL,
    sobrenome VARCHAR (100) NOT NULL,
	data_nascimento DATE NOT NULL,
	telefone VARCHAR (15) NOT NULL,
    endereco VARCHAR (225) NOT NULL,
    email VARCHAR (80)
);

CREATE TABLE Curso (
    id_curso SERIAL PRIMARY KEY,
	nome_curso VARCHAR (100) NOT NULL,
	quant_semestre INT NOT NULL,
	area_curso VARCHAR (50) NOT NULL
);

CREATE TABLE Matricula (
    id_matricula SERIAL PRIMARY KEY,
	id_aluno INT REFERENCES Aluno(id_aluno),
	id_curso INT REFERENCES Curso(id_curso),
	data_matricula DATE NOT NULL,
	status_matricula VARCHAR (20) NOT NULL
);

-- Inserções na tabela Aluno
INSERT INTO Aluno (cpf, nome, sobrenome, data_nascimento, telefone, endereco, email) 
VALUES 
('50183622218','Marcelo', 'McGregor', '2005-01-15', '16998959876', 'Rua UFC, 123', 'mcgregor@ufc.com'),
('50183977218', 'Amanda', 'Nunes', '2004-03-22', '16995992305', 'Rua UFC, 456', 'amanda.nunes@ufc.com'),
('60183622218', 'Angelina', 'Jolie', '2003-07-10','16991915502', 'Rua Hollywood, 789', 'jolie@cinema.com');



-- Inserções na tabela Curso

INSERT INTO Curso (nome_curso, quant_semestre, area_curso) 
VALUES 
('Desenvolvimento de Sistemas',4, 'tecnologia'),
('Inglês Básico',4, 'idiomas'),
('Soft Skills',8, 'desenvolvimento pessoal');



-- Inserções na tabela Matrícula

INSERT INTO Matricula (id_aluno, id_curso, data_matricula, status_matricula) 
VALUES 
(1, 2, '18-02-2002', 'Ativa'),
(2, 1, '02-12-2024', 'Cancelada'),
(3, 3, '03-07-2025', 'Concluída');

-- Adicionando colunas de status no banco
ALTER TABLE Aluno ADD COLUMN status_aluno BOOLEAN DEFAULT TRUE; 
ALTER TABLE Curso ADD COLUMN status_curso BOOLEAN DEFAULT TRUE;