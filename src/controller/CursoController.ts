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

    /**
     * Cadastra um novo curso.
     * @param req Objeto de requisição HTTP com os dados do aluno.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static async cadastrar(req: Request, res: Response) {
        try {
            const dadosRecebidos: CursoDTO = req.body;

            const novoCurso = new Curso(
                dadosRecebidos.nomeCurso,
                dadosRecebidos.quantSemestre,
                dadosRecebidos.areaCurso
            );

            // Chama o método para persistir o aluno no banco de dados
            const result = await Curso.cadastrarCurso(novoCurso);

            // Verifica se a query foi executada com sucesso
            if (result) {
                return res.status(200).json(`Curso cadastrado com sucesso`);
            } else {
                return res.status(400).json('Não foi possível cadastrar o curso no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o curso: ${error}`);
            return res.status(400).json('Erro ao cadastrar o curso')
        }
    }
}
export default CursoController;


