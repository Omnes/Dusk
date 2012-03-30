var saw : GameObject;
private var sawName;
var activated : boolean = false;
var soundEffect : AudioClip;
var journalWriteSound : AudioClip;
var text : String = "Note Found";

function Start(){
	sawName=saw.name;
}

function DaskadeBord (selected : GameObject) {
	if (selected == saw && !activated){//
		AudioSource.PlayClipAtPoint(soundEffect,transform.position);
		yield WaitForSeconds (soundEffect.length-.5);
		rigidbody.isKinematic=false;
		rigidbody.AddForce(Vector3.down*0.1);
		activated=true;

		Camera.main.GetComponent("UiControl").journalFound=3;
	    yield WaitForSeconds (2);
		GameObject.Find("Player").audio.PlayOneShot(journalWriteSound);
		Camera.main.GetComponent("UiControl").DisplayText(text,3);
	}
}

function Activate (AhhYeeessssThatIsExelllllent){ // copypasta till andra script som tar imot instrcutioner från dra functionen i inventoryn
	var playerinv = Camera.main.GetComponent("Inventory").invArray;
	for (var i : GameObject in playerinv){
		if (i==saw){ // byt ut saw mot vad nyckeln nu heter
			DaskadeBord(i);
			break;
		}
	}
}