import { DataBaseModel } from "./DataBaseModel";

// Recupera conexão com o banco de dados
const database = new DataBaseModel().pool;

/**
 * Classe que representa um curso no sistema
 */
export class Curso {
    private idCurso: number = 0; // Identificador único do aluno
    private nomeCurso: string = ''; // nome do curso
    private quantSemestre: number; // Quantidade de Semestres
    private areaCurso: string; // Área do curso
   
    /**
     * Construtor da classe Aluno
     * 
     * @param nomeDoCurso Nome do curso
     * @param quantSemestre Quantidade de Semestre
     * @param areaCurso Área do curso
     */
    public constructor (_nomeCurso: string, _quantSemestre:number, _areaCurso:string){
        this.nomeCurso      = _nomeCurso
        this.quantSemestre  = _quantSemestre;
        this.areaCurso      = _areaCurso;
    }

    //métodos GETTERS and SETTERS
    /**
     * Retorna o id do aluno
     * @returns id: id aluno
     */
    public getIdCurso(): number{
        return this.idCurso;
    }

    /**
     * Atribui o parâmetro ao atributo idCurso
     * 
     * @param _idCurso : idCurso
     */
    public setIdCurso(_idCurso: number): void{
        this.idCurso = _idCurso;
    }

    /**
     * Retorna o id do aluno
     * @returns id: id aluno
     */
    public getNomeCurso(): string{
        return this.nomeCurso;
    }

    /**
     * Atribui o parâmetro ao atributo nomeCurso
     * 
     * @param _nomeCurso : nomeCurso
     */
    public setNomeCurso(_nomeCurso: string): void{
        this.nomeCurso = _nomeCurso;
    }

    /*
    /**
     * Retorna a quantidade de semestres
     * @returns quantidade de semestre
     */
    public getQuantSemestre(): number {
        return this.quantSemestre;
    }

    /**
     * Atribui o parâmetro ao atributo quantidade de semestres
     * 
     * @param _quantSemestre : quantidade de semestres
     */
    public setQuantSemestre(_quantSemestre: number): void{
        this.quantSemestre = _quantSemestre
    }
    

    /**
     * Retorna a área do curso
     * @returns AreaCurso: areaCurso
     */
    public getAreaCurso() {  
        return this.areaCurso;
    }

    /**
     * Atribui o parâmetro ao atributo nome
     * 
     * @param _areaCurso : área do curso
     */
    public setNome(_areaCurso: string){  
        this.areaCurso = _areaCurso;
    }

    // MÉTODO PARA ACESSAR O BANCO DE DADOS
    // CRUD Create - READ - Update - Delete

    /**
     * Retorna uma lista com todos os cursos cadastrados no banco de dados
     * 
     * @returns Lista com todos os cursos cadastrados no banco de dados
     */
    static async listarCursos(): Promise<Array<Curso> | null> {
        // Criando lista vazia para armazenar os cursos
        let listaDeCurso: Array<Curso> = [];

        try {
            // Query para consulta no banco de dados
            const querySelectCurso = `SELECT * FROM Curso WHERE status_curso = true;`;

            // executa a query no banco de dados
            const respostaBD = await database.query(querySelectCurso);    

            // percorre cada resultado retornado pelo banco de dados
            // curso é o apelido que demos para cada linha retornada do banco de dados
            respostaBD.rows.forEach((curso: any) => {
                
                // criando objeto curso
                let novoCurso = new Curso(
                    curso.nomeCurso,
                    curso.quantSemestre,
                    curso.areaCurso,
                );
                // adicionando o ID ao objeto
                novoCurso.setIdCurso(curso.id_curso);

                // adicionando a pessoa na lista
                listaDeCurso.push(novoCurso);
            });

            // retornado a lista de pessoas para quem chamou a função
            return listaDeCurso;
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }

    /**
     * Cadastra um novo curso no banco de dados
     * @param curso Objeto Curso contendo as informações a serem cadastradas
     * @returns Boolean indicando se o cadastro foi bem-sucedido
     */
    static async cadastrarCurso(curso: Curso): Promise<Boolean> {      
        try {
            // Cria a consulta (query) para inserir o registro de um curso no banco de dados, retorna o ID do curso que foi criado no final
            const queryInsertCurso = `
                INSERT INTO Curso (nome_curso, quant_semestre, area_curso)
                VALUES (
                    '${curso.nomeCurso}',
                    '${curso.quantSemestre}',
                    '${curso.areaCurso}',
                )
                RETURNING id_curso;`;

            // Executa a query no banco de dados e armazena o resultado
            const result = await database.query(queryInsertCurso);

            // verifica se a quantidade de linhas que foram alteradas é maior que 0
            if (result.rows.length > 0) {
                // Exibe a mensagem de sucesso
                console.log(`Curso cadastrado com sucesso. ID: ${result.rows[0].id_curso}`);
                // retorna verdadeiro
                return true;
            }

            // caso a consulta não tenha tido sucesso, retorna falso
            return false;
        // captura erro
        } catch (error) {
            // Exibe mensagem com detalhes do erro no console
            console.error(`Erro ao cadastrar curso: ${error}`);
            // retorna falso
            return false;
        }
    }

    /**
     * Remove um curso do banco de dados
     * @param idCurso ID do curso a ser removido
     * @returns Boolean indicando se a remoção foi bem-sucedida
    */
    static async removerCurso(id_curso: number): Promise<Boolean> {
        // variável para controle de resultado da consulta (query)
        let queryResult = false;
    
        try {
            // Cria a consulta (query) para remover o curso
           

            // Construção da query SQL para deletar o curso.
            const queryDeleteCurso = `UPDATE Curso   
                                        SET status_curso = FALSE
                                        WHERE id_cursp=${id_curso};`;
    
            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteCurso)
            .then((result) => {
                if (result.rowCount != 0) {
                    queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                }
            });
    
            // retorna o resultado da query
            return queryResult;

        // captura qualquer erro que aconteça
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            // retorna false
            return queryResult;
        }
    }


     /**
     * Atualiza os dados de um curso no banco de dados.
     * @param curso Objeto do tipo Curso com os novos dados
     * @returns true caso sucesso, false caso erro
     */
    static async atualizarCadastroCurso(curso: Curso): Promise<Boolean> {
        let queryResult = false; // Variável para armazenar o resultado da operação.
        try {
            // Construção da query SQL para atualizar os dados do curso no banco de dados.
            const queryAtualizarCurso = `UPDATE Curso SET 
                                            nome_curso = '${curso.getNomeCurso()}'
                                            quant_semestre = '${curso.getQuantSemestre()}', 
                                            area_curso = '${curso.getAreaCurso().toUpperCase()}',                                          
                                        WHERE id_curso = ${curso.idCurso}`;

            // Executa a query de atualização e verifica se a operação foi bem-sucedida.
            await database.query(queryAtualizarCurso)
            .then((result) => {
                if (result.rowCount != 0) {
                    queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                }
            });

            // Retorna o resultado da operação para quem chamou a função.
            return queryResult;
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }
}