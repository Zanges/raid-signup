export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-cyan-900 to-gray-900">
      {children}
    </div>
  )
}