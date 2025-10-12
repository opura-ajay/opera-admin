"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (isAuthenticated) {
      router.push("/admin-config")
    } else {
      router.push("/sign-in")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
    </div>
  )
}

// import { ThemeSwitcher } from "../app/frontend/components/ui/theme-switcher"; // Adjust path as needed

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
//       <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">app/page.tsx</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <ThemeSwitcher />
//         </div>
//       </div>

//       <h1 className="text-4xl font-bold mt-8">Welcome to the Theme Demo!</h1>
//       <p className="mt-4 text-lg">
//         This text changes color with the theme.
//       </p>

//       <div className="mt-8 p-6 rounded-lg shadow-md bg-gray-100 dark:bg-neutral-800">
//         <h2 className="text-2xl font-semibold">A card that adapts</h2>
//         <p className="mt-2">
//           The background and text of this card will switch based on your
//           selected theme.
//         </p>
//       </div>
//     </main>
//   );
// }