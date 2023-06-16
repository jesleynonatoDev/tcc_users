import logger from '@src/utils/logger';
import mongoose from 'mongoose';

const user = 'user_root';
const pass = 'ckZlKQmmKEZGenPt';
const database = 'tcc_users';
const serverName = 'tccusercluster.cw35xdp.mongodb.net';

export const db = {
    init: () => {
        mongoose.connect(
            `mongodb+srv://${user}:${pass}@${serverName}/${database}?retryWrites=true&w=majority`)
            .then((res) => logger.info(`Connection Succesful ${res}`))
            .catch((err) => logger.error(`Erro in DB connection: ${err}`));
    }

}