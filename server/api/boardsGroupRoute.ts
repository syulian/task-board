import { NextResponse } from 'next/server';
import dbConnect from '@server/lib/db';
import Board from '@server/model/Board';

export async function GET() {
    await dbConnect();
    const boards = await Board.find({});
    return NextResponse.json(boards);
}

export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();
    const board = await Board.create(body);
    return NextResponse.json(board);
}