import formatDuration from "../utils/formatDuration";

export default function Leaderboard({ runs }: {
  runs: {
    name: string;
    startTime: string;
    finishTime: string;
  }[];
}) {
  return (
    <div className="p-4">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
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
              <tr key={index} className="border-t">
                <td className="px-4 py-3">{index + 1}</td>
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