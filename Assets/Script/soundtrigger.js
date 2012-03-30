// behöver en audiosource på samma trigger som detta ligger på samnt
// gör collidern till en trigger och ta bort mesh renderer

private var ljud : AudioSource = null;
var ljudKlipp : AudioClip; // ljudet som ska loopas
var fadeing : boolean = false;
function Awake(){
	ljud=GetComponent(AudioSource);
	ljud.clip=ljudKlipp;
}

function OnTriggerEnter () {
	//fapfapfapfapfapfap
	ljud.Play();
	ljud.loop = true;
	if (fadeing)
	fade(true);
}

function OnTriggerExit () {
	//pafpafpafpafpafpaf
	ljud.loop = false;
	if (fadeing)
	fade(false);
}


function fade(goat : boolean){
	var target;
	if (goat)
	target = 1;
	else 
	target = 0;
	
	while (ljud.volume!=target){
		if (ljud.volume>target)
			ljud.volume-=0.5*Time.deltaTime;
		if (ljud.volume<target)
			ljud.volume+=0.5*Time.deltaTime;
		yield;
	}
}

function OnDrawGizmos(){
	Gizmos.DrawIcon(transform.position,"TriggerGiz.png");
}