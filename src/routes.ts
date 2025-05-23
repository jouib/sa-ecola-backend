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

//CRUD Livro
router.get(SERVER_ROUTES.LISTAR_CURSOS, CursoController.todos);

//CRUD Emprestimo
router.get(SERVER_ROUTES.LISTAR_MATRICULAS, MatriculaController.todos);


export { router }