
var IDNames = new Array();
var IDs = new Array();

var index = 0;

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
	IDs[1] = "3842";
	IDs[2] = "3844";
	IDs[3] = "1041358";
	IDs[4] = "1010058";
	IDs[5] = "1008697";
	IDs[6] = "4292";
	IDs[7] = "4285";
	IDs[8] = "4291";
	IDs[9] = "1041239";
	IDs[10] = "6697";
	IDs[11] = "1008695";
	IDs[12] = "1041237";

	index = parseInt(window.location.hash.substr(1));
	document.getElementById("title").innerHTML = IDNames[index] + " Laundromat";

	queryFromID(IDs[index]);
	window.setInterval(function() { queryFromID(IDs[index]) }, 30000);
}

function queryFromID(id) {
	$.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22" + 
		"http%3A%2F%2Fgmu.esuds.net%2FRoomstatus%2FmachineStatus.i%3FbottomLocationId%3D" + id + "%22&diagnostics=true", function(data) {
		doStuff(data);
	});
}

function doStuff(response) {
	var els = response.getElementsByClassName("room_status")[0].getElementsByTagName("tr");
	//alert(els.getElementsByClassName("odd")[0].getElementsByTagName("td")[1].getElementsByTagName("p")[0].innerHTML);

	document.getElementById("washers").getElementsByClassName("icons")[0].innerHTML = "";
	document.getElementById("washerdryers").getElementsByClassName("icons")[0].innerHTML = "";
	document.getElementById("dryers").getElementsByClassName("icons")[0].innerHTML = "";
	document.getElementById("stackeddryers").getElementsByClassName("icons")[0].innerHTML = "";

	for (i = 0; i < els.length; ++i) {
		var name = els[i].className;

		if (name != "even" && name != "odd")
			continue;

		var type = els[i].getElementsByTagName("td")[2].getElementsByTagName("p")[0].innerHTML;
		var status = els[i].getElementsByTagName("td")[3].getElementsByTagName("font")[0].innerHTML;
		var time = els[i].getElementsByTagName("td")[4].getElementsByTagName("p")[0].innerHTML;

		var div;
		if (type == "Washer")
			div = document.getElementById("washers");
		else if (type == "Dryer")
			div = document.getElementById("dryers");
		else if (type == "Stacked Washer/Dryer")
			div = document.getElementById("washerdryers");
		else if (type == "Stacked Dryer")
			div = document.getElementById("stackeddryers");

		div = div.getElementsByClassName("icons")[0];

		if (status == "Available")
			div.innerHTML += "<img src='img/washer_available.png'></img>";
		else if (status == "Cycle Complete")
			div.innerHTML += "<img src='img/cycle_complete.png'></img>";
		else if (status == "Unavailable")
			div.innerHTML += "<img src='img/unavailable.png'></img>";
		else if (status == "In Use") {
			var imgToLoad = "";

			var mins_left = parseInt(time);
			//alert(mins_left);
			if (mins_left > 45)
				imgToLoad = "img/clock_60.png";
			else if (mins_left > 30)
				imgToLoad = "img/clock_45.png";
			else if (mins_left > 15)
				imgToLoad = "img/clock_30.png";
			else
				imgToLoad = "img/clock_15.png";

			div.innerHTML += "<img src='" + imgToLoad + "'></img>";
		}
	}

	if (document.getElementById("washers").getElementsByClassName("icons")[0].innerHTML == "")
		document.getElementById("washers").getElementsByClassName("titlebar")[0].innerHTML = "";

	if (document.getElementById("washerdryers").getElementsByClassName("icons")[0].innerHTML == "")
		document.getElementById("washerdryers").getElementsByClassName("titlebar")[0].innerHTML = "";

	if (document.getElementById("dryers").getElementsByClassName("icons")[0].innerHTML == "")
		document.getElementById("dryers").getElementsByClassName("titlebar")[0].innerHTML = "";

	if (document.getElementById("stackeddryers").getElementsByClassName("icons")[0].innerHTML == "")
		document.getElementById("stackeddryers").getElementsByClassName("titlebar")[0].innerHTML = "";
}