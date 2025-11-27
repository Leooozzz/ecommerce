import express, { urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/routes";


const server = express();

server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended: true }));
server.use(express.json());

server.use('/',router)

server.listen(4000, () => {
  console.log(`http://localhost:4000`);
});
