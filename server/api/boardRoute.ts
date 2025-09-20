import { NextResponse } from 'next/server';
import dbConnect from '@server/lib/db';
import BoardsGroup from '@server/model/BoardsGroup';

export async function GET() {
    await dbConnect();
    const groups = await BoardsGroup.find({});
    return NextResponse.json(groups);
}

export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();
    const group = await BoardsGroup.create(body);
    return NextResponse.json(group);
}
