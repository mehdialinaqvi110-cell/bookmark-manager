"use client"

import { supabase } from "@/lib/supabase"

export default function LoginButton() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    })
  }

  return (
    <button
      onClick={login}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg"
    >
      Login with Google
    </button>
  )
}