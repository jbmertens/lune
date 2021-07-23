// Javascript file to plot simulation data

// Turns on/off debugging comments
var verbose = false;

// Various global variables
var runonce=false;
var fx, min, i0max, i1max, i2max, i0MIN, i1mid, i2mid;
var n, i, j, q, isRunning, firstRun, N_final;
var xdata=[], ydata=[], zdata=[];
var xinfo=[], yinfo=[];

for(let width=0; width<24; width++){
    zdata[width] = [];
    for(let length=0; length<29; length++){
        xdata[length] = [];
        ydata[length] = [];
        zdata[width][length] = [];
    }
}

// Updates the plot when different fields are selected
function changeUp(){
    if(runonce){
        fx = document.getElementById("fx").value;
        updateMesh(zdata[fx][0], xdata[0], ydata[0]);
    }
};

function stopSim(){
    isRunning = false;
};

// Progress bar
var q = 0;
function move() {
    if (q == 0) {
        q++;
        var elem = document.getElementById("progressDisplay");
        var width = 3;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                q = 0;
            } else {
                width = width + 2;
                elem.style.width = width + "%";
            }
        }
    }
};

// Main function that runs the simulation and records data into xdata,ydata,zdata
async function graphSlice(){
    if(n>N_final){
        isRunning = false;
    }
    
    if(isRunning){
        if(n%20 == 0) {
            if(verbose) console.log("Generating output for plotting", n);
            
            i=0;
            for(let i2=min;i2<i2max;i2++){
               for(let i1=min;i1<i1max;i1++){
                  for(let i0=min;i0<i0max;i0++){
                     let idx = _getIDX3S(i0,i1,i2);
                     var xCart = [];
                     xCart[0] = _getCart(i0,i1,i2,1);
                     xCart[1] = _getCart(i0,i1,i2,2);
                     xdata[j][i] = xCart[0];
                     ydata[j][i] = xCart[1];
                     for(let k=0; k<24; k++){
                         zdata[k][j][i] = _getFxVal(_getIDX4ptS(k,idx));
                     }    
                     if(verbose) console.log(xCart[0], xCart[1], _getIDX4ptS(fx,idx), _getFxVal(_getIDX4ptS(fx,idx)));
                     i++;
                  }
               }
            }
            
            if(verbose) console.log("Done generating output for plotting", n);
            updateMesh(zdata[fx][j], xdata[j], ydata[j]);
            await sleep(10);
            j++; 
            move();
        }

        if(verbose) console.log("Taking step", n);
        _stepForward();
        if(verbose) console.log("Done taking step", n);
        
        if(n==N_final){
            if(verbose) console.log("Generating output for plotting", n);
            i=0;
            for(let i2=min;i2<i2max;i2++){
               for(let i1=min;i1<i1max;i1++){
                  for(let i0=min;i0<i0max;i0++){
                     let idx = _getIDX3S(i0,i1,i2);
                     var xCart = [];
                     xCart[0] = _getCart(i0,i1,i2,1);
                     xCart[1] = _getCart(i0,i1,i2,2);
                     xdata[j][i] = xCart[0];
                     ydata[j][i] = xCart[1];
                     for(let funct=0; funct<24; funct++){
                         zdata[funct][j][i] = _getFxVal(_getIDX4ptS(funct,idx));
                     }    
                     if(verbose) console.log(xCart[0], xCart[1], _getIDX4ptS(fx,idx), _getFxVal(_getIDX4ptS(fx,idx)));
                     i++;
                  }
               }
            }
            if(verbose) console.log("final ran", n);
            updateMesh(zdata[fx][j], xdata[j], ydata[j]);
            await sleep(10);
            j++; 
            move();
        }
        n++;
        graphSlice();
    }
    
    if(isRunning==false){
        document.getElementById("stopButton").disabled = true;
        document.getElementById("stopButton").style.cursor = "default";
        document.getElementById("nextButton").disabled = false;
        document.getElementById("nextButton").style.cursor = "pointer";
        document.getElementById("animateButton").disabled = false;
        document.getElementById("animateButton").style.cursor = "pointer";
        document.getElementById("progressBar").style.visibility = "hidden";
    }
};

//Moves plot forward one timestep in current function
function nextSlice(){
    if(q==29){
        q=0;
    }
    updateMesh(zdata[fx][q], xdata[q], ydata[q]);
    q++;
}

//Animates through all timesteps for current function
async function animateSim(){
    q=0;
    for(var loop=0; loop<29; loop++){
        await nextSlice();
        await sleep(50);
    }
};

//Initializes variables and simulation
function runSim(){
    document.getElementById("stopButton").disabled = false;
    document.getElementById("stopButton").style.cursor = "pointer";
    document.getElementById("nextButton").disabled = true;
    document.getElementById("nextButton").style.cursor = "default";
    document.getElementById("animateButton").disabled = true;
    document.getElementById("animateButton").style.cursor = "default";
    document.getElementById("progressBar").style.visibility = "visible";
    if(verbose) console.log("Running");
    // _initialize(72,12,2,1.0);
    _runsim();
    if(verbose) console.log("Done");

    N_final = 559; //_getNFinal();
    min = _getNGHOSTS(0);
    i0MIN=_getNGHOSTS(0); // In spherical, r=Delta r/2.
    i1mid= _getNGHOSTS(2)/2;
    i2mid= _getNGHOSTS(3)/2;
    i0max = _getNGHOSTS(1)-min;
    i1max = _getNGHOSTS(2)-min;
    i2max = _getNGHOSTS(3)-min;
    fx = document.getElementById("fx").value;
    isRunning = true;
    n=0;
    i=0;
    j=0;
    q=0;
    runonce=true;

    graphSlice();
};

// Needed for plot to display in time
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
};
