import { server } from "./server";
import { DataBaseModel } from "./model/DataBaseModel";
import dotenv from 'dotenv';

dotenv.config();

//Define a porta que o servidor vai escutar as requisições
const port: number = parseInt(process.env.PORT as string);

new DataBaseModel().testeConexao().then((resdb) => {
    if (resdb) {
        console.clear();
        console.log("Conexão com banco de dados realizada com sucesso!");
        // iniciando o servidor
        server.listen(port, () => {
            console.log(`Servidor em http://localhost:${port}`);
        });
    } else {
        console.log("Erro ao conectar com o banco de dados");
    }
});