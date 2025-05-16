import express from "express";
import { SERVER_ROUTES } from "./appConfig";
import AlunoController from "./controller/AlunoController";
import CursoController from "./controller/CursoController";
import MatriculaController from "./controller/MatriculaController";

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ mensagem: "Rota padrão" })
});

// CRUD Aluno
router.get(SERVER_ROUTES.LISTAR_ALUNOS, AlunoController.todos);
router.post(SERVER_ROUTES.NOVO_ALUNO, AlunoController.cadastrar);
router.put(SERVER_ROUTES.REMOVER_ALUNO, AlunoController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_ALUNO, AlunoController.atualizar);

//CRUD Livro
router.get(SERVER_ROUTES.LISTAR_CURSO, CursoController.todos);
router.post(SERVER_ROUTES.NOVO_CURSO, CursoController.cadastrar);
router.put(SERVER_ROUTES.REMOVER_CURSO, CursoController.remover);
router.put(SERVER_ROUTES.ATUALIZAR_CURSO, CursoController.atualizar);

//CRUD Emprestimo
router.get(SERVER_ROUTES.LISTAR_MATRICULA, MatriculaController.todos);
router.post(SERVER_ROUTES.NOVO_MATRICULA, MatriculaController.cadastrar);
router.put(SERVER_ROUTES.ATUALIZAR_MATRICULA, MatriculaController.atualizar);
router.put(SERVER_ROUTES.REMOVER_MATRICULA, MatriculaController.remover);

export { router }