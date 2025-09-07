//import 'dotenv/config';
import { Server } from './src/server/server.js';
import dotenv from 'dotenv';
import './src/models/initAssociations.js';


dotenv.config();

const server = new Server();

server.listen();
