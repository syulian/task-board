import { ObjectId } from 'mongodb';
import { Metadata } from 'next';
import dbConnect from '@shared/db/db';
import { Board } from '@shared/db/model';

type Params = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    try {
        const { id } = await params;
        if (!ObjectId.isValid(id)) return { title: 'Board' };

        await dbConnect();
        const data = await Board.findById(id);

        return { title: data?.name || 'Board' };
    } catch (error) {
        console.error(error);
    }

    return { title: 'Board' };
}
