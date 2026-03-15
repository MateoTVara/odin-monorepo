// admin-client/src/pages/Dashboard.tsx
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { Link, useSearchParams } from "react-router";
import postsApi from "../api/posts.api";
import Header from "../components/Header";
import type { PostPreview } from "../types/post";
import { apiFetch } from "../lib/apiFetch";

type SortValue = "updated-desc" | "updated-asc" | "title-asc" | "title-desc";

const Dashboard = () => {
  const [allPosts, setAllPosts] = useState<PostPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await postsApi.fetchAll();
        setAllPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const q = searchParams.get("q") ?? "";
  const sort = (searchParams.get("sort") as SortValue) ?? "updated-desc";
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value.trim()) next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateParam("q", e.target.value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateParam("sort", e.target.value);
  };

  const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateParam("from", e.target.value);
  };

  const handleToChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateParam("to", e.target.value);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const filteredPosts = useMemo(() => {
    const query = q.trim().toLowerCase();

    let result = allPosts.filter((post) => {
      const matchText =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query);

      const updated = new Date(post.updatedAt).getTime();
      const matchFrom = !from || updated >= new Date(`${from}T00:00:00`).getTime();
      const matchTo = !to || updated <= new Date(`${to}T23:59:59`).getTime();

      return matchText && matchFrom && matchTo;
    });

    result = [...result].sort((a, b) => {
      if (sort === "updated-desc") return +new Date(b.updatedAt) - +new Date(a.updatedAt);
      if (sort === "updated-asc") return +new Date(a.updatedAt) - +new Date(b.updatedAt);
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

    return result;
  }, [allPosts, q, from, to, sort]);

  const handleDelete = async (postId: number) => {
    if (!confirm('Are you sure?')) return;
    
    try {
      await apiFetch(`posts/${postId}/`, { method: "DELETE" });
      setAllPosts(prev => prev.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="px-4 py-6">
          <p className="text-sm text-gray-600">Loading posts...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="px-4 py-6">
        <section className="mx-auto w-full max-w-6xl">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">Posts</h2>
            <p className="text-sm text-gray-600">Manage your blog content.</p>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <input
              type="text"
              placeholder="Search posts..."
              value={q}
              onChange={handleSearchChange}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 lg:col-span-2"
            />

            <select
              value={sort}
              onChange={handleSortChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="updated-desc">Newest first</option>
              <option value="updated-asc">Oldest first</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
            </select>

            <input
              type="date"
              value={from}
              onChange={handleFromChange}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-2">
              <input
                type="date"
                value={to}
                onChange={handleToChange}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
              >
                Clear
              </button>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600">
              No posts found.
            </div>
          ) : (
            <>
              <div className="grid gap-3 md:hidden">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <h3 className="text-base font-semibold text-gray-900">{post.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{post.summary}</p>
                    <p className="mt-3 text-xs text-gray-500">
                      Updated: {new Date(post.updatedAt).toLocaleString()}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <Link
                        to={`/posts/${post.id}/edit`}
                        className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        type="submit"
                        onClick={() => handleDelete(post.id)}
                        className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="hidden overflow-x-auto rounded-lg border border-gray-200 bg-white md:block">
                <table className="min-w-full border-collapse text-sm">
                  <thead className="bg-gray-50 text-left text-gray-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Title</th>
                      <th className="px-4 py-3 font-semibold">Summary</th>
                      <th className="px-4 py-3 font-semibold">Last Updated</th>
                      <th className="px-4 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post) => (
                      <tr
                        key={post.id}
                        className={`border-t border-gray-200 ${post.published ? '' : 'bg-yellow-50'}`}
                      >
                        <td className="px-4 py-3 font-medium text-gray-900">{post.title}</td>
                        <td className="px-4 py-3">
                          <div className="line-clamp-2 text-gray-700">
                            {post.summary}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {new Date(post.updatedAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Link
                              to={`/posts/${post.id}/edit`}
                              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                            >
                              Edit
                            </Link>
                            <button
                              type="submit"
                              onClick={() => handleDelete(post.id)}
                              className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Dashboard;