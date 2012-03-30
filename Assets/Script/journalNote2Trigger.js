var activated: boolean = false;
var writeSound : AudioClip;
var text : String = "Note Found";
function OnTriggerEnter () {
	if (!activated && Camera.main.GetComponent("UiControl").journalEnabled==true){
		Camera.main.GetComponent("UiControl").journalFound+=1;
		activated=true;
		Camera.main.GetComponent("UiControl").DisplayText(text,3);
		if (writeSound!=null)
		GameObject.Find("Player").audio.PlayOneShot(writeSound);
	}
}
function OnDrawGizmos(){
	Gizmos.DrawIcon(transform.position,"TriggerGiz.png");
}