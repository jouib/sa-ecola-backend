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
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            const listaDeMatriculas = await Matricula.listarMatricula();
           res.status(200).json(listaDeMatriculas);

        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);

            res.status(400).json("Erro ao recuperar as informações do curso");
        }
    }

     /**
     * Cadastra uma nova matrícula.
     * 
     * @param req Objeto de requisição HTTP com os dados da matrícula.
     * @param res Objeto de resposta HTTP.
     * @return Mensagem de sucesso ou erro em formato JSON.
     */
     static async novo(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: MatriculaDTO = req.body;

            // Verifica se todos os campos obrigatórios foram fornecidos
            if (!dadosRecebidos.idAluno || !dadosRecebidos.idCurso || !dadosRecebidos.dataMatricula || !dadosRecebidos.statusMatricula) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            // Chama o serviço para cadastrar a matrícula
            const novoIdMatricula = await Matricula.cadastrarMatricula(
                dadosRecebidos.idAluno, dadosRecebidos.idCurso, new Date(dadosRecebidos.dataMatricula), dadosRecebidos.statusMatricula
            );

            // Retorna a resposta de sucesso com o ID da nova matrícula
            return res.status(201).json({ message: 'Matrícula cadastrada com sucesso', IdMatricula: novoIdMatricula });

        } catch (error) {
            console.error('Erro ao cadastrar a matrícula:', error);
            return res.status(500).json({ message: 'Erro ao cadastrar a matrícula.' });
        }
    }
}

export default MatriculaController;