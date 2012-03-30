// utdaterat! använd CharmovePhy.js istället!



//fixa så att den kollar hela capseln innan du kan resa dig upp!

var canControl : boolean = true;
var speed : float = 3.0;
var sprintSpeed : float = 5;
var crouchSpeed :float = 1.5;
var crouchSize : float = 0.9;
var jumpSpeed : float = 8.0;
var gravity : float = 20.0;
private var moveDir : Vector3 = Vector3.zero;
private var tmpSpeed : float = speed;
private var sprint : boolean = false;
private var crouch : boolean = false;
private var rise : boolean = false;
var canSprint : boolean = true;
var stamina : float = 8;
var staminaLim : float = 8;
var exaustSpeed : float = 1;
var regenSpeed : float = .3;
var jumpSound : AudioClip;
private var controller;


function Start(){
var controller : CharacterController = GetComponent(CharacterController);	
}


function Update () {
	//detta har med inventoryn att göra, går att flyttas till ett mer lämpligare script!
	if (Input.GetKeyDown(KeyCode.Tab))
		BroadcastMessage("showInv",0);
	//och nu till allt annat!
	
	if (Input.GetKey(KeyCode.LeftShift)&& canSprint){
		sprint=true;
	}else{
		if (sprint)
			sprint=false;
	}
	
	if (stamina>0.5 && sprint){
		stamina-=exaustSpeed*Time.deltaTime;
	}else{
		sprint=false;
		canSprint=false;
	}
	
	if ((staminaLim/2)<stamina)
		canSprint=true;
	
	if (stamina<staminaLim && !sprint){
		stamina+=regenSpeed*Time.deltaTime;
	}
	
	if (Input.GetKey(KeyCode.LeftControl)){
		crouch=true;
		controller.height=crouchSize;
	}else{
		if (crouch && !Physics.Raycast(transform.position, transform.TransformDirection(Vector3.up),1.5) ){
		//if (crouch && !Physics.CheckCapsule(transform.position+Vector3.up*.5, transform.position+Vector3.up*1.5,1) ){	
			crouch=false;
			rise=true;
		}
	}
	
	if (rise && controller.height<=1.8){
		controller.height+=.1;
		transform.position+=Vector3.up*0.04;
	}else{
		rise=false;	
	}
	
	if (crouch || sprint){
		if (crouch){
			tmpSpeed=crouchSpeed;
			sprint=false;
		}
		if (sprint)
			tmpSpeed=sprintSpeed;
	}else{
			tmpSpeed=speed;
	}
		
	
	
	
	if (controller.isGrounded){
		moveDir = Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
		moveDir = transform.TransformDirection(moveDir);
		if (Input.GetAxis("Vertical")<0)
			moveDir *=crouchSpeed;
		else
			moveDir *= tmpSpeed;
		if (Input.GetButton("Jump")){
			moveDir.y=jumpSpeed;
			audio.clip=jumpSound;
			audio.Play();
			if (stamina>0)
				stamina-=staminaLim/6;
		}
	}else
		moveDir.y-=gravity*Time.deltaTime;
	if (canControl)
		controller.Move(moveDir*Time.deltaTime);

}