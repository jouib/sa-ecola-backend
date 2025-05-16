import { Matricula } from "../model/Matricula";
import { Request,Response } from "express";

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

class MatriculaController extends Matricula{
    /**
     * Método para listar todas as matrículas.
     * Retorna um array de matrículas com informações dos alunos e dos cursos.
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarEmprestimos do service
            const listaDeMatriculas = await Matricula.listarMatricula();
            
            // Verifica se houve retorno de dados
            if (!listaDeMatriculas|| listaDeMatriculas.length === 0) {
                return res.status(404).json({ message: 'Nenhuma matrícula encontrada.' });
            }

            // Retorna a lista de matrículas com status 200 (OK)
            return res.status(200).json(listaDeMatriculas);
        } catch (error) {
            // Em caso de erro, retorna o erro com status 500 (erro do servidor)
            console.error('Erro ao listar mastrículas:', error);
            return res.status(500).json({ message: 'Erro ao listar as matrículas.' });
        }
    }
}

export default MatriculaController;