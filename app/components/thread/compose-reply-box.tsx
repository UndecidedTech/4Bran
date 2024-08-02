"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react"

export default function ComposeReplyBox({
  replyComment,
  setReplyComment,
  replyMode,
  setReplyMode
}: {
  replyComment: string,
  setReplyComment: React.Dispatch<React.SetStateAction<string>>,
  replyMode: Number,
  setReplyMode: React.Dispatch<React.SetStateAction<number>>
}) {

  const params = useParams();
  const [blobUrl, setBlobUrl] = useState("about:blank");
  const [error, setError] = useState(false);
  const [fileName, setFileName] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {

    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setFileName(file.name)
    const objectUrl = window.URL.createObjectURL(file);
    setBlobUrl(objectUrl);
  }


  function handlleCommentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setReplyComment(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("comment", replyComment);
      formData.append("fileName", fileName);

      if (blobUrl !== "about:blank") {
        const blobFile = await fetch(blobUrl)
        const blob = await blobFile.blob()
        formData.append("file", new File([blob], blobUrl, { type: blob.type }));
      }

      await axios.post(`/api/threads/${params.id}/replies`, formData)
      location.reload()
    } catch (e) {
      setError(!error)
    }
  }

  return (
    <div className="fixed top-20 right-5 flex flex-col justify-center border-t border-b border-slate-400 bg-blue-200 pb-1 px-0.5">
      <div className="flex justify-center font-bold bg-blue-500 border border-black text-[13px] px-1">
        <p className="ml-auto pl-4">Reply to Thread No.{replyMode.toString()}</p>
        <button onClick={(e) => setReplyMode(0)} className="ml-auto">X</button>
      </div>
      <form 
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-y-1 text-sm"
      >
        <p className="text-xs text-red-500">{error ? "A post could not be created at this time. Please try again later." : ""}</p>
        <div className="flex gap-x-1">
          <label htmlFor="comment" className="bg-blue-400 min-w-[90px] flex items-center font-bold rounded-sm py-0.5 px-2 border border-black">
            Comment
          </label>
          <div className="flex p-1 border border-black">
            <textarea id="comment" rows={4} cols={50} className="w-full focus:outline-none max-w-[260px]" value={replyComment} onChange={(e) => handlleCommentChange(e)} required />
          </div>
          <button className="h-[26px] bg-blue-100 border border-black px-2">Post</button>
        </div>
        <div className="flex gap-x-1">
          <label className="min-w-[90px] flex items-center bg-blue-400 font-bold rounded-sm py-0.5 px-2 border border-black">
            File
          </label>
          <input id="file-upload" type="file" accept="image/*" onChange={(e) => handleFileChange(e)} />
        </div>
      </form>
    </div>
  )
}