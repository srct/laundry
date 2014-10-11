
var IDNames = new Array();
var IDs = new Array();

window.onload = function() {
	IDNames[0] = "Blue Ridge";
	IDNames[1] = "Commonwealth";
	IDNames[2] = "Dominion";
	IDNames[3] = "Hampton Roads";
	IDNames[4] = "Northern Neck";
	IDNames[5] = "Piedmont";
	IDNames[6] = "Adams";
	IDNames[7] = "Harrison";
	IDNames[8] = "Lincoln";
	IDNames[9] = "Rogers";
	IDNames[10] = "Shenandoah";
	IDNames[11] = "Tidewater";
	IDNames[12] = "White Top";

	IDs[0] = "6695";
	IDs[1] = "3841";
	IDs[2] = "3844";
	IDs[4] = "1010058";
	IDs[5] = "1008696";
	IDs[6] = "4576";
	IDs[7] = "4286";
	IDs[8] = "4291";
	IDs[9] = "1041239";
	IDs[10] = "6697";
	IDs[11] = "1008695";
	IDs[12] = "1008695";

	genHomePage();
}

function genHomePage() {
	var el = document.getElementById("content");

	for (i = 0; i < IDNames.length; ++i) {
		el.innerHTML += "<div id='" + i + "' class='laudromatNames' onmousedown='pushButton(this)'>" + IDNames[i] + "</div>";
	}
}

function pushButton(el) {
	window.location.href = "displayDetails.html#" + el.id;
}