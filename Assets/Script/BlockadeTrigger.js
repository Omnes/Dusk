var block : GameObject[];
var master : GameObject;
function OnTriggerEnter (other : Collider) {
	if (other.gameObject.name == "Player")
		master.SendMessage("Passing",gameObject);
}