import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { formatDate } from "../utility/functions";
import { useState } from "react";
import Reply from "./reply";
import ComposeReplyBox from "./compose-reply-box";

export default function Cascade() {
  const params = useParams();
  const [ratio, setRatio] = useState(1);
  const [width, setWidth] = useState(175);
  const [height, setHeight] = useState(175);
  const [enlarged, setEnlarged] = useState(false);
  const [replyMode, setReplyMode] = useState(0);

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

  function handleReplyClick() {
    setReplyMode(1);
  }

  const { data: thread, isLoading, refetch } = useQuery({
    queryKey: ['thread', params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/threads/${params.id}/replies`)
      setRatio(response.data.imageMetadata.resolution.split('x')[0] / 150)
      return response;
    },
  })

  console.log(thread)

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {thread && (
        <div className="w-full text-[13px]">
          <span>File:</span>
          <a target="_blank" className="px-1 underline text-blue-950 hover:text-red-600" href={thread.data.post.image}>{thread.data.imageMetadata.filename}</a>
          <span>({thread.data.imageMetadata.filesize}, {thread.data.imageMetadata.resolution})</span>
          <div className="relative w-full">
            <Image
              src={thread.data.post.image}
              alt={thread.data.post.subject}
              width={width}
              height={height / ratio}
              className={`${enlarged ? "" : "float-left"} hover:cursor-pointer pr-10 pl-2`}
              onClick={handleImageClick}
              sizes="(max-width: 768px) 100vw, 768px"
              loading="lazy"
            />
            <span className="clear-right">
              <span className={`${enlarged ? "pl-2" : ""} pr-1 font-bold text-blue-900 align-top`}>{thread.data.post.subject}</span>  
              <span className="px-1 font-bold text-green-700">Anonymous</span>
              <span className="px-1">{formatDate(thread.data.post.createdAt)}</span>
              <span className="px-1 hover:text-red-600 hover:cursor-pointer" onClick={handleReplyClick}>No. {thread.data.post.id}</span>
              {thread.data.post.ThreadReplies.map((reply: any) => <span className="px-0.5 underline text-[10px] text-slate-600 hover:text-red-600 hover:cursor-pointer">&gt;&gt;{reply.id}</span>)}
            </span>
            <blockquote className="clear-right mx-2 col-span-1 pt-2 pb-4 px-1 text-[12px]">{thread.data.post.comment}</blockquote>
            {thread.data.post.ThreadReplies.map((reply: any) => <Reply reply={reply} replyMode={replyMode} setReplyMode={setReplyMode} />)}
          </div>
        </div>
      )}
      {replyMode !== 0 && <ComposeReplyBox replyMode={replyMode} setReplyMode={setReplyMode} />}
    </>
  )
}