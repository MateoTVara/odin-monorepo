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
    <form
      onSubmit={onSubmit}
      className="p-4 flex flex-col gap-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-90 rounded shadow-lg z-10"
    >
      <label htmlFor="name" className="text-lg font-semibold">Enter your name:</label>
      <input
        id="name"
        name="name"
        type="text"
        className="border rounded p-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2"
      >
        Save
      </button>
    </form>
  )
}