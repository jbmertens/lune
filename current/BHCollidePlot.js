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
    
    for(var i=0; i<6; i++){
    update.x[0][i] = _getCoord(i);
    update.y[0][i] = _getCF(i);
  }
    
    var update = {
      x: [data.x],
      y: [data.y]
    };
    
    Plotly.restyle("graph", update);
}

