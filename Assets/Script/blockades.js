var AList : GameObject[];
var BList : GameObject[];
var CList : GameObject[];
var monster : GameObject;
private var player;

function Start(){
	for (var b : GameObject in AList){
		b.active=false;
	}
		for (var b : GameObject in BList){
		b.active=false;
	}
		for (var b : GameObject in CList){
		b.active=false;
	}
	player = GameObject.Find("Player");
	gameObject.active=false;
}
function OnTriggerEnter(other : Collider){
	if (other.gameObject == player){
		switch(Random.Range(1,1)){
			case 1:
				for (var b : GameObject in AList){
					b.active=true;
				}
			break;
			case 2:
				for (var b : GameObject in BList){
					b.active=true;
				}
			break;
			case 3:
				for (var b : GameObject in CList){
					b.active=true;
				}
			break;
		}
		monster.active=true;
		monster.Find("PartEmitter").active=true;
	}
}
