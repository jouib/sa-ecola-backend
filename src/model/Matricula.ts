import { DataBaseModel } from "./DataBaseModel";

// Recupera conexão com o banco de dados
const database = new DataBaseModel().pool;

/**
 * Classe que representa uma matrícula no sistema
 */
export class Matricula{
    private idMatricula: number = 0; // identificador único da matrícula
    private idAluno: number; // Identificador do aluno que faz o curso
    private idCurso: number; // Identificador do curso do aluno
    private dataMatricula: Date; // Data da Matrícula
    private statusMatricula: string; // Status da matrícula
    

     /**
     * Construtor da classe Matrícula
     * 
     * @param idAluno Identificador do aluno que faz o curso
     * @param idCurso Identificador do curso
     * @param dataMatricula Data da matrícula
     * @param statusMatricula status da matrícula
     */
    public constructor (_idAluno:number, _idCurso:number, _dataMatricula:Date, 
                        _statusMatricula:string) {
        
        this.idAluno          = _idAluno;
        this.idCurso          = _idCurso;
        this.dataMatricula    = _dataMatricula;
        this.statusMatricula  = _statusMatricula;
    }

    // métodos GETTERS and SETTERS
    /**
     * Retorna o id da matrícula
     * @returns id: id matrícula
     */
    public getIdMatricula(): number {
        return this.idMatricula;
    }

    /**
     * Atribui o parâmetro ao atributo idEmprestimo
     * 
     * @param _idMatricuka : idMatricula
     */
    public setIdMatricula(_idMatricuka: number): void {
        this.idMatricula = _idMatricuka;
    }

    /**
     * Retorna o id do aluno
     * @returns id: id aluno
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Atribui o parâmetro ao atributo idAluno
     * 
     * @param _idAluno : idAluno
     */
    public setIdAluno(_idAluno: number): void {
        this.idAluno = _idAluno;
    }

    /**
     * Retorna o id do curso
     * @returns id: id curso
     */
    public getIdCurso(): number {
        return this.idCurso;
    }

    /**
     * Atribui o parâmetro ao atributo idLivro
     * 
     * @param _idCurso : idCurso
     */
    public setIdCurso(_idCurso: number): void {
        this.idCurso = _idCurso;
    }

    /**
     * Retorna a data da matrícula
     * @returns dataMatricula: data da matrícula
     */
    public getDataMatricula(): Date {
        return this.dataMatricula;
    }

    /**
     * Atribui o parâmetro ao atributo dataEmprestimo
     * 
     * @param _dataEmprestimo : data do empréstimo
     */
    public setDataMatricula(_dataMatricula: Date): void {
        this.dataMatricula = _dataMatricula;
    }

    /**
     * Retorna o status da matrícula
     * @returns statusMatricula: status matrícula
     */
    public getStatusMatricula(): string {
        return this.statusMatricula;
    }

    /**
     * Atribui o parâmetro ao atributo dataDevolucao
     * 
     * @param _dataDevolucao : data de devolução
     */
    public setStatusMatricula(_dataMatricula: Date): void {
        this.dataMatricula = _dataMatricula;
    }
    
    // MÉTODO PARA ACESSAR O BANCO DE DADOS
    // CRUD Create - READ - Update - Delete

    /**
     * Retorna uma lista com todos os cursos cadastrados no banco de dados
     * 
     * @returns Lista com todos os cursos cadastrados no banco de dados
     */
    static async listarMatricula(): Promise<Array<any> | null> {
        //Criando lista vazia para armazenar as matrículas
        let listaDeMatricula: Array<any> = [];

        try {
            const querySelectMatricula = `
                SELECT m.id_matricula, m.id_aluno, m.id_curso,
                        m.data_matricula, m.status_matricula,
                        a.cpf, a.nome, a.sobrenome,
                        c.nome_curso, c_quant_semestre, c.area_curso
                        FROM Matricula m
                        JOIN Aluno a ON m.id_aluno = a.id_aluno
                        JOIN Curso c ON m.id_curso = c.id_curso;
                        WHERE m.status_matricula_registro = TRUE;
            `;
            const respostaBD = await database.query(querySelectMatricula);

            if (respostaBD.rows.length === 0) {
                return null;
            }

            respostaBD.rows.forEach((linha:any) => {
                const matricula = {
                    idMatricula: linha.id_matricula,
                    idAluno: linha.id_aluno,
                    idCurso: linha.id_curso,
                    dataMatricula: linha.data_matricula,
                    statusMatricula: linha.status_matricula,
                    aluno: {
                        cpf: linha.cpf,
                        nome: linha.nome,
                        sobrenome: linha.sobrenome,
                    },
                    curso: {
                        nomeCurso: linha.nome_curso,
                        quantSemestre: linha.quant_semestre,
                        areaCurso: linha.area_curso
                    }
                };

                // Adiciona o objeto à lista de empréstimos
                listaDeMatricula.push(matricula);
            });

            return listaDeMatricula;

        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }
}