"use client";
import axios from "axios";
import { useState } from "react"
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function ComposePost() {
  const router = useRouter();
  const [draftMode, setDraftMode] = useState(false);
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [blobUrl, setBlobUrl] = useState("about:blank");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {

    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setFileName(file.name)
    const objectUrl = window.URL.createObjectURL(file);
    setBlobUrl(objectUrl);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (!executeRecaptcha) return;

    executeRecaptcha("composePostSubmit").then((token: string) => {
      submitForm(token);
    });
  }


  async function submitForm(token: string) {
    try {
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("comment", comment);
      formData.append("fileName", fileName);
      formData.append("token", token);
      
      const blobFile = await fetch(blobUrl)
      const blob = await blobFile.blob()
      formData.append("file", new File([blob], blobUrl, { type: blob.type }));

      const response = await axios.post(`/api/threads`, formData)
      setLoading(false);
      router.push(`/thread/${response.data.thread.id}`)
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
            <label htmlFor="subject" className="min-w-[90px] flex items-center bg-blue-400 font-bold rounded-sm py-0.5 px-2 border border-black">
              Subject
            </label>
            <div className="flex pl-1 border border-black">
              <input id="subject" className="focus:outline-none" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </div>
            <button className="bg-blue-100 border border-black px-2">{loading ? "Please wait, may take up to a minute to process" : "Post"}</button>
          </div>
          <div className="flex gap-x-1">
            <label htmlFor="comment" className="min-w-[90px] flex items-center bg-blue-400 font-bold rounded-sm py-0.5 px-2 border border-black">
              Comment
            </label>
            <div className="flex p-1 border border-black">
              <textarea id="comment" rows={4} cols={50} className="focus:outline-none w-full max-w-[260px]" value={comment} onChange={(e) => setComment(e.target.value)} required />
            </div>
          </div>
          <div className="flex gap-x-1">
            <label htmlFor="file-upload" className="min-w-[90px] flex items-center bg-blue-400 font-bold rounded-sm py-0.5 px-2 border border-black">
              File
            </label>
            <input id="file-upload" className="" type="file" accept="image/*" onChange={(e) => handleFileChange(e)} required/>
          </div>
        </form>
      ) : (
        <p className="text-[22px]">[<button onClick={() => setDraftMode(!draftMode)} className="text-slate-600 hover:text-slate-400">Start a New Thread</button>]</p> 
      )}
    </div>
  )
}