
var ljud1 : AudioClip;
var delay : float = 1.0;
var ljud2 : AudioClip;
var DoorsToUnlock : GameObject[];
var activated : boolean = false;


function Activate (trehundraHjalplosaKryckorHaltadOverVagen) {
	if (!activated){
		audio.PlayOneShot(ljud1);
		yield WaitForSeconds(ljud1.length+delay);
		audio.PlayOneShot(ljud2);
		activated = true;
		Camera.main.GetComponent("UiControl").journalFound+=1;
		for (var h : GameObject in DoorsToUnlock){
			if (h.GetComponent("simpleDoorSc").locked!=null)
				h.GetComponent("simpleDoorSc").locked=false;
		}
	}
	
}