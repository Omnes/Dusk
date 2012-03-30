// eventuellet en kort delay innan den börjar öppnas
//gör så att man inte kan öppna dörren ifall man är ivägen eller ändra movementscriptet till fysikbaserat för mer realism och sån skit
//eventuellet gör en annan version animations baserad för lite mer kontroll, kanske blir mer jobb med animationer

var locked : boolean = false;
var key : GameObject;
private var keyName;
var open : boolean = false;
var closedAngle : float = 0;
var openAngle : float = 0;
var speed : float = 2;
var openSound: AudioClip;
var closeSound: AudioClip;
private var done : boolean = true;
private var target;
private var timer : float = 0;
var unlockSound : AudioClip;
var inTheWay=false;
private var uiCtrl;
var orgRot : Vector3;
//var delay : float = 0;
//var handles : GameObject[];
function Start(){

	if (open){
		transform.localRotation=Quaternion.Euler(transform.eulerAngles.x,openAngle,transform.eulerAngles.z);
	}
	uiCtrl = GameObject.Find("Main Camera").GetComponent("UiControl");
	if(key)
	keyName=key.name;
}

function Activate(fisk){
	if (!locked){
		open=!open;
		done=false;
		timer=0;
		if (open){
			audio.clip=openSound;
			//delay=1;
			target = Quaternion.Euler(transform.eulerAngles.x,openAngle+Random.Range(-10,10),transform.eulerAngles.z);
		}else{
			audio.clip=closeSound;
			target = Quaternion.Euler(transform.eulerAngles.x,closedAngle,transform.eulerAngles.z);
		}
		//audio.Stop();
		audio.Play();
		
	}else
	
	var failed = true;
	var playerinv = Camera.main.GetComponent("Inventory").invArray;
	for (var i : GameObject in playerinv){
		if (i==key){ 
			DaskadeBord(i);
			failed=false;
		}
	}
	if (failed)
	uiCtrl.DisplayText("Door locked",3);
}

function DaskadeBord(selected : GameObject){
	if (locked && selected.name == keyName){
		locked=false;
		audio.clip=unlockSound;
		audio.Play();
		uiCtrl.DisplayText("Door unlocked",3);
	}
}


function Update () {
	if(!done){
	
	if 	(transform.localRotation==Quaternion.Slerp(transform.localRotation,target,Time.deltaTime*speed) && !done)
		timer+=Time.deltaTime*2;
	if (timer>3)
		done=true;
		
	/*if (delay>0 && open){		****Gick inte, alla pivots sitter lite fel***
		//for (var han : GameObject in handles){
			handles[1].transform.localRotation=Quaternion.Slerp(handles[1].transform.localRotation,Quaternion.Euler(0, 30, 0),Time.deltaTime*speed);
		//}
		delay-=0.05;
		print(delay);
	}*/
	
	if (!done && !inTheWay)//&& delay<=0
		transform.localRotation=Quaternion.Slerp(transform.localRotation,target,Time.deltaTime*speed);
		
	}
}

function OnCollisionEnter(){
	inTheWay=true;
}

function OnCollisionExit(){
	inTheWay=false;
}

@script RequireComponent(AudioSource)
