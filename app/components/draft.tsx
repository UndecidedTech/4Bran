"use client";
import axios from "axios";
import { useState } from "react"

export default function Draft() {
  const [draftMode, setDraftMode] = useState(false);
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [file, setFile] = useState("about:blank");


  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {

    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const objectUrl = window.URL.createObjectURL(file);
    setFile(objectUrl);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("comment", comment);
    formData.append("file", file);

    const response = await axios.post('/api/upload')

    console.log(response)
  }

  return (
    <div className="w-full flex justify-center py-2 border-t border-b border-slate-400">
      {draftMode ? (
        <form 
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-y-1 text-sm"
        >
          <div className="flex gap-x-1">
            <div className="min-w-[90px] flex items-center bg-blue-400 font-bold rounded-sm py-0.5 px-2 border border-black">
              Subject
            </div>
            <input id="subject" className="border border-black" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            <button className="bg-blue-100 border border-black px-2">Post</button>
          </div>
          <div className="flex gap-x-1">
            <div className="min-w-[90px] flex items-center bg-blue-400 font-bold rounded-sm py-0.5 px-2 border border-black">
              Comment
            </div>
            <textarea id="comment" rows={4} cols={50} className="w-full border border-black max-w-[260px]" value={comment} onChange={(e) => setComment(e.target.value)} required />
          </div>
          <div className="flex gap-x-1">
            <div className="min-w-[90px] flex items-center bg-blue-400 font-bold rounded-sm py-0.5 px-2 border border-black">
              File
            </div>
            <input id="file-upload" type="file" accept="image/*" onChange={(e) => handleFileChange(e)} required />
          </div>
        </form>
      ) : (
        <p className="text-[22px]">[<button onClick={() => setDraftMode(!draftMode)} className="hover:text-slate-400">Start a New Thread</button>]</p> 
      )}
    </div>
  )
}