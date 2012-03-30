var navComp : NavMeshAgent;
var target : Transform;
var follow : boolean = false;
function Start(){	
	gameObject.Find("PartEmitter").active=false;
	gameObject.active=false;

}


function Update(){
	if (follow)
	navComp.SetDestination(target.position);
	else
	navComp.SetDestination(transform.position);
	
}

function OnTriggerEnter(other: Collider){
	other.gameObject.SendMessage("Down",this.gameObject);
}