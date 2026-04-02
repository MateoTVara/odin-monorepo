import formatDuration from "../utils/formatDuration";

export default function Leaderboard({ levelName, runs }: {
  levelName: string;
  runs: {
    name: string;
    startTime: string;
    finishTime: string;
  }[];
}) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md w-full max-w-2xl flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold text-center px-12 py-4 mb-4 bg-red-500 rounded text-white">
        {levelName} Leaderboard
      </h2>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-100 *:text-center">
            <th className="px-4 py-3 font-semibold">Rank</th>
            <th className="px-4 py-3 font-semibold">Player</th>
            <th className="px-4 py-3 font-semibold">Time</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run, index) => {
            const start = new Date(run.startTime).getTime();
            const finish = new Date(run.finishTime).getTime();
            const diff = finish - start;
            const elapsedTime = formatDuration(diff);

            return (
              <tr
                key={index} 
                className="
                  border-t border-t-neutral-300 *:text-center
                  hover:bg-green-100/50 transition-colors
                  [&:nth-child(1)>:nth-child(1)]:text-yellow-500
                  [&:nth-child(2)>:nth-child(1)]:text-slate-400
                  [&:nth-child(3)>:nth-child(1)]:text-amber-700"
              >
                <td className="px-4 py-3 font-bold text-slate-500">{index + 1}</td>
                <td className="px-4 py-3">{run.name}</td>
                <td className="px-4 py-3">{elapsedTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}