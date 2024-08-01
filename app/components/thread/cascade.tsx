import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { formatDate } from "../utility/functions";
import { useState } from "react";

export default function Cascade() {
  const params = useParams();
  const [ratio, setRatio] = useState(1);
  const [width, setWidth] = useState(150);
  const [height, setHeight] = useState(150);
  const [enlarged, setEnlarged] = useState(false);

  function handleImageClick() {

    if (!thread) return;

    if (!enlarged) {
      setWidth(Number(thread.data.imageMetadata.resolution.split('x')[0]))
      setHeight(Number(thread.data.imageMetadata.resolution.split('x')[1]))
    } else {
      setWidth(150)
      setHeight(150)
    }
    setEnlarged(!enlarged);

  }

  const { data: thread, isLoading, refetch } = useQuery({
    queryKey: ['thread', params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/threads/${params.id}/replies`)
      
      setRatio(response.data.imageMetadata.resolution.split('x')[0] / 150)

      return response;
    },
  })

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {thread && (
        <div className="w-full inline-block text-[13px]">
          <div className="inline-block">
            <span>File:</span>
            <a target="_blank" className="px-1 underline text-blue-950 hover:text-red-600" href={thread.data.post.image}>{thread.data.imageMetadata.filename}</a>
            <span>({thread.data.imageMetadata.filesize}, {thread.data.imageMetadata.resolution})</span>
          </div>
          <div className="flex gap-x-2">
            <Image
              src={thread.data.post.image}
              alt={thread.data.post.subject}
              width={width}
              height={height / ratio}
              className="pb-1 hover:cursor-pointer"
              onClick={handleImageClick}
            />
            <div className="w-full">
              <span className="px-1 font-bold text-blue-900">{thread.data.post.subject}</span>
              <span className="px-1 font-bold text-green-700">Anonymous</span>
              <span className="px-1">{formatDate(thread.data.post.createdAt)}</span>
              <span className="px-1">No. {thread.data.post.id}</span>
              {thread.data.post.ThreadReplies.map((reply: any) => <span className="px-1 underline text-[10px] text-slate-600 hover:text-red-600 hover:cursor-pointer">&gt;&gt;{reply.id}</span>)}
              <blockquote className="pt-2 px-1 text-[12px]">{thread.data.post.comment}</blockquote>
            </div>
          </div>

        </div>
      )}
    </>
  )
}