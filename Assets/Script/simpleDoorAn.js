//behöver lite animationer för att få denna att funka
//gör så att man inte kan öppna dörren ifall man är ivägen eller ändra movementscriptet till fysikbaserat för mer realism och sån skit... naah buggar för hårt, gör nått så man blir bort pushad eller inte kan öppna alls
//

var locked : boolean = false;
var key : GameObject;
var open : boolean = false;
var closeAnimation : String;
var openAnimation : String;
var openSound: AudioClip;
var closeSound: AudioClip;

function Start(){
	if (open){
		animation.Play(openAnimation);
		animation[openAnimation].time=animation[openAnimation].length;
	}
}

function Activate(fisk){
	if (!locked){
		open=!open;
		if (open){
			animation.Play(openAnimation);
			audio.clip=openSound;
		}else{
			animation.Play(closeAnimation);
			audio.clip=closeSound;
		}
		audio.Play();
		yield WaitForSeconds (animation.clip.length);
		animation.Stop();
	}
}

function DaskadeBord(selected : GameObject){
	if (locked && selected == key){
		locked=false;
	}
}




