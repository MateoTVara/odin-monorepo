import Header from "../components/Header"

const Dashboard = () => {
  return (
    <>
      <Header />
      <div
        className="p-4"
      >
        <h2 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h2>
        <p className="text-gray-700">Use the navigation above to manage your blog posts, categories, and users.</p>
      </div>
    </>
  )
}

export default Dashboard