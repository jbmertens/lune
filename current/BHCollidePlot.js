//Ploting javascript file

function run(){
   console.log("Running");
}



function go(){

  var data = {
  x:[1,2,3,4,5],
  y:[],
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'blue',
    size: 12
      }
  }

    var layout = {
      title: 'This is the Title',
      xaxis: {
        title: 'X-Axis',
        showgrid: true,
        zeroline: true
      },
      yaxis: {
        title: 'Y-Axis',
        showgrid: true,
        zeroline: true
      }
    };
    
    var update = {
      x: [data.x],
      y: [data.y]
    };

    Plotly.newPlot("graph", [data], layout);
    
    console.log("Running");
    _runsim();
    console.log("Done");

    var update = {
      x: [data.x],
      y: [data.y]
    };
    
    Plotly.restyle("graph", update);
}

var fx = document.getElementById("fx").value;

var i=0;

var min = _getSize(0);
var i2max = _getSize(1)-min;
var i1max = _getSize(2)-min;
var i0max = _getSize(3)-min;

for(let i2=min;i2<i2max;i2++){
    for(let i1=min;i1<i1max;i1++){
        for(let i0=min;i0<i0max;i0++){
            let idx = _getIDX3S(i0,i1,i2)
            var xCart[3];
            _getCart(i0,i1,i2,xCart)
            
            console.log("%e %e %e\n",xCart[1],xCart[2], _getCF(_getIDX4ptS(idx)));
            /*
            update.x[0][i] = _getCoordX(i);
            update.y[0][i] = _getCoordY(i);
            update.z[0][i] = _getCF(i);
            */
            i++
        }
    }
}

