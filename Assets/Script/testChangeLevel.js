
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
ta reda på vilken värld hna kommer ifrån
spara den infon
ladda nivån
placera han där

skapa en "spanwpoint" där han ska va
kasta sten på flygplan
?????
klart
*/