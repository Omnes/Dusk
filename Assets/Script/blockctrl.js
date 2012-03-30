
function Go(asdf){
	collider.enabled=true;
	particleSystem.Play();
}

function Abort(asdf){
	yield WaitForSeconds(5);
	collider.enabled=false;
	particleSystem.Stop();
}

function OnTriggerEnter(other : Collider){
	if (other.name=="Player"){
		other.gameObject.GetComponent("Death_v2").Damage(2);
	}
}