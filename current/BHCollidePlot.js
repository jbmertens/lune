//Ploting javascript file
var verbose = false;

function graphSlice(){
        
    var data = {
        x:[],
        y:[],
        z:[]
    }
  
    // The main loop
    
    if(verbose) console.log("Setting up loop");

    var N_final = _getNFinal();
    var fx = document.getElementById("fx").value;

    var min = _getNGHOSTS(0);
    var i0max = _getNGHOSTS(1)-min;
    var i1max = _getNGHOSTS(2)-min;
    var i2max = _getNGHOSTS(3)-min;
    var i=0;
    
    if(verbose) console.log("Looping");

    for(let n=0;n<=N_final;n++){
        
        if(n%100 == 0 || n==N_final) {
            if(verbose) console.log("Generating output for plotting", n);
            for(let i2=min;i2<i2max;i2++){
                for(let i1=min;i1<i1max;i1++){
                    for(let i0=min;i0<i0max;i0++){
                        let idx = _getIDX3S(i0,i1,i2);
                        var xCart = [];
                        xCart[0] = _getCart(i0,i1,i2,1);
                        xCart[1] = _getCart(i0,i1,i2,2);
                        console.log(xCart[0], xCart[1], _getIDX4ptS(fx,idx), _getFxVal(_getIDX4ptS(fx,idx)));
                        
                        data.x[i] = xCart[0];
                        data.y[i] = xCart[1];
                        data.z[i] = _getFxVal(_getIDX4ptS(fx,idx));
                        i++;
                    }
                }
            }
            if(verbose) console.log("Done generating output for plotting", n);
            updateMesh(data.z, data.x, data.y);
        }
        if(verbose) console.log("Taking step", n);
        _stepForward();
        if(verbose) console.log("Done taking step", n);
    }

    
};

function runSim(){
  console.log("Running");
  _runsim();
  console.log("Done");
};