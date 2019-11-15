import Server from "./Classes/server";
import { router } from "./Routes/router";
import bodyParser from 'body-parser';
import cors from 'cors';


const server = new Server();
//Body Parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//Configurar CORS
server.app.use(cors({ origin: true, credentials: true }));


server.app.use('/', router);

server.start(() => {
    console.log('Servidor corriendo');
});

