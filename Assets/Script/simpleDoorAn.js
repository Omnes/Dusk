//beh�ver lite animationer f�r att f� denna att funka
//g�r s� att man inte kan �ppna d�rren ifall man �r iv�gen eller �ndra movementscriptet till fysikbaserat f�r mer realism och s�n skit... naah buggar f�r h�rt, g�r n�tt s� man blir bort pushad eller inte kan �ppna alls
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




