function knightMoves(start, end) {
  if (Array.isArray(start) === false || Array.isArray(end) === false ||
      start.length !== 2 || end.length !== 2 ||
      Number.isInteger(start[0]) === false || Number.isInteger(start[1]) === false ||
      Number.isInteger(end[0]) === false || Number.isInteger(end[1]) === false) {
    console.log('Please provide valid coordinates in an array format, e.g., [0, 0]');
    return;
  }

  function isValidMove(x, y) {
    return (x >= 0 && x < 8 && y >= 0 && y < 8);
  }

  function getKnightMoves(x, y) {
    return [
      [x + 2, y + 1], [x + 2, y - 1],
      [x + 1, y + 2], [x + 1, y - 2],
      [x - 2, y + 1], [x - 2, y - 1],
      [x - 1, y + 2], [x - 1, y - 2]
    ]
  }

  const marked = Array(8).fill(null).map(() => Array(8).fill(false));
  const queue = [];
  const path = [];
  queue.push(start);
  path.push([start]);
  while (queue.length > 0) {
    let current = queue.shift();
    let currentPath = path.shift();

    if (current[0] === end[0] && current[1] === end[1]) {
      console.log(`You made it in ${currentPath.length - 1} moves!  Here's your path:`);
      currentPath.forEach(step => console.log(`    [${step[0]},${step[1]}]`));
      return;
    }

    if (!marked[current[0]][current[1]]){
      marked[current[0]][current[1]] = true;
      for (const move of getKnightMoves(current[0], current[1])) {
        if (isValidMove(move[0], move[1]) && !marked[move[0]][move[1]]){
          queue.push(move);
          path.push([...currentPath, move]);
        }
      }
    }
  }
  return "Not path found.";
}

knightMoves([3,3],[4,3]);