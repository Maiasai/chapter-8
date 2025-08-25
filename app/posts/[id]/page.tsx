"use client";

import React from 'react';
import {useEffect,useState } from 'react';
import Image from "next/image";
import { PostData } from "../../_types/post";
import { MicroCmsPost } from "../../_types/post";




type ApiResponse = {
   post: PostData;
 }


type Props = { 
  params:{id:string}
};



const ArticlePage= ({params}:Props) => {
  //URLパラメータ（ルートパラメータ）を取得するためのもの(クリックされた記事のidがここに入る)
  const { id } = params;

  const [isLoading, setIsLoading] = useState< boolean >(true);
  const [detail, setDetail] = useState<PostData | null >(null);
  const [error, setError] = useState< string | null >(null);
  



  const [post, setPost] = useState< MicroCmsPost | null>(null)

  useEffect(() => {
    const fetcher = async () : Promise < void > => {
      setIsLoading(true)
      const resp = await fetch(
        `https://qh8l0fxjef.microcms.io/api/v1/posts/${id}`,// microCMSのエンドポイント
        {
          headers: {
            'X-MICROCMS-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string, // APIキーをセット
          },
        },
      )
      const data: MicroCmsPost = await resp.json()
      console.log(data);

      setPost(data) // dataをそのままセット
      setIsLoading(false)
    }

    fetcher()
  }, [id])

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました: {error}</p>;
  if (!post) return <p>データが見つかりませんでした</p>;

          


  return(
    <div className='p-10'>
    
    <div className='w-full max-w-3xl mx-auto '>

    {post.thumbnail && (
      <Image
        src={post.thumbnail.url}
        alt={post.title}
        width={post.thumbnail.width}
        height={post.thumbnail.height}
        priority
      />
    )}

    </div>

    <div className='w-full max-w-3xl mx-auto p-4 m-0'>
    <div className='flex justify-between'>
      <p className='text-gray-400 text-[12.8px] list-none'>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</p>
          

      <ul className='flex'>
        {post.categories.map((category,index)=> (
          <li key={index} 
          className='text-blue-600 text-[12.8px] mr-2 py-1  px-2 border border-blue-500 rounded list-none'>{category.name}</li>
        ))}
      </ul>

        
      </div>
        <p className='text-black text-2xl mt-2 mb-4'>{post.title}</p>
        <p className='text-black '
          dangerouslySetInnerHTML={{ __html:post.content }}/>
      </div>

    </div>

  );

}

export default ArticlePage;
