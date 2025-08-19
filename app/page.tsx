"use client";

import React from 'react';
import { useEffect,useState } from 'react';
import Link from "next/link";
import { PostData } from "./_types/post";


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
  const [posts, setPosts] = useState<PostData[]>([]);



  // APIから記事データを取得してjsonに変換→postsに渡してる
  useEffect(() => {
    const fetcher = async () : Promise < void > => {
      try {
        const resp = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts");
        const data : ApiResponse = await resp.json();
        setPosts(data.posts);

      } catch (e) {
        setError(e.message);

      } finally {
        setIsLoading(false);
      }
    };

    fetcher();
  }, []);

  
  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました: {error}</p>;
  if (!posts) return <p>データが見つかりませんでした</p>;

    
       



  return(
    <>
    <div className='px-4 my-10 max-w-3xl mx-auto'>
      
      {posts.map((data) => (
        <Link key={data.id}
          href={`/posts/${data.id}`}
 
          className='text-black mb-8 p-4 border border-gray-300 block'>
            <div className='flex justify-between'>
              <li className='text-gray-400 text-[12.8px] list-none'>{new Date(data.createdAt).toLocaleDateString('ja-JP')}</li>
            
              <ul className='flex'>
                {data.categories && data.categories.length > 0 && (
                <li className='text-blue-600 text-[12.8px] mr-2 py-1  px-2 border border-blue-500 rounded list-none'>{data.categories[0]}</li>)}

                {data.categories && data.categories.length > 1 && (
                <li className='text-blue-600 text-[12.8px] mr-2 py-1  px-2  border border-blue-500 rounded list-none'>{data.categories[1]}</li>)}
              </ul>
            </div>
          

            <p className='text-black text-2xl mt-2 mb-4'>{data.title}</p>
            <p className='text-black line-clamp-2'
              dangerouslySetInnerHTML={{ __html:data.content }}/>


        </Link>
      ))}
    </div>
    </>
  );
};

export default TopPage; 