//デフォルト:サーバーサイドレンダリング、今回はクライアントレンダリング
"use client";

import { useRouter } from 'next/navigation';
import React, { useRef, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast';

const editBlog = async (
    title: string | undefined, 
    description: string | undefined,
    id : number
) => {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, id }),
    });
};


const getBlogById = async (
    id : number
) => {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`);
    const data = await res.json();
    return data.post;
};


const deleteBlog = async (id : number) => {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
};


const EditPost = ({ params }: { params: { id: number } }) => {
    const router = useRouter();//投稿したら'/'に戻る
    const titleRef = useRef<HTMLInputElement | null >(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null >(null);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (titleRef.current && descriptionRef.current) {
            toast.loading("更新しています", { id: "1" });
        await editBlog( 
            titleRef.current?.value, 
            descriptionRef.current?.value,
            params.id 
            );

        //valueがある場合にtitleを取得
        //console.log(titleRef.current?.value);
        //console.log(descriptionRef.current?.value);

        toast.success("編集しました", { id: "1" });

        router.push('/');
        router.refresh();
        }        
    };

    const handleDelete = async () => {
        await deleteBlog(params.id)

        router.push('/');
        router.refresh();
    };

    useEffect(() => {
        getBlogById(params.id)
        .then((data) => {
            if (titleRef.current && descriptionRef.current) {
                titleRef.current.value = data.title;
                descriptionRef.current.value = data.description;
            }
        })
        .catch((err) => {
            toast.error("エラーが発生しました", {id: "1"});
        });
    }, []);

  return (
    <>
        <Toaster />
        <h1>EditPost</h1>
        <div>
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
                <button className='rounded-lg bg-slate-200 m-auto'>更新する</button>
                <button onSubmit={handleDelete} className='rounded-lg bg-slate-200 m-auto'>削除する</button>
            </form>
        </div>
    </>
    
  )
}

export default EditPost