export default function PageError({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 rounded-lg border-red-500 text-red-700">
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p>{message}</p>
      </div>
    </div>
  )
}