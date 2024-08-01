import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { formatDate, getImageMetadata } from "../utility/functions";
import { useEffect } from "react";
import Link from "next/link";

export default function Cascade() {
  const params = useParams();

  const { data: thread, isLoading, refetch } = useQuery({
    queryKey: ['thread', params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/threads/${params.id}/replies`)
      return response;
    },
  })

  console.log(thread)

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
              width={150}
              height={150}
              className="pb-1"
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