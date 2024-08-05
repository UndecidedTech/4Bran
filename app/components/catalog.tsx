import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"


export default function Catalog() {

  const { data: posts, isLoading } = useQuery({
    queryKey: ['catalog'],
    queryFn: async () => {
      const response = await axios.get('/api/threads')
      return response.data;
    }
  })

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <div className="w-full flex justify-center">
        <div className="max-w-content flex flex-wrap justify-center gap-x-4 lg:gap-x-8 md:px-12 gap-y-4 lg:gap-y-8">
          {posts && posts.map((post: any) => (
            <div className="max-w-[130px] md:max-w-[180px] max-h-[328px] flex flex-col items-center text-xs">
              <Link
                href={`/thread/${post.id}`}
              >
                <Image src={post.image} alt={post.subject} width={150} height={150} className="w-auto max-h-[200px] pb-1 shadow"/>
              </Link>
              <p className="text-[11px]"><span className="font-bold">R: {post.replies} / </span>I: {post.images}</p> 
              <p className="max-w-[150px] text-center line-clamp-[10]"><span className="font-bold">{post.subject}</span>: {post.comment}</p>
            </div>
          ))}
          {Array.from({ length: 13 }, (_, i) => <div key={i} className="w-full h-0 max-w-[130px] md:max-w-[180px] max-h-[328px]" />)}
        </div>
      </div>
    </>
  )
}