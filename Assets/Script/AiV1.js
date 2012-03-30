
// player måste vara på lager 9 - Player


var state : AiState;
enum AiState {Spawn,Chase,Walk,Teleport,Despawn}
private var player : GameObject; 
function Start(){
	player = GameObject.Find("Player");
	Think();
}

function Think(){
	var layerMask : int = ~( 1 << 9 );
	while (true){
		// kan jag se spelaren?
		var hit : RaycastHit;
		if (!Physics.CapsuleCast(transform.position,player.transform.position,.25,transform.direction,hit,900,layerMask)){
			state = AiState.Chase;
			print("yeup");
		}else{
			state = AiState.Walk;
			print("noap " + hit.gameObject);
		}
		//Perform();
	}
	
}

function Perform(){
	
}

