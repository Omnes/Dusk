/* 
Bort med alla uträkningar ur OnGUI! drar ner fpsn hårt. (kanske)
*/

var background : Texture2D; // bakgrunds texturen för inventoryn!
var windowPosition : Vector2 = Vector2(100,100); // vart på skärmen inventoryn är placerad
var rowrow : Vector2 = Vector2(2,2); // första värdet = längden på raderna, andra värdet 

var iconSize : Vector2 = Vector2(32,32); // storlek på ikonerna
var iconSpace : Vector2 = Vector2(3,3); // avstånd mellan dom
var headerSize : float = 32;
var headerTexture : Texture2D;
var footerSize : float = 8;
var footerTexture : Texture2D;



// iconSpace x+(kolummer*(iconSize x + iconSpace x)) och samma för raderna
var windowSize : Vector2; // storleken på fönstret, ställer insig efter rowrow
//private var windowSize : Vector2 = Vector2(iconSpace.x+(rowrow.x*(iconSize.x+iconSpace.x)),iconSpace.y+(rowrow.y*(iconSize.y+iconSpace.y)));
var invArray = new Array ();
static var showInventory : boolean = false;
var selected : GameObject; // används av scriptet
private var hoover;
var curIcon : Texture2D; // används av scriptet
private var uiCtrl;
private var flashlightscript;
private var player;
var defaultPickupSound : AudioClip;

function Start(){
	uiCtrl = GetComponent("UiControl");
	//flashlightscript=GameObject.Find("Player").GetComponent(Flashlight);
	windowSize = Vector2(iconSpace.x+(rowrow.x*(iconSize.x+iconSpace.x)),iconSpace.y+(rowrow.y*(iconSize.y+iconSpace.y)));
	player=GameObject.Find("Player");
}

function showInv () {
		showInventory=!showInventory;
		if (showInventory && uiCtrl.showJournal){
			BroadcastMessage("showJournal",0);
		}
		var selected = null;
}

function OnGUI(){
	if (showInventory){
		GUI.DrawTexture(Rect(windowPosition.x,windowPosition.y-headerSize,windowSize.x,headerSize),headerTexture,ScaleMode.StretchToFill);
		//GUI.DrawTexture(Rect(windowPosition.x,windowPosition.y,windowSize.x,windowSize.y),background,ScaleMode.StretchToFill);
		GUI.DrawTexture(Rect(windowPosition.x,windowPosition.y+windowSize.y+iconSpace.y,windowSize.x,footerSize),footerTexture,ScaleMode.StretchToFill);
		for (b=0;b<rowrow.y;b++){
			GUI.DrawTexture(Rect(windowPosition.x,windowPosition.y+(b*(iconSize.y+iconSpace.y*2)),windowSize.x,(iconSize.y+iconSpace.y*2)),background,ScaleMode.StretchToFill);
		}
		var currentX = windowPosition.x+iconSpace.x;
		var currentY = windowPosition.y+iconSpace.y;
		for (var index : GameObject in invArray){
			var item = index.GetComponent(item);
			if(Button(Rect(currentX,currentY,iconSize.x,iconSize.y),item)){
				selected=index;
				print(selected);
			}
			currentX+=iconSize.x+iconSpace.x;
			if ((currentX+iconSize.x+iconSpace.x)>(windowPosition.x+windowSize.x)){
				currentX=windowPosition.x+iconSpace.x;
				currentY+=iconSize.y+iconSpace.y*2;
				if ((currentY+iconSize.y+iconSpace.y)>(windowPosition.y+windowSize.y)){
					windowSize.y+=iconSize.y+iconSpace.y*2;
					rowrow.y+=1;
					return;
					
				}
			}
		}
		
		/*for (backPos=windowPosition.y;backPos<=windowSize.y;backPos+=iconSize.y+iconSpace.y){
			GUI.DrawTexture(Rect(windowPosition.x,backPos,windowSize.x,backPos+iconSize.y+iconSpace.y),background,ScaleMode.StretchToFill);
		}*/
		
		if (hoover!=null && selected==null){
			uiCtrl.DisplayTooltip(hoover);
		}
		
		
	}
}

function Button(inRect,item) : boolean{
	var didclick : boolean;
		GUI.DrawTexture(inRect,item.icon,ScaleMode.StretchToFill);
	if(inRect.Contains(Event.current.mousePosition)){
		hoover=item;
		if (Input.GetKeyUp(KeyCode.Mouse0)){
			didclick = true;
		}else{
			didclick = false;
		}
		return didclick;
	}else{
		if (hoover==item)
	hoover=null;
	}
}





function Update(){
	if (selected!=null && Input.GetKeyDown(KeyCode.Mouse0) && showInventory){
		var hit :RaycastHit;
		var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		if (Physics.Raycast (ray,hit,5)) {
			if(hit.transform.tag=="activate"){
				hit.transform.gameObject.SendMessage("DaskadeBord",selected);
			}
			
		}
		selected=null;
	}
	
	
}


function AddItem(item : GameObject){ 
	invArray.Add(item);
	itemData = item.GetComponent("item");
	if (itemData.pickupSound)
	player.audio.PlayOneShot(itemData.pickupSound);
	else{
		if (defaultPickupSound)
		player.audio.PlayOneShot(defaultPickupSound);
	}
	//DontDestroyOnLoad(item);
	//if (item.rigidbody!=null)
	//item.rigidbody.isKinematic=true;
	
	
	if (item.name=="FlashlightPickup")//flashlightscript.flashlightEnabled=true;
	player.BroadcastMessage("EnableFlashlight",1);
}


function RemoveItem(removeItem : GameObject){
	if (removeItem.name=="FlashlightPickup")
		player.BroadcastMessage("EnableFlashlight",0);
	var index = 0;
	for (var item :GameObject in invArray){
		index++;
		if (item==removeItem){
			invArray.RemoveAt(index);
		return;
		}
	}
}
