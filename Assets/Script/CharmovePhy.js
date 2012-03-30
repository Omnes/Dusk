var canControl : boolean = true;     //om man har kontrollen över spelaren eller inte
var speed : float = 3.0;			// hastigheten när man går
var sprintSpeed : float = 5;        //sprint hastighet
var crouchSpeed :float = 1.5;		// hastighet när man duckar
var crouchSize : float = 1.0;		// storleken man blir när man duckar 0.5 = 25% , 1 = 50%
var getUpSpeed : float = 0.1;		//hastigheten man reser sig med
var jumpSpeed : float = 3;			//kraften i hoppet
var gravity : float = 20.0;			//hur snabbt man faller neråt
var maxVelocityChange = 10.0;		//maxhastigheten man man uppnå, alldeles för högt och man kan flyga genom väggar så håll det ganska lågt
var staminaLim : float = 8;			//maxstamina man kan ha
var stamina : float = 8;			//staminan man börjar med, borde va mindre än staminaLim
var exaustSpeed : float = 1;		//hur snabbbt staminan drainar
var regenSpeed : float = .3;		//hur snabbt staminan kommer tillbaka
//lite ljud saker!
var crouchSound : AudioClip;
var getupSound : AudioClip;
var jumpSound : AudioClip;			//hoppljudet
var landingSound : AudioClip;
var walkDelay : float = 0.6;		//fördröjningen innan första fotstegs ljkudet när man går
var sprintDelay : float = 0.6;		// samma fast för sprint
var sneakDelay : float = 0.6;		// för sneaking
var maxGroundHitpoint : float = 0.3; // max lutningen det man krockar med för att det ska räknas som mark
private var footstepStartDelay : float = 0.6;
//var panAmount : float = .3;      // uttagen
private var curSound : AudioClip[];
// massa skojsiga varibler som används innom scriptet
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

function Awake(){ // varibler som sätts beroende på andra components måste vara här!
	rigidbody.freezeRotation=true;
	rigidbody.useGravity=false;
	FootstepSounds(); //sätter igång en function längre ner
	feet = transform.Find("Feet");
	DontDestroyOnLoad (transform.gameObject);
	capCollider = gameObject.GetComponent(CapsuleCollider);
}


function OnCollisionStay (other : Collision){ // se om du kan göra den till onCollisionEnter istället för att spara cpu!
	if (!grounded){
		for (var cp : ContactPoint in other.contacts){
			//print(cp.normal);
			if (cp.normal.y>maxGroundHitpoint){
			grounded=true;
				if(other.gameObject.GetComponent("footSounds")){ // om det man nu landar har nån data för ljud 
					footSounds = other.gameObject.GetComponent("footSounds"); //ändra ljud arrayen till vad nu det underlaget har för ljud
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
	//för fotstegsljuden
	g+=Time.deltaTime;
	
	//detta har med inventoryn att göra, går att flyttas till ett mer lämpligare script!
	if (Input.GetKeyDown(KeyCode.Tab))
		BroadcastMessage("showInv",0);
		
	//och nu till allt annat!
	if (Input.GetKey(KeyCode.LeftShift)&& canSprint){ //om man trycker på shift börja sprinta
		sprint=true;
	}else{
		if (sprint)
			sprint=false;
	}
	
	if (stamina>0.5 && sprint){ //om man nu sprintar draina stamina och se till att man inte kan springa ifall man är för trött
		stamina-=exaustSpeed*Time.deltaTime;
	}else{
		sprint=false;
		canSprint=false;
	}
	
	if ((staminaLim/2)<stamina) // om man har över hälften av staminan kvar så kan man springa igen
		canSprint=true;
	
	if (stamina<staminaLim && !sprint){
		stamina+=regenSpeed*Time.deltaTime;
	}
	
	if (Input.GetKey(KeyCode.LeftControl)){ // ducka
		if (!crouch){
			capCollider.height=crouchSize; // gör en mindre när man duckar
			crouch=true;
			feet.audio.PlayOneShot(crouchSound);
		}
	}else{
		if (crouch){ // när man släpper duck knappen kolla ifall det är fritt över, om det är så reserman sig upp
			if (!Physics.Raycast(transform.position, transform.TransformDirection(Vector3.up),1.5)){
				crouch=false;
				rise=true;
				feet.audio.PlayOneShot(getupSound);
			}
		}
	}
	
	
	if (rise && capCollider.height<=2){ //koden för att resa sig
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
		if (crouch || sprint){ // sätter hastigheten beroende på om man duckar eller sprintar
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
		
		if (Input.GetButton("Jump")){ // koden för hoppning
				rigidbody.velocity = Vector3(velocity.x,Mathf.Sqrt(jumpSpeed*gravity),velocity.z);
				audio.clip=jumpSound; //sätt ljudet till det rätta sen spela det
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
				/* blir nog bättre utan pan
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




