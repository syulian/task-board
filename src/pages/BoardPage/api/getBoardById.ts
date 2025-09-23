import dbConnect from '@shared/db/db';
import { Board } from '@shared/db/model';

export default async function getBoardById(id: string) {
    await dbConnect();
    return Board.findById(id);
}
