
var changeTo : String;
private var gameCtrl;
function Start(){
	gameCtrl= GameObject.Find("GameCtrl").GetComponent("GameControll");
}

function Activate (DoNotThrowRocksAtPlanes : float) {
	if (gameCtrl == null)
		gameCtrl= GameObject.Find("GameCtrl").GetComponent("GameControll");
		
	gameCtrl.lastLevel = Application.loadedLevel;
	gameCtrl.ChangeScene(changeTo);
}


/*
ta reda p� vilken v�rld hna kommer ifr�n
spara den infon
ladda niv�n
placera han d�r

skapa en "spanwpoint" d�r han ska va
kasta sten p� flygplan
?????
klart
*/