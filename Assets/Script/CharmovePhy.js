var canControl : boolean = true;     //om man har kontrollen �ver spelaren eller inte
var speed : float = 3.0;			// hastigheten n�r man g�r
var sprintSpeed : float = 5;        //sprint hastighet
var crouchSpeed :float = 1.5;		// hastighet n�r man duckar
var crouchSize : float = 1.0;		// storleken man blir n�r man duckar 0.5 = 25% , 1 = 50%
var getUpSpeed : float = 0.1;		//hastigheten man reser sig med
var jumpSpeed : float = 3;			//kraften i hoppet
var gravity : float = 20.0;			//hur snabbt man faller ner�t
var maxVelocityChange = 10.0;		//maxhastigheten man man uppn�, alldeles f�r h�gt och man kan flyga genom v�ggar s� h�ll det ganska l�gt
var staminaLim : float = 8;			//maxstamina man kan ha
var stamina : float = 8;			//staminan man b�rjar med, borde va mindre �n staminaLim
var exaustSpeed : float = 1;		//hur snabbbt staminan drainar
var regenSpeed : float = .3;		//hur snabbt staminan kommer tillbaka
//lite ljud saker!
var crouchSound : AudioClip;
var getupSound : AudioClip;
var jumpSound : AudioClip;			//hoppljudet
var landingSound : AudioClip;
var walkDelay : float = 0.6;		//f�rdr�jningen innan f�rsta fotstegs ljkudet n�r man g�r
var sprintDelay : float = 0.6;		// samma fast f�r sprint
var sneakDelay : float = 0.6;		// f�r sneaking
var maxGroundHitpoint : float = 0.3; // max lutningen det man krockar med f�r att det ska r�knas som mark
private var footstepStartDelay : float = 0.6;
//var panAmount : float = .3;      // uttagen
private var curSound : AudioClip[];
// massa skojsiga varibler som anv�nds innom scriptet
private var canSprint : boolean = true;
private var sprint : boolean = false;
private var crouch : boolean = false;
private var rise : boolean = false;
private var tmpSpeed : float = speed;
private var grounded = false;
private var state = 0;
private var walkSound : AudioClip[];
private var sprintSound : AudioClip[];
private var sneakSound : AudioClip[];
private var footSounds;
private var feet :Transform;
private var velocity;
private var footstepDelay : float = 0.6;
private var i : int = 0;
private var g : float = 0;
private var v : float = 0;
private var noclipMode=false;
private var capCollider;

function Awake(){ // varibler som s�tts beroende p� andra components m�ste vara h�r!
	rigidbody.freezeRotation=true;
	rigidbody.useGravity=false;
	FootstepSounds(); //s�tter ig�ng en function l�ngre ner
	feet = transform.Find("Feet");
	DontDestroyOnLoad (transform.gameObject);
	capCollider = gameObject.GetComponent(CapsuleCollider);
}


function OnCollisionStay (other : Collision){ // se om du kan g�ra den till onCollisionEnter ist�llet f�r att spara cpu!
	if (!grounded){
		for (var cp : ContactPoint in other.contacts){
			//print(cp.normal);
			if (cp.normal.y>maxGroundHitpoint){
			grounded=true;
				if(other.gameObject.GetComponent("footSounds")){ // om det man nu landar har n�n data f�r ljud 
					footSounds = other.gameObject.GetComponent("footSounds"); //�ndra ljud arrayen till vad nu det underlaget har f�r ljud
					walkSound= footSounds.walkSounds;
					sprintSound= footSounds.sprintSounds;
					sneakSound= footSounds.sneakSounds;
					//print("mmmmmm   " +rigidbody.velocity);
					if(!audio.isPlaying && rigidbody.velocity.y<=0)
						audio.PlayOneShot(footSounds.landingSound);
				}

			}
		}
	}
}


function OnCollisionExit (){

        grounded = false;

}



function Update () {
	//f�r fotstegsljuden
	g+=Time.deltaTime;
	
	//detta har med inventoryn att g�ra, g�r att flyttas till ett mer l�mpligare script!
	if (Input.GetKeyDown(KeyCode.Tab))
		BroadcastMessage("showInv",0);
		
	//och nu till allt annat!
	if (Input.GetKey(KeyCode.LeftShift)&& canSprint){ //om man trycker p� shift b�rja sprinta
		sprint=true;
	}else{
		if (sprint)
			sprint=false;
	}
	
	if (stamina>0.5 && sprint){ //om man nu sprintar draina stamina och se till att man inte kan springa ifall man �r f�r tr�tt
		stamina-=exaustSpeed*Time.deltaTime;
	}else{
		sprint=false;
		canSprint=false;
	}
	
	if ((staminaLim/2)<stamina) // om man har �ver h�lften av staminan kvar s� kan man springa igen
		canSprint=true;
	
	if (stamina<staminaLim && !sprint){
		stamina+=regenSpeed*Time.deltaTime;
	}
	
	if (Input.GetKey(KeyCode.LeftControl)){ // ducka
		if (!crouch){
			capCollider.height=crouchSize; // g�r en mindre n�r man duckar
			crouch=true;
			feet.audio.PlayOneShot(crouchSound);
		}
	}else{
		if (crouch){ // n�r man sl�pper duck knappen kolla ifall det �r fritt �ver, om det �r s� reserman sig upp
			if (!Physics.Raycast(transform.position, transform.TransformDirection(Vector3.up),1.5)){
				crouch=false;
				rise=true;
				feet.audio.PlayOneShot(getupSound);
			}
		}
	}
	
	
	if (rise && capCollider.height<=2){ //koden f�r att resa sig
		capCollider.height+=getUpSpeed;
		transform.position+=Vector3.up*(getUpSpeed/8);
	}else{
		rise=false;	
	}
	
	
	//if(transform.position.y<-100)
	//SendMessage("Die",0);
	
}

function FixedUpdate(){
	if (grounded && canControl){	
		if (crouch || sprint){ // s�tter hastigheten beroende p� om man duckar eller sprintar
			if (crouch){
				tmpSpeed=crouchSpeed;
				sprint=false;
			}
			if (sprint)
				tmpSpeed=sprintSpeed;
		}else{
			tmpSpeed=speed;
	}
		//trevliga saker 
		
		var targetVelocity = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
		targetVelocity=transform.TransformDirection(targetVelocity);
		if (Input.GetAxis("Vertical")<0)
			tmpSpeed=speed-crouchSpeed;
		targetVelocity*=tmpSpeed;
		
		velocity = rigidbody.velocity;
        var velocityChange = (targetVelocity - velocity);
        velocityChange.x = Mathf.Clamp(velocityChange.x,-maxVelocityChange,maxVelocityChange);
        velocityChange.z = Mathf.Clamp(velocityChange.z,-maxVelocityChange,maxVelocityChange);
        velocityChange.y = 0;
        rigidbody.AddForce(velocityChange,ForceMode.VelocityChange);
		
		if (Input.GetButton("Jump")){ // koden f�r hoppning
				rigidbody.velocity = Vector3(velocity.x,Mathf.Sqrt(jumpSpeed*gravity),velocity.z);
				audio.clip=jumpSound; //s�tt ljudet till det r�tta sen spela det
				audio.Play();
        }
		
		
	
	}
	
	
	rigidbody.AddForce(Vector3 (0,-gravity,0));
}


function FootstepSounds(){
	i=-1;
	while(true){
		if (rigidbody.velocity.magnitude>0.3 && grounded){
			if (g>footstepStartDelay){
				/* blir nog b�ttre utan pan
				v++;
				if (v % 2)
				feet.audio.pan=-panAmount;
				else
				feet.audio.pan=panAmount;
				*/
				i++;
				//print(i);
					if (crouch || sprint){
						if (crouch){
							curSound=sneakSound;
							footstepDelay = sneakDelay;
						}
						if (sprint){
							curSound=sprintSound;
							footstepDelay = sprintDelay;
						}
					}else{
						curSound=walkSound;
						footstepDelay = walkDelay;
						if (Input.GetAxis("Vertical")<0)
						footstepDelay = sneakDelay;
					}
					if (i>=curSound.Length)
						i=Random.Range(0,curSound.Length);
				feet.audio.PlayOneShot(curSound[i]);
				yield WaitForSeconds(footstepDelay);//curSound[i].lenght
			}else yield;
		}else{
			g=0;
			yield;
		}
	}
}




