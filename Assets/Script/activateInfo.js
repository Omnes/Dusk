// bara ett snabbt script f�r att testa interaction med object fr�n inventoryn

var activated :boolean = false;
var keyObject : GameObject; // vilken sak som ska va nyckeln. dra in ett object som finns p� scenen

function DaskadeBord (selected : GameObject){ // DaskadeBord functionen kallas fr�n inventory scriptet med info om vilken sak du "plockat upp" ur inventoryn 
	if (selected==keyObject){ // om det �r nyckeln
	print("MMMM jette g�tt");
	activated=true;
	rigidbody.AddForce(Vector3.up*15,ForceMode.Impulse);
	}
}
