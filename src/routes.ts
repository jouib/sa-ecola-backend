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
router.post(SERVER_ROUTES.NOVO_ALUNO, AlunoController.novo);

//CRUD Curso
router.get(SERVER_ROUTES.LISTAR_CURSOS, CursoController.todos);
router.post(SERVER_ROUTES.NOVO_CURSO, CursoController.novo);

//CRUD Matricula
router.get(SERVER_ROUTES.LISTAR_MATRICULAS, MatriculaController.todos);
router.post(SERVER_ROUTES.NOVO_MATRICULA, MatriculaController.novo);


export { router }