// eventuellet en kort delay innan den börjar öppnas
//gör så att man inte kan öppna dörren ifall man är ivägen eller ändra movementscriptet till fysikbaserat för mer realism och sån skit
//eventuellet gör en annan version animations baserad för lite mer kontroll, kanske blir mer jobb med animationer
var door_1 : GameObject;
var door_2 : GameObject;
var locked : boolean = false;
var key : GameObject;
private var keyName;
var open : boolean = false;
var originalAngle : float;
var openAngle : float = 100;
var speed : float = 2;
var openSound: AudioClip;
var closeSound: AudioClip;
private var done : boolean = true;
var target1;
var target2;
var timer : float = 0;
var unlockSound : AudioClip;
var inTheWay=false;
private var uiCtrl;
function Start(){
	originalAngle = door_1.transform.eulerAngles.z;
	if (open){
		door_1.transform.localRotation=Quaternion.Euler(0,0,openAngle);
		door_2.transform.localRotation=Quaternion.Euler(0,0,openAngle);
	}/*else{
		door_1.transform.localRotation=Quaternion.Euler(0,0,originalAngle);
		door_2.transform.localRotation=Quaternion.Euler(0,0,originalAngle);
	}*/
	uiCtrl = GameObject.Find("Main Camera").GetComponent("UiControl");
	if (key)
	keyName=key.name;
	
}

function Activate(fisk){
	if (!locked){
		open=!open;
		done=false;
		timer=0;
		if (open)
			audio.clip=openSound;
		else
			audio.clip=closeSound;
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
	if (open){
		target1 = Quaternion.Euler(0,0,originalAngle-openAngle);
		target2 = Quaternion.Euler(0,0,originalAngle-openAngle);
	}else{
		target1 = Quaternion.Euler(0,0,originalAngle);
		target2 = Quaternion.Euler(0,0,originalAngle);
	}
	
	if 	(door_1.transform.localRotation==Quaternion.Slerp(door_1.transform.localRotation,target1,Time.deltaTime*speed) && !done)
	timer+=Time.deltaTime*2;
		
	if (timer>3)
	done=true;
		
	//done = (transform.localRotation==Quaternion.Slerp(transform.localRotation,target,Time.deltaTime*speed));
	
	if (!done && !inTheWay){
		door_1.transform.localRotation=Quaternion.Slerp(door_1.transform.localRotation,target1,Time.deltaTime*speed);
		door_2.transform.localRotation=Quaternion.Slerp(door_2.transform.localRotation,target2,Time.deltaTime*speed);
	}
	//print(done);
	//print(timer);
		
}

function OnCollisionEnter(){
	inTheWay=true;
}

function OnCollisionExit(){
	inTheWay=false;
}

