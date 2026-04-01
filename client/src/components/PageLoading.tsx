export default function PageLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black flex items-center justify-center">
        <span className="absolute text-xl">🔍</span>
      </div>
    </div>
  )
}