import { Matricula } from "../model/Matricula";
import { Request, Response } from "express";

/**
 * Interface MatriculaDTO
 * Define os atributos que devem ser recebidos do cliente nas requisições
 */
interface MatriculaDTO {
    idAluno: number;
    idCurso: number;
    dataMatricula: Date;
    statusMatricula: string;
}

/**
 * Controlador para operações realacionadas ao curso.
 */
class MatriculaController extends Matricula{
    /**
     * Listar todas as matrículas.
     * @param req
     * @param res
     * @return lista de matrículas
     */
    static async todos(req: Request, res: Response) {
        try {
            const listaDeMatriculas = await Matricula.listarMatricula();
           res.status(200).json(listaDeMatriculas);

        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);

            res.status(400).json("Erro ao recuperar as informações do curso");
        }
    }
}

export default MatriculaController;