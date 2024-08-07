import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { formatDate } from "../utility/functions";
import { useState } from "react";
import Reply from "./reply";
import ComposeReplyBox from "./compose-reply-box";

function formatComment(comment: string) {
  // Split the comment by newlines and special formatting rules
  const parts = comment.split(/(>>\d+|>.+?$)/gm);
  
  return parts.map((part, index) => {
    if (part.startsWith(">") && !part.startsWith(">>")) {
      return (
        <span key={index} className="text-[#789922]">
          {part}
        </span>
      );
    // Handle newlines
    } else if (part === "\n") {
      return <br key={index} />;
    // Handle regular text
    } else {
      return part;
    }
  });
}

export default function Cascade() {
  const params = useParams();
  const [ratio, setRatio] = useState(1);
  const [width, setWidth] = useState(175);
  const [height, setHeight] = useState(175);
  const [enlarged, setEnlarged] = useState(false);
  const [replyMode, setReplyMode] = useState(0);
  const [replyComment, setReplyComment] = useState("");
  const [allReplyIds, setAllReplyIds] = useState<Map<any, any>>(new Map());

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

  const { data: thread, isLoading } = useQuery({
    queryKey: ['thread', params.id],
    queryFn: async () => {
      const response = await axios.get(`/api/threads/${params.id}/replies`, {
        params: {
          id: params.id
        }
      })
      setRatio(response.data.imageMetadata.resolution.split('x')[0] / 150)
      response.data.post.ThreadReplies.forEach((reply: any) => setAllReplyIds(prev => new Map(prev).set(reply.id, 1)))
      setAllReplyIds(prev => new Map(prev).set(response.data.post.id, 1))
      return response;
    },
  })

  function handleReplyClick({ reply }: { reply: any }) {
    if (!replyMode) {
      setReplyMode(reply.id)
    }
    setReplyComment(replyComment + `>>${reply.id}`)
  }

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
              <span className="px-1 hover:text-red-600 hover:cursor-pointer" onClick={() => handleReplyClick({ reply: thread.data.post })}>No.{thread.data.post.id}</span>
              {thread.data.post.directReplies && thread.data.post.directReplies.map((reply: number) => <a key={reply} href={`#${reply.toString()}`} className="px-0.5 underline text-[10px] text-slate-600 hover:text-red-600 hover:cursor-pointer">&gt;&gt;{reply}</a>)}
            </span>
            <blockquote className="clear-right whitespace-pre-wrap mx-2 col-span-1 pt-2 pb-4 px-1 text-[12px]">{formatComment(thread.data.post.comment)}</blockquote>
            {thread.data.post.ThreadReplies.map((reply: any) => <Reply key={reply.id} allReplyIds={allReplyIds}  reply={reply}  handleReplyClick={handleReplyClick} />)}
          </div>
        </div>
      )}
      {replyMode !== 0 && <ComposeReplyBox replyComment={replyComment} setReplyComment={setReplyComment} replyMode={replyMode} setReplyMode={setReplyMode} />}
    </>
  )
}