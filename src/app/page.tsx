import { PostType } from '@/types';
import Image from 'next/image'
import Link from 'next/link'

async function fetchAllBlogs() {
  const res = await fetch(`http://localhost:3000/api/blog`, {
    cache: "no-store",//SSR;
  });

  const data = await res.json();

  return data.posts;//GET POSTのposts[全記事]array取得
}

export default async function Home() {
  //fetchAllBlogsの表示
  const posts = await fetchAllBlogs();

  return (
    <>
      <div>Hello!</div>
      <div>
        {posts.map((post: PostType) => (
          <div>
          <h2>{ post.title }</h2>
          <time>{ new Date(post.date).toDateString() }</time>
          <p>{ post.description }</p>
          <button>
            <Link href={`/blog/edit/${post.id}`}>編集</Link>
          </button>
          </div>
        ))}
        <div key={posts.id}>

        </div>
      </div>
    </>
    
  )
}
