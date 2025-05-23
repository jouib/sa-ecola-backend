import { Aluno } from "../model/Aluno";
import { Request, Response } from "express";

/**
 * Interface AlunoDTO
 * Define os atributos que devem ser recebidos do cliente nas requisições
 */
interface AlunoDTO {
    cpf: string;
    nome: string;
    sobrenome: string;
    dataNascimento?: Date;
    telefone: string;
    endereco?: string;
    email?: string;
}

/**
 * Controlador para operações relacionadas aos alunos.
 */
class AlunoController extends Aluno {

    /**
     * Lista todos os alunos.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de alunos em formato JSON.
     */
    static async todos(req: Request, res: Response) {
        try {
            const listaDeAlunos = await Aluno.listarAlunos();

            res.status(200).json(listaDeAlunos);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);

            res.status(400).json("Erro ao recuperar as informações do Aluno");
        }
    }

    /**
     * Cadastra um novo aluno.
     * @param req Objeto de requisição HTTP com os dados do aluno.
     * @param res Objeto de resposta HTTP.
     * @return Mensagem de sucesso ou erro em formato JSON.
     */
    static async cadastrar(req: Request, res: Response) {
        try {
            const dadosRecebidos: AlunoDTO = req.body;

            const novoAluno = new Aluno(
                dadosRecebidos.cpf,
                dadosRecebidos.nome,
                dadosRecebidos.sobrenome,
                dadosRecebidos.dataNascimento ?? new Date("1900-01-01"),
                dadosRecebidos.telefone,
                dadosRecebidos.endereco ?? '',
                dadosRecebidos.email ?? ''
            );

            const result = await Aluno.cadastrarAluno(novoAluno);
            
            if (result) {
                return res.status(200).json(`Aluno cadastrado com sucesso`);
            } else {
                return res.status(400).json(`Não foi possível cadastrar o aluno no banco de dados`);
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o aluno: ${error}`);
            return res.status(400).json('Erro ao cadastrar o aluno');
        }
    }
}

export default AlunoController;