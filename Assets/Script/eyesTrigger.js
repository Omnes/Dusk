var eyes : GameObject ;
var activated : boolean = false;
function OnTriggerStay () {
	if (GameObject.Find("Player").GetComponent("Flashlight").flashlightOn && activated == false){
		for (var child: Transform in eyes.transform){
			child.renderer.enabled = false;
		}
		activated = true;
	}
}