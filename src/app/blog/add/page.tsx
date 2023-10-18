//デフォルト:サーバーサイドレンダリング、今回はクライアントレンダリング
"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';

//API endPoint叩く
const postBlog = async (
    title: string | undefined, 
    description: string | undefined
) => {
    const res = await fetch(`http://localhost:3000/api/blog`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
    });
};

const PostBlog = () => {
    const router = useRouter();//投稿したら'/'に戻る
    const titleRef = useRef<HTMLInputElement | null >(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null >(null);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        toast.loading("投稿しています", { id: "1" });
        await postBlog( titleRef.current?.value, descriptionRef.current?.value );

        //valueがある場合にtitleを取得
        //console.log(titleRef.current?.value);
        //console.log(descriptionRef.current?.value);

        toast.success("投稿しました", { id: "1" });

        router.push('/');
        router.refresh();
    };

  return (
    <>
        <Toaster />
        <h1>Postblog</h1>
        <form onSubmit={handleSubmit}>
            <input 
            ref={titleRef}
            placeholder="タイトルを入力" 
            type="text" 
            className='rounded-md px-4 w-full py-2 my-2' 
            />
            <textarea 
            ref={descriptionRef}
            placeholder="説明を入力" 
            className='rounded-md px-4 w-full py-2 my-2'
            >

            </textarea>
            <button className='rounded-lg bg-slate-200 m-auto'>投稿する</button>
        </form>
    </>    
  )
};

export default PostBlog