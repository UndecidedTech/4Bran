import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getImageMetadata } from "../utility/functions";
import { useEffect } from "react";


export default function Cascade() {
  const params = useParams();

  const { data: thread, isLoading, refetch } = useQuery({
    queryKey: ['thread', params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/threads/${params.id}/replies`)
      return response;
    },
  })

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {thread && (
        <div className="w-full flex flex-col items-start">
          <div className="flex gap-x-2">
            <Image
              src={thread.data.image}
              alt={thread.data.subject}
              width={150}
              height={150}
              className="pb-1"
            />
            <div className="flex gap-x-2 text-xs">
              <p className="font-bold text-green-700">Anonymous</p>
              <p>{new Date(thread.data.createdAt).toLocaleDateString()}</p>
              <p>No. {thread.data.id}</p>
              {thread.data.ThreadReplies.map((reply: any) => <p className="underline text-[10px] text-slate-600 hover:text-red-600 hover:cursor-pointer">&gt;&gt;{reply.id}</p>)}

            </div>
          </div>

        </div>
      )}
    </>
  )
}