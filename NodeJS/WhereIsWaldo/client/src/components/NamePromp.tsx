type Props = {
  saveName: (name: string) => void;
}

export default function NamePrompt({saveName}: Props) {
  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    saveName(name);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
      <form
        onSubmit={onSubmit}
        className="
          px-6 py-5 flex flex-col items-center gap-4 bg-white rounded
          shadow-[0_8px_0px_black] hover:shadow-[0_10px_0px_black] transition"
      >
        <label htmlFor="name" className="text-lg font-semibold">Enter your username!</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your username"
          className="border border-zinc-500 rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded w-fit px-4 py-2"
        >
          Save & Start
        </button>
      </form>
    </div>
  )
}