// Position Variables

let socket = io("/test");
function setup() {
	socket.on("averages", function(xyzAvg){
		xAvg = xyzAvg.xAvg;
		yAvg = xyzAvg.yAvg;
		zAvg = xyzAvg.zAvg;
	  });
	  socket.on("update", function(client_arrays){
		cArrays = client_arrays;
		// console.log(cArrays);
	  });
	  socket.on("updateAvg", function(data){
		averages = data.averages;
		xTotal = data.xTotal;
		// console.log(cArrays);
	  });
}

function draw() {

}
