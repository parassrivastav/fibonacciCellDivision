/*starting with a single cell that takes 2 seconds to reach reproductive matrurity
and then reproduces(divides) at a reproductivce cycle of 1 sec, in this situation
the population growth happens in fibonacci series, i.e the population is a fibonacci number
at the end of a reprod cycle*/

let substrate = [];//array that holds the total population of cell instances
let startTime = new Date();
class cell {

    createdAt = new Date();
    mature = false;
    timeToMature = 2000;
    reproductionCycleTime = 1000;
    lastReproduced = 0;

    constructor() {
        this.setmature();
    }

    setmature() {
      let that = this;
      setTimeout(function(){
        that.mature = true;
      },that.timeToMature)
    }

    reproduce() {
        let now = new Date();
        if (this.mature && ((now - this.lastReproduced) >= this.reproductionCycleTime)) {
          let offSpring = new cell();
          substrate.push(offSpring);
          this.lastReproduced = now;
        }
    }
}


let parent = new cell();//first cell
substrate.push(parent)
let totalCount = 1;
console.log("time: ",0, " ms , population: ",substrate.length);

let deltaT = 100;
setInterval(function(){ //this function runs every delta T and causes mature cells which have completed a reproductive cycle to reproduce and update the substrate array.
  for (let i = 0; i < substrate.length; i++) {
    substrate[i].reproduce();
  }
  if (totalCount<substrate.length) {
    let msg = "";
    if (isFibonacci(substrate.length)) {
      msg = "fibonacci"
    }
    console.log("time: ",new Date()-startTime, " ms , population: ",substrate.length, " ",msg);
    totalCount = substrate.length;
  }
},deltaT);


function isPerfectSquare( x)
{
    let s = parseInt(Math.sqrt(x));
    return (s * s == x);
}

function isFibonacci( n)
{
    // n is Fibinacci if one of 5*n*n + 4 or 5*n*n - 4 or both
    // is a perferct square
    return isPerfectSquare(5 * n * n + 4) ||
           isPerfectSquare(5 * n * n - 4);
}
