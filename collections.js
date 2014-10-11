if(Meteor.isServer) {
	Meteor.publish('machineData', function() {
		var machines = getMachineData();

		_.each(machines, function(machine){
			var doc = {
				room: ,
			    id: machine.id,
			    status: ,
			    timeRemaining: ,
			    type: ;
			};
			self.added('machineData', Random.id(), doc);	
		});
		self.ready();
	});
}

var IDNames = new Array();
var IDs = new Array();
var jsonTxt = "";

function queryFromID(id, num) {
	$.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22" + 
		"http%3A%2F%2Fgmu.esuds.net%2FRoomstatus%2FmachineStatus.i%3FbottomLocationId%3D" + id + "%22&diagnostics=true", function(data) {
		getResponse(data, num);
	});
}

function getResponse(response, num) {
	var els = response.getElementsByClassName("room_status")[0].getElementsByTagName("tr");

	for (i = 0; i < els.length; ++i) {
		var name = els[i].className;

		if (name != "even" && name != "odd")
			continue;

		var laundroMatName = IDNames[num];
		//var id = els[i].getElementsByTagName("td")[1].getElementsByTagName("p")[0].innerHTML;
		var type = els[i].getElementsByTagName("td")[2].getElementsByTagName("p")[0].innerHTML;
		var status = els[i].getElementsByTagName("td")[3].getElementsByTagName("font")[0].innerHTML;
		var time = els[i].getElementsByTagName("td")[4].getElementsByTagName("p")[0].innerHTML;
		jsonTxt += "{ 'room':'"+laundroMatName+"', 'id':'0', 'status':'"+status+"', 'type':'"+type+"', 'time':'"+time+"' }";
	}
}

function machineData() {
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

	for (i = 0; i < 12; ++i)
	{
		queryFromID(IDs[i], i);
	}
}
