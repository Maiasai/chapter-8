"use client";

import React from 'react';
import { useEffect,useState } from 'react';
import Link from "next/link";
import { PostData } from "./_types/post";
import { MicroCmsPost } from "./_types/post";


type ApiResponse = {
  posts: PostData[];
}


// HTML文字列 → <br>テキストだけ抽出（タグを除去）
const stripHtml = (html):string => {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || '';
};


const TopPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState< boolean >(true);
  const [error, setError] = useState< string | null >(null);
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);


  // APIから記事データを取得してjsonに変換→postsに渡してる
  useEffect(() => {
    const fetcher = async () => {
    try{
      const resp = await fetch('https://qh8l0fxjef.microcms.io/api/v1/posts', {// 管理画面で取得したエンドポイントを入力してください。
        headers: {// fetch関数の第二引数にheadersを設定でき、その中にAPIキーを設定します。
          'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string, // 管理画面で取得したAPIキーを入力してください。
        },
      })
      const data = await resp.json();
      console.log("API Response:", data);

      setPosts(data.contents);

    } catch (err: any) {

      setError(err.message);

    } finally {

      setIsLoading(false); // ← これが必要！
    }
  };
    fetcher()
  }, [])

  
  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました: {error}</p>;
  if (!posts) return <p>データが見つかりませんでした</p>;

    
       
  console.log(posts);


  return(
    <>
    <div className='px-4 my-10 max-w-3xl mx-auto'>
      
      {posts.map((post) => (
        <Link key={post.id}
          href={`/posts/${post.id}`}
 
          className='text-black mb-8 p-4 border border-gray-300 block'>
            <div className='flex justify-between'>
              <li className='text-gray-400 text-[12.8px] list-none'>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</li>
            
              <ul className='flex'>
                {post.categories && post.categories.length > 0 && (
                <li className='text-blue-600 text-[12.8px] mr-2 py-1  px-2 border border-blue-500 rounded list-none'>{post.categories[0].name}</li>)}

                {post.categories && post.categories.length > 1 && (
                <li className='text-blue-600 text-[12.8px] mr-2 py-1  px-2  border border-blue-500 rounded list-none'>{post.categories[1].name}</li>)}
              </ul>
            </div>
          

            <p className='text-black text-2xl mt-2 mb-4'>{post.title}</p>
            <p className='text-black line-clamp-2'
              dangerouslySetInnerHTML={{ __html:post.content }}/>


        </Link>
      ))}
    </div>
    </>
  );
};

export default TopPage; 