#pragma strict
var hp : int = 2;
var moveScript : CharmovePhy;


function Damage( d : int){
	print("Took Damage " + d + ", "+ (hp-d) + " hp left");
	hp-=d;
	if (hp<=0){
		Die();
	}
}

function Die () {
	moveScript.canControl = false;
	rigidbody.freezeRotation = false;
}