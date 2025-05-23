import { DataBaseModel } from "./DataBaseModel";

// Recupera conexão com o banco de dados
const database = new DataBaseModel().pool;

/**
 * Classe que representa um curso no sistema
 */
export class Curso {
    private idCurso: number = 0; // Identificador único do curso
    private nomeCurso: string; // nome do curso
    private quantSemestre: number; // Quantidade de Semestres
    private areaCurso: string; // Área do curso
   
    /**
     * Construtor da classe Aluno
     * 
     * @param nomeCurso Nome do curso
     * @param quantSemestre Quantidade de Semestres
     * @param areaCurso Área do curso
     */
    public constructor (_nomeCurso: string, _quantSemestre:number, _areaCurso:string){
        this.nomeCurso      = _nomeCurso;
        this.quantSemestre  = _quantSemestre;
        this.areaCurso      = _areaCurso;
    }

    // Métodos GETTERS e SETTERS
    /**
     * Retorna o id do curso
     * @returns id: id curso
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
     * Atribui o parâmetro ao atributo área do curso
     * 
     * @param _areaCurso : área do curso
     */
    public setAreaCurso(_areaCurso: string){  
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
        let listaDeCursos: Array<Curso> = [];

        try {
            const querySelectCurso = `SELECT * FROM Curso;`;
            const respostaBD = await database.query(querySelectCurso);    

            // percorre cada resultado retornado pelo banco de dados
            // curso é o apelido que demos para cada linha retornada do banco de dados
            respostaBD.rows.forEach((curso: any) => {
                
                // criando objeto curso
                let novoCurso = new Curso(
                    curso.nomeCurso,
                    curso.quantSemestre,
                    curso.areaCurso
                );
                // adicionando o ID ao objeto
                novoCurso.setIdCurso(curso.id_curso);
                novoCurso.setQuantSemestre(curso.quant_semestre);
                novoCurso.setAreaCurso(curso.area_curso)

                // adicionando a pessoa na lista
                listaDeCursos.push(novoCurso);
            });

            // retornado a lista de pessoas para quem chamou a função
            return listaDeCursos;
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }
}