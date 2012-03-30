// bara ett snabbt script för att testa interaction med object från inventoryn

var activated :boolean = false;
var keyObject : GameObject; // vilken sak som ska va nyckeln. dra in ett object som finns på scenen

function DaskadeBord (selected : GameObject){ // DaskadeBord functionen kallas från inventory scriptet med info om vilken sak du "plockat upp" ur inventoryn 
	if (selected==keyObject){ // om det är nyckeln
	print("MMMM jette gått");
	activated=true;
	rigidbody.AddForce(Vector3.up*15,ForceMode.Impulse);
	}
}
