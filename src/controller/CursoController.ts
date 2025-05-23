import { Curso } from "../model/Curso";
import { Request, Response} from "express";


/**
 * Interface CursoDTO
 * Define os atributos que devem ser recebidos do cliente nas requisições
 */
interface CursoDTO {
    nomeCurso: string;
    quantSemestre: number;
    areaCurso: string;
}

/**
 * Controlador para operações realacionadas ao curso.
 */
class CursoController extends Curso {
    /**
     * lista todos os cursos.
     * @param req 
     * @param res
     * @returns lista de alunos em formato JSON.
     */
    static async todos(req: Request, res: Response) {
        try {
            const listaDeCursos = await Curso.listarCursos();
            res.status(200).json(listaDeCursos);
            
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);

            res.status(400).json("Erro ao recuperar as informações do curso");
        }
    }
}
export default CursoController;


