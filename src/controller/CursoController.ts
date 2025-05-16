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
export default CursoController;


