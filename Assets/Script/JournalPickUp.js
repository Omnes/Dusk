var scarySound : AudioClip;
var plotItemAppearing : GameObject;

function Start(){
	plotItemAppearing.active=false;
}

function Activate () {
	Camera.main.GetComponent("UiControl").journalEnabled = true;
	var soundPos = GameObject.Find("Player").transform.position-GameObject.Find("Player").transform.forward*5;
	AudioSource.PlayClipAtPoint(scarySound,soundPos);
	gameObject.active=false;
	plotItemAppearing.active = true;
}