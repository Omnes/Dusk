

private var springJoint : SpringJoint;
var spring : float = 50.0;// se script referensen för dessa
var damper : float = 5.0;
var drag : float = 10.0;
var angularDrag : float = 10.0;
var distance : float = 0; // hur lång fjädern är 
var breakDistance : float = 1.5; // max distans tills länken bryts
var throwForce : float = 4; // hur hårt du kan kasta
var maxDistance : float = 1.5; // hur långt ifrån du kan lyfta saker
private var inventory;
private var hit : RaycastHit;
function Start(){
	inventory=GetComponent(Inventory);
}


function Update(){
	if (Input.GetMouseButtonDown(0)){
		if (Physics.Raycast(transform.position,transform.forward,hit,maxDistance)){
			if (hit.collider.gameObject.tag == "physDoor"){
				return;
			}
			if (hit.rigidbody && !hit.rigidbody.isKinematic){
				
				if (!springJoint){
					//print("skapar ny joint");
					var dragger = new GameObject("Dragger");
					var rb = dragger.AddComponent("Rigidbody") as Rigidbody;
					springJoint = dragger.AddComponent("SpringJoint");
					rb.isKinematic=true;
				}
				
				springJoint.transform.position = hit.point;
				springJoint.anchor=Vector3.zero;
				springJoint.spring = Mathf.Clamp(spring/hit.rigidbody.mass,30,100);
				//springJoint.damper = damper;
				springJoint.damper = Mathf.Clamp(damper*hit.rigidbody.mass,5,20);
				springJoint.maxDistance = distance;
				springJoint.connectedBody = hit.rigidbody;
				
				StartCoroutine("DragObject",hit.distance);
				
			}
		}
	}
}

function DragObject(distance : float){
	
	var oldDrag = springJoint.connectedBody.drag;
	var oldAngularDrag = springJoint.connectedBody.angularDrag;
	springJoint.connectedBody.drag = drag;
	springJoint.connectedBody.angularDrag = angularDrag;
	
	if (inventory.showInventory){
		LetGo(oldDrag,oldAngularDrag);
	}
	
	while (Input.GetMouseButton(0) && !Input.GetMouseButtonDown(1)){
		springJoint.transform.position = transform.position+transform.forward*distance;
		//print(springJoint.anchor);
//		if (Vector3.Distance(springJoint.transform.position,hit.point)>breakDistance)//springJoint.connectedBody.transform.position
//			LetGo(oldDrag,oldAngularDrag);
		yield;
	}
	
	if (Input.GetMouseButtonDown(1)){
		springJoint.connectedBody.AddForce(transform.forward*throwForce,ForceMode.Impulse);
	}
	

	
	if (springJoint.connectedBody){
		LetGo(oldDrag,oldAngularDrag);
	}

}

function LetGo(oldDrag : float,oldAngularDrag : float){
	springJoint.connectedBody.drag = oldDrag;
	springJoint.connectedBody.angularDrag = oldAngularDrag;
	springJoint.connectedBody = null;
}





