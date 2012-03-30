var waypoints = Array();
var connected = Array();


function Awake(){
	BuildWaypointList();
}

@ContextMenu ("Update Waypoints")
function UpdateWaypoints () {
	BuildWaypointList();
}

function BuildWaypointList () {
	var objects : Object[] = FindObjectsOfType(WaypointCtrl);
	waypoints =  Array(objects);
	for (var point : WaypointCtrl in waypoints){
		point.CalcConnected();
	}
}

function CalcConnected(){
	connected = Array();
	
	for (var other : WaypointCtrl in waypoints){
		if (other == this)
			continue;
		if (!Physics.CheckCapsule(transform.position, other.transform.position, .25)) {
			connected.Add(other);
		}	
		
	}
}

function OnDrawGizmos(){
	Gizmos.DrawIcon(transform.position,"WaypointGiz.png");
}

function OnDrawGizmosSelected () {
	if (waypoints.length == 0)
		BuildWaypointList();
	for (var p : WaypointCtrl in connected) {
		if (Physics.Linecast(transform.position, p.transform.position)) {
			Gizmos.color = Color.red;
			Gizmos.DrawLine (transform.position, p.transform.position);
		} else {
			Gizmos.color = Color.green;
			Gizmos.DrawLine (transform.position, p.transform.position);
		}
	}
}