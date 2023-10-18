import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { main } from "../route";

const prisma = new PrismaClient();

//詳細記事取得API
export const GET = async (req: Request, res: NextResponse) => {
    try {
        const id: number = parseInt(req.url.split("/blog/")[1]);//http://xxx/api/blog/n, req.url.split parseInt
        await main();
        //指定記事取得findFirst
        const post = await prisma.post.findFirst({ where : { id } });
        return NextResponse.json({ message: "Success" , post }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error" , err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};


//詳細記事編集API 分割代入
export const PUT = async (req: Request, res: NextResponse) => {
    try {
        const id: number = parseInt(req.url.split("/blog/")[1]);//http://xxx/api/blog/n, req.url.split parseInt
        //title,description取得 //reqからdataの取り出し
        const { title, description } = await req.json();

        await main();
        //prisma.post.update
        const post = await prisma.post.update({
            data: { title, description },
            where: { id },
        });
        return NextResponse.json({ message: "Success" , post }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error" , err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};


export const DELETE = async (req: Request, res: NextResponse) => {
    try {
        const id: number = parseInt(req.url.split("/blog/")[1]);//http://xxx/api/blog/n, req.url.split parseInt
        
        await main();
        //prisma.post.update
        const post = await prisma.post.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Success" , post }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error" , err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};