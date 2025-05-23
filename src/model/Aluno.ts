import { DataBaseModel } from "./DataBaseModel";

// Recupera conexão com o banco de dados
const database = new DataBaseModel().pool;

/**
 * Classe que representa um aluno no sistema
 */
export class Aluno {
    private idAluno: number = 0; // Identificador único do aluno
    private cpf: string; // cpf do aluno
    private nome: string; // Nome do aluno
    private sobrenome: string; // Sobrenome do aluno
    private dataNascimento: Date; // Data de nascimento do aluno
    private telefone: string; // Telefone do aluno
    private endereco: string; // Endereço do aluno
    private email: string; //E-mail do aluno
   
    /**
     * Construtor da classe Aluno
     * 
     * @param cpf CPF do Aluno
     * @param nome Nome do Aluno
     * @param Sobrenome Sobrenome do Aluno
     * @param dataNascimento Data de nascimento do Aluno
     * @param telefone Telefone do Aluno
     * @param endereco Endereço do Aluno
     * @param email Email do Aluno
     */
    public constructor (_cpf: string, _nome:string, _sobrenome:string, _dataNascimento: Date, _telefone:string,_endereco:string, _email:string){
        this.cpf            = _cpf;
        this.nome           = _nome;
        this.sobrenome      = _sobrenome;
        this.dataNascimento = _dataNascimento;
        this.telefone       = _telefone;
        this.endereco       = _endereco;
        this.email          = _email;
    }

    // Métodos GETTERS and SETTERS
    /**
     * Retorna o id do aluno
     * @returns id: id aluno
     */
    public getIdAluno(): number{
        return this.idAluno;
    }

    /**
     * Atribui o parâmetro ao atributo idAluno
     * 
     * @param _idAluno : idAluno
     */
    public setIdAluno(_idAluno: number): void{
        this.idAluno = _idAluno;
    }

    /*
    /**
     * Retorna o CFF do aluno
     * @returns CPF: CPF aluno
     */
    public getCPF(): string {
        return this.cpf;
    }

    /**
     * Atribui o parâmetro ao atributo cpf
     * 
     * @param _cpf : cpf do aluno
     */
    public setCPF(_cpf: string): void{
        this.cpf = _cpf
    }
    

    /**
     * Retorna o nome do aluno
     * @returns nome: nome aluno
     */
    public getNome() {  
        return this.nome;
    }

    /**
     * Atribui o parâmetro ao atributo nome
     * 
     * @param _nome : nome do aluno
     */
    public setNome(_nome: string){  
        this.nome = _nome;
    }

    /**
     * Retorna o sobrenome do aluno
     * @returns sobrenome: sobrenome aluno
     */
    public getSobrenome() {  
        return this.sobrenome;
    }

    /**
     * Atribui o parâmetro ao atributo sobrenome
     * 
     * @param _sobrenome : sobrenome do aluno
     */
    public setSobrenome(_sobrenome: string){  
        this.sobrenome = _sobrenome;
    }

    /**
     * Retorna a dataNascimento do aluno
     * @returns datanascimento: dataNascimento aluno
     */
    public getDataNascimento() {
        return this.dataNascimento;
    }

    /**
     * Atribui o parâmetro ao atributo dataNascimento
     * 
     * @param _dataNascimento : dataNascimento do aluno
     */
    public setDataNascimento(_dataNascimento: Date) {
        this.dataNascimento = _dataNascimento;
    }

    
    /**
     * Retorna o telefone do aluno
     * @returns telefone: celular aluno
     */
    public getTelefone() {
        return this.telefone;
    }

    /**
     * Atribui o parâmetro ao atributo celular
     * 
     * @param _telefone : celular do aluno
     */
    public setTelefone(_telefone: string) {
        this.telefone = _telefone;
    }

    /**
     * Retorna o endereço do aluno
     * @returns endereco: endereco aluno
     */
    public getEndereco() {
        return this.endereco;
    }
    
    /**
     * Atribui o parâmetro ao atributo endereco
     * 
     * @param _endereco : endereco do aluno
     */
    public setEndereco(_endereco: string) {
        this.endereco = _endereco;
    }

    /**
     * Retorna o email do aluno
     * @returns email: email aluno
     */
    public getEmail() {
        return this.email;
    }

     /**
     * Atribui o parâmetro ao atributo email
     * 
     * @param _email : email do aluno
     */
     public setEmail(_email: string) {
        this.email = _email;
    }


    // MÉTODO PARA ACESSAR O BANCO DE DADOS
    // CRUD Create - READ - Update - Delete

    /**
     * Retorna uma lista com todos os alunos cadastrados no banco de dados
     * 
     * @returns Lista com todos os alunos cadastrados no banco de dados
     */
    static async listarAlunos(): Promise<Array<Aluno> | null> {
        // Criando lista vazia para armazenar os alunos
        let listaDeAlunos: Array<Aluno> = [];

        try {
            // Query para consulta no banco de dados
            const querySelectAluno = `SELECT * FROM Aluno;`;

            // executa a query no banco de dados
            const respostaBD = await database.query(querySelectAluno);    

            // percorre cada resultado retornado pelo banco de dados
            // aluno é o apelido que demos para cada linha retornada do banco de dados
            respostaBD.rows.forEach((aluno: any) => {
                
                // criando objeto aluno
                let novoAluno = new Aluno(
                    aluno.cpf,
                    aluno.nome,
                    aluno.sobrenome,
                    aluno.data_nascimento,
                    aluno.telefone,
                    aluno.endereco,
                    aluno.email
                );
                // adicionando o ID ao objeto
                novoAluno.setIdAluno(aluno.id_aluno);
                novoAluno.setCPF(aluno.cpf);
                novoAluno.setNome(aluno.nome);
                novoAluno.setSobrenome(aluno.sobrenome);
                novoAluno.setDataNascimento(aluno.data_nascimento);
                novoAluno.setTelefone(aluno.telefone);
                novoAluno.setEndereco(aluno.endereco);
                novoAluno.setEmail(aluno.email);

                // adicionando a pessoa na lista
                listaDeAlunos.push(novoAluno);
            });

            // retornado a lista de pessoas para quem chamou a função
            return listaDeAlunos;
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }

    /**
     * Cadastra um novo aluno no banco de dados
     * @param aluno Objeto Aluno contendo as informações a serem cadastradas
     * @returns Boolean indicando se o cadastro foi bem-sucedido
     */
    static async cadastrarAluno(aluno: Aluno): Promise<Boolean> {      
        try {
             // Cria a consulta (query) para inserir o registro de um aluno no banco de dados, retorna o ID do aluno que foi criado no final
             const queryInsertAluno = `
             INSERT INTO Aluno (cpf, nome, sobrenome, data_nascimento, telefone, endereco, email)
             VALUES (
                 '${aluno.getCPF()}',
                 '${aluno.getNome().toUpperCase()}',
                 '${aluno.getSobrenome().toUpperCase()}',
                 '${aluno.getDataNascimento()}',
                 '${aluno.getTelefone()}',
                 '${aluno.getEndereco().toUpperCase()}',
                 '${aluno.getEmail().toLowerCase()}'
             )
             RETURNING id_aluno;`;

            // Executa a query no banco de dados e armazena o resultado
            const result = await database.query(queryInsertAluno);

            // verifica se a quantidade de linhas que foram alteradas é maior que 0
            if (result.rows.length > 0) {
                // Exibe a mensagem de sucesso
                console.log(`Aluno cadastrado com sucesso. ID: ${result.rows[0].id_aluno}`);
                // retorna verdadeiro
                return true;
            }

            // caso a consulta não tenha tido sucesso, retorna falso
            return false;
        // captura erro
        } catch (error) {
            // Exibe mensagem com detalhes do erro no console
            console.error(`Erro ao cadastrar aluno: ${error}`);
            // retorna falso
            return false;
        }
    }

    /**
     * Remove um aluno do banco de dados
     * @param idAluno ID do aluno a ser removido
     * @returns Boolean indicando se a remoção foi bem-sucedida
    */
    static async removerAluno(id_aluno: number): Promise<Boolean> {
        // variável para controle de resultado da consulta (query)
        let queryResult = false;
    
        try {
            // Cria a consulta (query) para remover o aluno
           

            // Construção da query SQL para deletar o Aluno.
            const queryDeleteAluno = `UPDATE Aluno   
                                        SET status_aluno = FALSE
                                        WHERE id_aluno=${id_aluno};`;
    
            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteAluno)
            .then((result) => {
                if (result.rowCount != 0) {
                    queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                }
            });
    
            // retorna o resultado da query
            return queryResult;

        // captura qualquer erro que aconteça
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            // retorna false
            return queryResult;
        }
    }


     /**
     * Atualiza os dados de um aluno no banco de dados.
     * @param aluno Objeto do tipo Aluno com os novos dados
     * @returns true caso sucesso, false caso erro
     */
    static async atualizarCadastroAluno(aluno: Aluno): Promise<Boolean> {
        let queryResult = false; // Variável para armazenar o resultado da operação.
        try {
            // Construção da query SQL para atualizar os dados do aluno no banco de dados.
            const queryAtualizarAluno = `UPDATE Aluno SET 
                                            cpf = '${aluno.getCPF()}'
                                            nome = '${aluno.getNome().toUpperCase()}', 
                                            sobrenome = '${aluno.getSobrenome().toUpperCase()}',
                                            data_nascimento = '${aluno.getDataNascimento()}', 
                                            telefone = '${aluno.getTelefone()}', 
                                            endereco = '${aluno.getEndereco().toUpperCase()}',
                                            email = '${aluno.getEmail().toLowerCase()}'                                            
                                        WHERE id_aluno = ${aluno.idAluno}`;

            // Executa a query de atualização e verifica se a operação foi bem-sucedida.
            await database.query(queryAtualizarAluno)
            .then((result) => {
                if (result.rowCount != 0) {
                    queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                }
            });

            // Retorna o resultado da operação para quem chamou a função.
            return queryResult;
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }
}