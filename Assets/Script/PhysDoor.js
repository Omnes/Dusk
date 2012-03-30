// funkar inte atm

var locked : boolean = false;
var maxAngle : float = 110;
var minAngle : float = 0;
var closedAngle : float = 0;
private var lastMousePos : Vector2;
private var MousePos : Vector2;
var targetAngle : int;


function Swing(targetrot : float){
		var deltaRotation : Quaternion = Quaternion.Euler(Vector3(0,targetrot,0) * Time.deltaTime);
		rigidbody.MoveRotation(Quaternion.Slerp(rigidbody.rotation,Quaternion.Euler(Vector3(0,rigidbody.rotation.y+targetrot,0)),Time.deltaTime));
		
		/*if (rigidbody.rotation.y>maxAngle)
			rigidbody.MoveRotation(Quaternion(0,maxAngle,0,0));
		if (rigidbody.rotation.y<minAngle)
			rigidbody.MoveRotation(Quaternion(0,minAngle,0,0));*/
}
