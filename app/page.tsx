"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import LoginButton from "@/components/LoginButton"

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)

  // Get logged-in user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  // Fetch bookmarks when user changes
  useEffect(() => {
    if (!user) return
    fetchBookmarks()
  }, [user])

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false })

    setBookmarks(data || [])
  }

  const addBookmark = async () => {
    if (!title || !url || !user) return

    setLoading(true)

    // Ensure URL starts with http/https
    const formattedUrl = url.startsWith("http")
      ? url
      : `https://${url}`

    const { error } = await supabase.from("bookmarks").insert({
      title,
      url: formattedUrl,
      user_id: user.id,
    })

    if (!error) {
      await fetchBookmarks()
      setTitle("")
      setUrl("")
    }

    setLoading(false)
  }

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id)
    await fetchBookmarks()
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoginButton />
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">My Bookmarks</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Add Bookmark Section */}
      <div className="flex gap-2 mb-6">
        <input
          placeholder="Title"
          className="border p-2 flex-1 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="URL"
          className="border p-2 flex-1 rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={addBookmark}
          disabled={loading}
          className="bg-green-600 text-white px-4 rounded disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {/* Bookmark List */}
      <ul className="space-y-4">
        {bookmarks.map((b) => (
          <li
            key={b.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline font-medium"
              >
                {b.title}
              </a>
              <p className="text-sm text-gray-400 break-all">
                {b.url}
              </p>
            </div>

            <button
              onClick={() => deleteBookmark(b.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}