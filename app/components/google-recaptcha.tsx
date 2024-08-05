"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function GoogleCaptchaWrapper({ children }: { children: React.ReactNode }) {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;
  console.log('mounting')
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={key ?? "NOT DEFINED"}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}