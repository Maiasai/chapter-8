"use client";

import React from 'react';
import {useEffect,useState } from 'react';


type PostData = { 
  post : string;
  categories : string[];
  content : string;
  createdAt : string ;
  id : number;
  thumbnailUrl : string;
  title : string;
};



type ApiResponse = {
   post: PostData;
 }

 type Props = { 
   params: { id: string } };




export const ArticlePage= ({ params }: Props) => {
  //URLパラメータ（ルートパラメータ）を取得するためのもの
  const { id } = params;

  const [isLoading, setIsLoading] = useState< boolean >(true);
  const [detail, setDetail] = useState<PostData | null >(null);
  const [error, setError] = useState< string | null >(null);
  



  useEffect(() => {
    const fetcher = async () : Promise<void> => {
      try {
        const resp = await fetch(
        `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
        );
        const data : ApiResponse = await resp.json();
        console.log(data);

        console.log('API Response:', data);
        setDetail(data.post);    // 状態を更新しているだけ

      } catch (e) {
        if(e instanceof Error){
        setError(e.message);
        }

      } finally {
        setIsLoading(false);

      }
      };
          
      fetcher();
    },[id]);

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました: {error}</p>;
  if (!detail) return <p>データが見つかりませんでした</p>;

          


  return(
    <div className='p-10'>
    
    <div className='w-full max-w-3xl mx-auto '>
      <img src = "/800x400.png" alt="800×400て書いてある画像" className="w-[768px]"></img></div>

    <div className='w-full max-w-3xl mx-auto p-4 m-0'>
    <div className='flex justify-between'>
      <p className='text-gray-400 text-[12.8px] list-none'>{new Date(detail.createdAt).toLocaleDateString('ja-JP')}</p>
          

      <ul className='flex'>
        {detail.categories.map((category,index)=> (
          <li key={index} 
          className='text-blue-600 text-[12.8px] mr-2 py-1  px-2 border border-blue-500 rounded list-none'>{category}</li>
        ))}
      </ul>

        
      </div>
        <p className='text-black text-2xl mt-2 mb-4'>{detail.title}</p>
        <p className='text-black '
          dangerouslySetInnerHTML={{ __html:detail.content }}/>
      </div>

    </div>

  );

}

