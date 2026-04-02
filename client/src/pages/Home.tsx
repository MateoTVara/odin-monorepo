import type { Level } from "../features/levels/levels.types";
import { Link } from "react-router";
import levelsApi from "../features/levels/levels.api";
import useAsync from "../hooks/useAsync";
import InterpolatedSpan from "../components/InterpolatedSpan";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";

export default function Home() {
  const { data: levels, loading, error } = useAsync<Level[]>(levelsApi.getLevels)

  if (loading) return <PageLoading />;

  if (error) {
    console.error("Error loading levels:", error);
    return <PageError message="Failed to load levels. Please try again later." />;
  }

  if (!levels || levels.length === 0) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold text-center mb-4">No levels available</h2>
      <p className="text-lg text-center">Please check back later for new puzzles!</p>
    </div>
  );

  return (
    <div className="container mx-auto pl-2 pr-3 py-2 lg:py-4">
      <div className="
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4

        md:[&>*:nth-child(2n+1)]:shadow-[-6px_6px_0px_black]
        md:[&>*:nth-child(2n+1):hover]:shadow-[-8px_8px_0_black]
        md:[&>*:nth-child(2n)]:shadow-[6px_6px_0px_black]
        md:[&>*:nth-child(2n):hover]:shadow-[8px_8px_0_black]

        lg:[&>*:nth-child(3n+1)]:shadow-[-6px_6px_0px_black]
        lg:[&>*:nth-child(3n+1):hover]:shadow-[-8px_8px_0_black]
        lg:[&>*:nth-child(3n+2)]:shadow-[0px_6px_0px_black]
        lg:[&>*:nth-child(3n+2):hover]:shadow-[0px_8px_0_black]
        lg:[&>*:nth-child(3n)]:shadow-[6px_6px_0px_black]
        lg:[&>*:nth-child(3n):hover]:shadow-[8px_8px_0_black]
      ">
        {levels.map((level) => (
          <Link
            key={level.id}
            to={`/levels/${level.id}`}
            className="
            rounded-lg overflow-hidden border border-black transition
            shadow-[6px_6px_0px_black] hover:shadow-[8px_8px_0_black]
            "
          >
            <img src={level.imgUrl} alt={level.name} className="w-full h-48 object-cover" />
            <div className="p-3 bg-zinc-50">
              <h2 className="text-lg lg:text-xl font-semibold w-fit mx-auto">{level.name}</h2>
            </div>
          </Link>
        ))}
      </div>
      <div
        className="
        p-4 mt-8 rounded-lg border border-black transition
        shadow-[6px_6px_0px_black] hover:shadow-[8px_8px_0_black]
        bg-neutral-100
        "
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Play Where's Waldo Online - Find{" "}
          <InterpolatedSpan text="Wally" colors={["#DE3930", "#FFF3B0"]}/>,{" "}
          <InterpolatedSpan text="Odlaw" colors={["#F3E01E", "black"]}/>,{" "}
          <InterpolatedSpan text="Wizard" colors={["#EE2223", "#2D9EDF"]}/>,{" "}
          <InterpolatedSpan text="Wenda" colors={["#DE3930", "#FFF3B0"]}/>,{" "}
          in Puzzle
        </h2>
        <p className="text-lg">
          Welcome to the ultimate Where's Waldo online experience! Dive into our collection of challenging puzzles and
          test your observation skills as you search for Wally, Odlaw, Wizard, and Wenda. Each puzzle is packed with 
          vibrant scenes and hidden characters, providing hours of fun for fans of all ages. Whether you're a seasoned 
          Waldo hunter or new to the game, our online platform offers an engaging and interactive way to enjoy the 
          classic Where's Waldo adventures. Start exploring now and see if you can find them all!
        </p>
      </div>
    </div>
  );
}