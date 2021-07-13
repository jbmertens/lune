//Ploting javascript file
var count=0;

var verbose = true;

function graphSlice(){
/*
    if (count==0){
        
    var data = {
        x:[],
        y:[],
        type: 'scatter'
    }

    Plotly.newPlot("graph", [data]);
    count++;
      
    var update = {
        x: [data.x],
        y: [data.y]
    }
    
 */   
    // The main loop
    
    if(verbose) console.log("Setting up loop");

    var N_final = _getNFinal();
    var fx = document.getElementById("fx").value;

    var min = _getNGHOSTS(0);
    var i0max = _getNGHOSTS(1)-min;
    var i1max = _getNGHOSTS(2)-min;
    var i2max = _getNGHOSTS(3)-min;

    var i=0;
    var j=0;

    if(verbose) console.log("Looping");

    for(let n=0;n<=N_final;n++){
        
        if(n%100 == 0 || n==N_final) {
            j++;
            if(verbose) console.log("Generating output for plotting", n);
            for(let i2=min;i2<i2max;i2++){
                for(let i1=min;i1<i1max;i1++){
                    for(let i0=min;i0<i0max;i0++){
                        let idx = _getIDX3S(i0,i1,i2);
                        var xCart = [];
                        xCart[0] = _getCart(i0,i1,i2,1);
                        xCart[1] = _getCart(i0,i1,i2,2);
                        console.log(xCart[0], xCart[1], _getIDX4ptS(fx,idx), _getFxVal(_getIDX4ptS(fx,idx)));
                        //data.x[i] = xCart[0];
                        //data.y[i] = xCart[1];
                        //data.y[i] = _getCF(_getIDX4ptS(fx,idx));
                        //i++;
                    }
                }
            }
            if(verbose) console.log("Done generating output for plotting", n);
        }

        if(verbose) console.log("Taking step", n);
        _stepForward();
        if(verbose) console.log("Done taking step", n);
    }

    //Plotly.restyle("graph",update);
};

function runSim(){
  console.log("Running");
  _runsim();
  console.log("Done");
};