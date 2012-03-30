var blocks : GameObject[];

function OnTriggerEnter(other : Collider){
	if (other.gameObject.name=="Player"){
		for (var b : GameObject in blocks){
			if(b.active){
				b.SendMessage("Go",0);
			}
		}
	}
}

function OnTriggerExit(other : Collider){
	if (other.gameObject.name=="Player"){
		for (var b : GameObject in blocks){
			if(b.active){
				b.SendMessage("Abort",0);
			}
		}
	}
}

