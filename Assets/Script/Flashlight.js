
var flashlightEnabled : boolean = false; // om man kan anv�nda ficklampan
var flashlightOn : boolean = false; // om den �r p�
var battery : float = 100;	// hur mycket batterie man har
var decay : float = 1; // hur snabbt batterit tar  slut
var flashlight : GameObject;	// dra in sj�lva ficklamps objectet i den h�r
var flashlightOnSound : AudioClip;	// p� ljud
var flashlightOffSound : AudioClip;		// av ljud
var amplitude : float = 2000;

private var _light;
function Start(){
	_light = flashlight.GetComponentInChildren(Light);
	_light.enabled=false;
	flashlight.renderer.enabled=false;
}
// resten borde g� att n�stan l�sa rakt av s� inga kommenterer p� det!

function Update(){
	if (flashlightEnabled){
		
		//if (flashlight.renderer.enabled==false)
		//flashlight.renderer.enabled=true;
		
		if (Input.GetKeyDown("f") && battery>0){
			flashlightOn=!flashlightOn;
			if (flashlightOn){
				flashlight.audio.clip=flashlightOnSound;
			}else{
				flashlight.audio.clip=flashlightOffSound;	
			}
			flashlight.audio.Play();
		}
		
		if (flashlightOn && battery>0)
		battery -= decay*Time.deltaTime;
		
		if (battery<=0){
			flashlightOn=false;
		}
		
		_light.enabled=flashlightOn;
		flashlight.transform.position+=Vector3(Mathf.Sin(Time.time)/amplitude,0,0);
		
		
		
	}else{

	}


}

function EnableFlashlight(state){
	if(state==1){
		flashlightEnabled=true;
		flashlight.renderer.enabled=true;
	}else{
		flashlightOn=false;
		_light.enabled=flashlightOn;
		flashlight.renderer.enabled=false;
	}
}

