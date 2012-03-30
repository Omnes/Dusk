#pragma strict
var blockMaster : GameObject;
function Activate () {
	blockMaster.active = true;
	var item = this.gameObject;
	Camera.main.SendMessage("AddItem",item);
	item.active=false;
	

}


