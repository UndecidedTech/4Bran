import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"

export default function Catalog() {

  const { data: posts, isLoading } = useQuery({
    queryKey: ['catalog'],
    queryFn: async () => {
      const response = await axios.get('/api/posts')
      console.log(response)
      return response.data;
    }
  })

  console.log(posts)

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <div className="w-full flex flex-wrap justify-start">
        {posts && posts.map((post: any) => (
          <div className="max-w-[180px] max-h-[328px] flex flex-col items-center text-xs">
            <Link
              href={`/post/${post.id}`}
            >
              <Image src={post.image} alt={post.subject} width={150} height={150} className="pb-1"/>
            </Link>
            <p><span className="font-bold">R: {post.replies} / </span>I: {post.images}</p> 
            <p><span className="font-bold">{post.subject}</span>: {post.comment}</p>
          </div>
        ))}
      </div>
    </>
  )
}