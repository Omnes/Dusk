var sensX : float = 15;
var sensY : float = 15;
var XorY :boolean = true; // om den är true så roterar den bara runt X om false så är det bara längst Y
var paused=false;
var disabled : boolean = false;
var player : GameObject;
private var rotY=0;
function FixedUpdate () {
	if (!paused && !disabled){
		//if (XorY){
			player.transform.Rotate(0, Input.GetAxis("Mouse X") * sensX, 0);
		//}else{
				rotY += Input.GetAxis("Mouse Y") * sensY;
				rotY = Mathf.Clamp (rotY, -90, 90);
				transform.localEulerAngles = new Vector3(-rotY, transform.localEulerAngles.y, 0);
		//}
	}
}
function showInv(){
	paused=!paused;
}
function showJournal(){
	disabled=!disabled;
}