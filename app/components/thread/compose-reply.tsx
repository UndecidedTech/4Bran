"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react"

export default function ComposeReply() {
  const params = useParams();
  const [draftMode, setDraftMode] = useState(false);
  const [comment, setComment] = useState("");
  const [blobUrl, setBlobUrl] = useState("about:blank");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(false);


  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {

    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setFileName(file.name)
    const objectUrl = window.URL.createObjectURL(file);
    setBlobUrl(objectUrl);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("comment", comment);
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
    <div className="w-full flex justify-center py-2 border-t border-b border-slate-400">
      {draftMode ? (
        <form 
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-y-1 text-sm"
        >
          <p className="text-xs text-red-500">{error ? "A post could not be created at this time. Please try again later." : ""}</p>
          <div className="flex gap-x-1">
            <label htmlFor="comment" className="min-w-[90px] flex items-center bg-blue-400 font-bold rounded-sm py-0.5 px-2 border border-black">
              Comment
            </label>
            <div className="flex p-1 border border-black">
              <textarea id="comment" rows={4} cols={50} className="w-full focus:outline-none max-w-[260px]" value={comment} onChange={(e) => setComment(e.target.value)} required />
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
      ) : (
        <p className="text-[22px]">[<button onClick={() => setDraftMode(!draftMode)} className="text-slate-600 hover:text-slate-400">Post a Reply</button>]</p> 
      )}
    </div>
  )
}