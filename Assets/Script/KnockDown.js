#pragma strict
var moveScript : CharmovePhy;

function Start () {

}

function Down (what : GameObject) {
	moveScript.canControl = false;
	rigidbody.freezeRotation = false;
	var d = transform.position - what.transform.position;
    rigidbody.AddForceAtPosition(d.normalized, transform.position+Vector3(0,1,0),ForceMode.Impulse);
}
function GetUp(){
	if (transform.rotation.z == 0 && transform.rotation.x == 0){
		moveScript.canControl = true;
		rigidbody.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationY;
	}
}