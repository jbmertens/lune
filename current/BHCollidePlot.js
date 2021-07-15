//Ploting javascript file
var verbose = true;

var data = {
        x:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
          [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
        y:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
          [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
        z:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
          [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
    }
var fx;
var min;
var i0max;
var i1max;
var i2max;
var isRunning = true;
var n=0, i=0, j=0, k=0;
var N_final;

async function graphSlice(){

    if(n>N_final){
        isRunning = false;
    }
        
    if(isRunning){
        if(n%20 == 0 || n==0 || n==N_final) {
            if(verbose) console.log("Generating output for plotting", n);
            
            for(let i2=min;i2<i2max;i2++){
               for(let i1=min;i1<i1max;i1++){
                  for(let i0=min;i0<i0max;i0++){
                     let idx = _getIDX3S(i0,i1,i2);
                     var xCart = [];
                     xCart[0] = _getCart(i0,i1,i2,1);
                     xCart[1] = _getCart(i0,i1,i2,2);
                     console.log(xCart[0], xCart[1], _getIDX4ptS(fx,idx), _getFxVal(_getIDX4ptS(fx,idx)));
                        
                     data.x[j][i] = xCart[0];
                     data.y[j][i] = xCart[1];
                     data.z[j][i] = _getFxVal(_getIDX4ptS(fx,idx));
                     i++;
                  }
               }
            }
            
            if(verbose) console.log("Done generating output for plotting", n);
         
            console.log("j is: ", j);
            updateMesh(data.z[j], data.x[j], data.y[j]);
            await sleep(10);
            j++;
            
            
        }
        // run a step
        // plot the step?
        // store in the data variable (find a way to extend/append to data arrays)
        //     and increment numStepsStored? ...
        
        n++;
        //if(verbose) console.log("Taking step", n);
        _stepForward();
        //if(verbose) console.log("Done taking step", n);
        
        // might need to sleep for a bit?
        // await sleep(10); // << no idea
        // call graphSlice again...
        graphSlice();
    } 
}

// also add some control (buttons) to change the value of isRunning
// 

/*
function graphSlice(){
    
    k=0;
    // The main loop
    
    if(verbose) console.log("Setting up loop");

    var fx = document.getElementById("fx").value;

    var min = _getNGHOSTS(0);
    var i0max = _getNGHOSTS(1)-min;
    var i1max = _getNGHOSTS(2)-min;
    var i2max = _getNGHOSTS(3)-min;
    var i=0, j=0;
    var stepcount = 0;
    
    if(verbose) console.log("Looping");

    for(let n=0;n<=N_final;n++){
        
        if(n%1 == 0 || n==N_final) {
            imagestart[j]=i;
            if(verbose) console.log("Generating output for plotting", n);
            for(let i2=min;i2<i2max;i2++){
                for(let i1=min;i1<i1max;i1++){
                    for(let i0=min;i0<i0max;i0++){
                        let idx = _getIDX3S(i0,i1,i2);
                        var xCart = [];
                        xCart[0] = _getCart(i0,i1,i2,1);
                        xCart[1] = _getCart(i0,i1,i2,2);
                        console.log(xCart[0], xCart[1], _getIDX4ptS(fx,idx), _getFxVal(_getIDX4ptS(fx,idx)));
                        
                        data.x[j][i] = xCart[0];
                        data.y[j][i] = xCart[1];
                        data.z[j][i] = _getFxVal(_getIDX4ptS(fx,idx));
                        i++;
                    }
                }
            }
            if(verbose) console.log("Done generating output for plotting", n);
         
            updateMesh(data.z[j], data.x[j], data.y[j]);
            j++;
            
            console.log("j is: ", j);
        }
        if(verbose) console.log("Taking step", n);
        _stepForward();
        if(verbose) console.log("Done taking step", n);
        
    }
};
*/

async function animateSim(){
    k=0;
    for(var loop=0; loop<29; loop++){
        await nextSlice();
        await sleep(50);
    }
}

function nextSlice(){ 
    if(k==29){
        k=0;
    }
    updateMesh(data.z[k], data.x[k], data.y[k]);
    k++;
}

function runSim(){
  console.log("Running");
  _runsim();
  console.log("Done");
    
  N_final = _getNFinal();
  min = _getNGHOSTS(0);
  i0max = _getNGHOSTS(1)-min;
  i1max = _getNGHOSTS(2)-min;
  i2max = _getNGHOSTS(3)-min;
  fx = document.getElementById("fx").value;
};

function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}