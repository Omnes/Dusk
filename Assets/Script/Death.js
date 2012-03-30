var sadMusic : AudioClip; // :(
var loop : boolean = true;
var grunts : AudioClip[];
var gameOverTexture : Texture2D;
var backTexture : Texture2D; //En 1x1 Textur med valfri färg (svart/röd förslagsvis)
var fadeSpeed : float = 0.2;
var dead : boolean = false;
var alpha : float = 0;
var position : Rect;

function Awake(){

	position = Rect((Screen.width -gameOverTexture.width)/2,(Screen.height -gameOverTexture.height)/2,gameOverTexture.width,gameOverTexture.height);
	
}

function OnGUI () {
	GUI.depth=0;
	GUI.color.a=alpha;
	if (dead){
		//pos = ;
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),backTexture,ScaleMode.StretchToFill);
		GUI.DrawTexture(position,gameOverTexture,ScaleMode.StretchToFill);

	}
	
}

function Update(){
	if (alpha<1)
		alpha+=Time.deltaTime*fadeSpeed;
}


function Die(fisk : float){
	if (!dead){
		player = GameObject.Find("Player");
		player.GetComponent("Cameractrl").disabled=true;
		GameObject.Find("Main Camera").GetComponent("Cameractrl").disabled=true;
		player.GetComponent("CharmovePhy").canControl=false;
		var soundclip = Random.Range(0,grunts.length);
			player.audio.PlayOneShot(grunts[soundclip]);
		if (sadMusic!=null){
			player.audio.clip=sadMusic;
			if(loop)
				player.audio.loop=true;	
			else
				player.audio.loop=false;	
			player.audio.Play();
		}
		dead = true;
	}
}