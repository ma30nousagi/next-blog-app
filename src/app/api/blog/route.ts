import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

//インスタンス化
const prisma = new PrismaClient();

export async function main() {
    try {
        await prisma.$connect();
    } catch (err) {
        return Error("DB接続に失敗しました")
    }
}

//ブログ全記事取得のAPI
export const GET = async (req: Request, res: NextResponse) => {
    try {
        await main();
        //全記事取得
        const posts = await prisma.post.findMany();
        return NextResponse.json({ message: "Success" , posts }, { status: 200 });//posts=schema.prisma Post
    } catch (err) {
        return NextResponse.json({ message: "Error" , err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};


//ブログ投稿用のAPI
export const POST = async (req: Request, res: NextResponse) => {
    try {
        //reqからdataの取り出し
        const { title, description } = await req.json();
        await main();
        //投稿
        const post = await prisma.post.create({ data: {title, description } });
        return NextResponse.json({ message: "Success" , post }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error" , err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};