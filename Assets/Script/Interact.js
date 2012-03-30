var interactDistance : float = 2; // hur långt ifrån man kan använda/plocka upp saker
var slowdown : float = 20;
private var cameraCtrl;
private var mouseStart : Vector2;
var currentDoor : Rigidbody; //ska bort ifall vi inte kör med "amnesia dörrar"
var targetrot : float;
private var uiCtrl;


function Awake(){
	cameraCtrl = GetComponent("Cameractrl");
	uiCtrl = GetComponent("UiControl");
}

function Update () {
	if (Input.GetKeyDown("e")){
		var hit : RaycastHit;
		if(Physics.Raycast(transform.position,transform.forward,hit,interactDistance)){
			switch(hit.collider.gameObject.tag){
				case "item":
					var item = hit.collider.gameObject;
					SendMessage("AddItem",item);
					item.active=false;
				break;
				case "Activator":
					SendMessage("Activate",0,SendMessageOptions.DontRequireReceiver);
				break;
				default:
					hit.transform.gameObject.SendMessage("Activate",0,SendMessageOptions.DontRequireReceiver);
				break;
			}
		}
	}
}

function FixedUpdate(){
	if (Input.GetMouseButtonDown(0) && currentDoor==null){

		var hit : RaycastHit;
		if (Physics.Raycast(transform.position,transform.forward,hit,interactDistance)){
			if (hit.transform.tag == "physDoor"){
				if (!hit.transform.GetComponent("PhysDoor").locked){
					cameraCtrl.disabled=true;
					currentDoor = hit.rigidbody;
					print("currentDoor");
					mouseStart=Input.mousePosition;
				}
			}
		}
	}
	
	if (currentDoor!=null){
		targetrot=mouseStart.y-Input.mousePosition.y;
		currentDoor.gameObject.SendMessage("Swing",targetrot);
		print(mouseStart.y-Input.mousePosition.y);
	}

	
	if (Input.GetMouseButtonUp(0)){
		currentDoor=null;
		//print("släppte dörren");
		cameraCtrl.disabled=false;
	}
}

