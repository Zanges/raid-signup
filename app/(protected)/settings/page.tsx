import { auth, signOut } from "@/auth"

export default async function SettingsPage() {
  const session = await auth()

  return (
    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
      <div className="text-teal-500">
        {JSON.stringify(session)}
        <form action={async () => {
          "use server"

          await signOut()
        }}>
          <button type="submit">Logout</button>
        </form>
      </div>
    </div>
  )
}
