//Ploting javascript file

function go(){
    
  var data = {
  x:[],
  y:[],
  type: 'scatter'
  }
 
    
var fx = document.getElementById("fx").value;

var min = _getSize(0);
var i0max = _getSize(1)-min;
var i1max = _getSize(2)-min;
var i2max = _getSize(3)-min;
    
var layout= {
    xaxis: {
      range: [-1.4,1.4]
    },
    yaxis: {
      range: [-1.4,1.4]
    }
}

var i=0;
    
for(let i2=min;i2<i2max;i2++){
    for(let i1=min;i1<i1max;i1++){
        for(let i0=min;i0<i0max;i0++){
            let idx = _getIDX3S(i0,i1,i2);
            var xCart = [];
            xCart[0] = _getCart(i0,i1,i2,1);
            xCart[1] = _getCart(i0,i1,i2,2);
            console.log(xCart[0], xCart[1], _getIDX4ptS(fx,idx), _getCF(_getIDX4ptS(fx,idx)));
           
            /*
            data.z[0][i] = xCart[0];
            data.z[1][i] = xCart[1];
            data.z[2][i] = _getCF(_getIDX4ptS(fx,idx));
            */
            
                data.x[i]=xCart[0];
                data.y[i]=xCart[1];
            i++;
        }
    }
}
    
    Plotly.newPlot("graph", [data], layout);
};

function runSim(){
    console.log("Running");
   _runsim();
    console.log("Done");
};