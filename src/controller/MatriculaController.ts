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

            // Retorna a lista de empréstimos com status 200 (OK)
            return res.status(200).json(listaDeMatriculas);
        } catch (error) {
            // Em caso de erro, retorna o erro com status 500 (erro do servidor)
            console.error('Erro ao listar mastrículas:', error);
            return res.status(500).json({ message: 'Erro ao listar as matrículas.' });
        }
    }

    /**
     * Cadastra um novo empréstimo.
     * Recebe os dados do empréstimo a partir da requisição e passa para o serviço.
     */
    static async cadastrar(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidos: MatriculaDTO = req.body;

            // Verifica se todos os campos obrigatórios foram fornecidos
            if (!dadosRecebidos.idAluno || !dadosRecebidos.idCurso || !dadosRecebidos.dataMatricula || !dadosRecebidos.statusMatricula) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            // Chama o serviço para cadastrar a matrícula
            const novoIdMatricula = await Matricula.cadastrarMatricula(
                dadosRecebidos.idAluno, dadosRecebidos.idCurso, new Date(dadosRecebidos.dataMatricula), new Date(dadosRecebidos.statusMatricula)
            );

            // Retorna a resposta de sucesso com o ID da nova matrícula
            return res.status(201).json({ message: 'Matrícula cadastrada com sucesso', idMatricula: novoIdMatricula });

        } catch (error) {
            console.error('Erro ao cadastrar matrícula:', error);
            return res.status(500).json({ message: 'Erro ao cadastrar a matrícula.' });
        }
    }

    /**
     * Atualiza uma matrícula existente.
     * Recebe os dados da matrícula a partir da requisição e passa para o serviço.
     */
    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidos: MatriculaDTO = req.body;
            const idMatricula = parseInt(req.query.idMatricula as string);
            
            // Verifica se todos os campos obrigatórios foram fornecidos
            if (!idMatricula || !dadosRecebidos.idAluno || !dadosRecebidos.idCurso || !dadosRecebidos.dataMatricula || !dadosRecebidos.statusMatricula) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            // Chama o MODEL para atualizar a matrícula/ Number(idEmprestimo) converte o idEmprestimo de string para number
                const emprestimoAtualizado = await Emprestimo.atualizarEmprestimo(
                idEmprestimo, dadosRecebidos.idAluno, dadosRecebidos.idCurso, new Date(dadosRecebidos.dataMatricula), new Date(dadosRecebidos.statusMatricula)
            );

            // Retorna a resposta de sucesso com o ID do empréstimo atualizado
            return res.status(200).json({ message: 'Matrícula atualizada com sucesso', idMatricula: matriculaAtualizada });

        } catch (error) {
            console.error('Erro ao atualizar matrícula:', error);
            return res.status(500).json({ message: 'Erro ao atualizar a matrícula.' });
        }
    }
    static async remover(req: Request, res: Response): Promise<Response> {
        // tenta executar a remoção do registro
        try {
            // id do empréstimo vindo do cliente
            const idMatricula = parseInt(req.query.idEmprestimo as string);
            // executa o método de remoção e armazena o resultado (booleano)
            const resultado = await Matricula.removerMatricula(idMatricula);

            // se o resultdo for true
            if (resultado) {
                // retorna mensagem e sucesso com status 200
                return res.status(200).json('Matrícula removida com sucesso!');
            } else {
                // retorna mensagem de erro com status 
                return res.status(400).json('Erro ao remover matrícula!');
            }

        // captura qualquer erro que possa acontecer
        } catch (error) {
            // exibe detalhes do erro no console
            console.log(`Erro ao remover a Matrícula ${error}`);
            // retorna uma mensagem de erro com status 500
            return res.status(500).send("error");
        }
    }
}

export default MatriculaController;