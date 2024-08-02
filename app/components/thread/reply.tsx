import Image from "next/image";
import { useState } from "react";
import { formatDate } from "../utility/functions";

function formatComment(comment: string, allReplyIds: Map<any, any>, replyId: number) {
  // Split the comment by newlines and special formatting rules
  const parts = comment.split(/(>>\d+|>.+?$)/gm);
  
  return parts.map((part, index) => {
    // Handle replies (>> followed by numbers)
    if (part.startsWith(">>")) {
      const id = Number(part.slice(2));
      if (allReplyIds.has(id) && id < replyId) {
        return (
          <a key={index} href={`#${part.slice(2)}`} className="text-red-600">
            {part}
          </a>
        );
      } else return part;
    // Handle green text (lines that start with a single ">")
    } else if (part.startsWith(">") && !part.startsWith(">>")) {
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

export default function Reply({ allReplyIds, replyComment, setReplyComment, reply, replyMode, setReplyMode }: { allReplyIds: Map<any, any>, replyComment: string, setReplyComment: React.Dispatch<React.SetStateAction<string>>, reply: any, replyMode: Number, setReplyMode: React.Dispatch<React.SetStateAction<number>> }) {
  const [ratio, setRatio] = useState(1);
  const [width, setWidth] = useState(150);
  const [height, setHeight] = useState(150);
  const [enlarged, setEnlarged] = useState(false);

  function handleImageClick() {
    if (!reply) return;

    if (!enlarged) {
      setWidth(Number(reply.imageResolution.split('x')[0]))
      setHeight(Number(reply.imageResolution.split('x')[1]))
    } else {
      setWidth(150)
      setHeight(150)
    }
    setEnlarged(!enlarged);
  }

  function handleReplyClick(){
    if (!replyMode) {
      setReplyMode(reply.id)
    }
    setReplyComment(replyComment + `>>${reply.id}`)
  }

  return (
    <div id={reply.id.toString()} className="clear-right text-[13px] bg-inherit my-0.5 pt-1 px-2">
      <div className="flex bg-blue-200 max-w-fit pt-1 pb-3">
        <div className="px-2 flex flex-col ">
          <div className="flex">
            <span className="px-2 font-bold text-green-700 ">Anonymous</span>
            <span className="px-1 bg-blue-200">{formatDate(reply.createdAt)}</span>
            <span className="px-1 hover:text-red-600 hover:cursor-pointer" onClick={handleReplyClick}>No. {reply.id}</span>
            {reply.replyReferences && reply.replyReferences.map((reply: any) => <span className="px-1 underline text-[10px] text-slate-600 hover:text-red-600 hover:cursor-pointer">&gt;&gt;{reply}</span>)}
          </div>
          {reply.image && (
            <div className="px-2">
              <span>File:</span>
              <a target="_blank" className="px-1 underline text-blue-950 hover:text-red-600" href={reply.image}>{reply.imageName}</a>
              <span>({reply.imageSize}, {reply.imageResolution})</span>
            </div>
          )}
          <div className={`${enlarged ? "flex flex-col" : ""} relative`}>
            {reply.image && (
              <Image
                src={reply.image}
                alt={reply.comment}
                width={width}
                height={height / ratio}
                className="float-left pl-2 pb-1 hover:cursor-pointer"
                onClick={handleImageClick}
              />
            )}
            <span className="clear-right">
              <div className="flex">
                <blockquote className="clear-right whitespace-pre-wrap w-full pt-2 px-2 text-[12px]">{formatComment(reply.comment, allReplyIds, reply.id)}</blockquote>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}