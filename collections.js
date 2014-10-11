if(Meteor.isServer) {
	Meteor.publish('machineData', function() {
		var machines = getMachineData();

		_.each(machines, function(machine){
			var doc = {
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

function machineData() {

}
