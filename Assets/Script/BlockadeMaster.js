
var triggers : GameObject[];
var lastPassed; 
var lastBlockade;

function Start () {
	var blockades = new Array();
	for (var v = 0;v<triggers.lenght;v++)
	blockades.Push(triggers[v].GetComponent("BlockadeTriggers").blocks);
	print(blockades);
	for (var i=0;i<6;i++){
		for (var b : GameObject in blockades[i]){
			print(b + " unactivated");
			b.active = false;
		}
	}
}

function GetLastPassed(){
	return lastPassed;
}

function Passing(id : GameObject){
	//s�tt minus efter .lenght f�r de blockader som alltid dyker upp d�r
	switch(id){
		case triggers[0]: // om man gick f�r bi den triggern
			var block = triggers[0].GetComponent("BlockadeTriggers").block;
			switch(lastPassed){ //kolla vilken du sist gick igenom
				case triggers[1] : // om det var x blocka a
					block[1].active = true; // Activera blockaden
					for (var child : GameObject in block[1]){ // och alla child objects
						child.active=true;
					}
					lastBlockade = block[1]; // s� vi kan st�nga v�gen bakom
				break;
				case triggers[3] :
					block[2].active = true;	
					for (var child : GameObject in block[2]){
						child.active=true;
					}
					lastBlockade = block[2];
			}
			var g = lastBlockade;	//s�tt g till blockaden vi just satt dit
			if (block.lenght>2)
				while (block[g]==lastBlockade){	//slumpa tills den v�ljer n�n annan �n den
					g = Random.Range(0,block.lenght);
				}	
			block[g].active=true;	//aktivera den 
		break;
		case triggers[1]:
			
		break;
		case triggers[2]:
			
		break;
		case triggers[3]:
			
		break;
		case triggers[4]:
			
		break;
		case triggers[5]:
			
		break;
		case triggers[6]:
			
		break;
	}
	
	
	
	lastPassed = id;
}