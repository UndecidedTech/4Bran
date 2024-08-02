import Image from "next/image";
import { useState } from "react";
import { formatDate } from "../utility/functions";

export default function Reply({ reply, replyMode, setReplyMode }: { reply: any, replyMode: Number, setReplyMode: React.Dispatch<React.SetStateAction<number>> }) {
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

  console.log(reply)

  return (
    <div className="clear-right text-[13px] bg-inherit my-0.5 pt-1 px-2" id={reply.id}>
      <div className="flex bg-blue-200 max-w-fit pt-1 pb-3">
        <div className="px-2 flex flex-col ">
          <div className="flex">
            <span className="px-2 font-bold text-green-700 ">Anonymous</span>
            <span className="px-1 bg-blue-200">{formatDate(reply.createdAt)}</span>
            <span className="px-1 hover:text-red-600 hover:cursor-pointer" onClick={() => setReplyMode(reply.id)}>No. {reply.id}</span>
            {reply.replyReferences && reply.replyReferences.map((reply: any) => <span className="px-1 underline text-[10px] text-slate-600 hover:text-red-600 hover:cursor-pointer">&gt;&gt;{reply.id}</span>)}
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
                <blockquote className="clear-right w-full pt-2 px-2 text-[12px]">{reply.comment}</blockquote>

              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}