function fibs(n) {
  if (n === 0) return [0];
  
  const fibs = [0, 1];

  if (n === 1) return fibs;
  
  for (let i = 2; i < n; i++){
    fibs.push(fibs[i-1] + fibs[i-2]);
  }

  return fibs;
}

function fibsRec(n){
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  return [...fibsRec(n-1), fibsRec(n-1)[fibsRec(n-1).length - 1] + fibsRec(n-1)[fibsRec(n-1).length - 2]] 
}


console.log(fibs(8));
console.log(fibsRec(8));