
/*
*   flytta helst alla OnGUI in hit Och se om du kan göra om Inventory scriptet så vi får färre OnGUI
*/

var crosshairTexture : Texture2D; // texturen för crosshair
private var position : Rect;
var cursor : Texture2D; // texturen för muspekaren i inventoryn
var activeCrosshair :Texture2D;
var unactiveCrosshair :Texture2D;
var inventory; // ignorera
var journalEnabled : boolean = false;
var showJournal : boolean = false;
var journalPage : int = 0;
var journalBack : Texture2D;
var crossedArray = new boolean[10];
var journalArray : Texture2D[];
var journalFound : int = 0;
var journalCrossTexture : Texture2D;
var jNotesPos : Vector2 = Vector2(48,128);
var iScreamYouScreamForIcecream : AudioClip;
private var i : int;
private var display : boolean;
private var curtime :float;
private var pos : Rect;
private var curtext : String;
private var maxtime : float;
var style : GUIStyle;
private var textAlpha : float = 0;
private var PosRect1 : Rect = Rect(0,0,0,0);
private var PosRect2 : Rect = Rect(0,0,0,0);
private var itemIcon;

var tooltipSize : Vector2 = Vector2(90,60); // storlek på tooltip fönstret
var tooltipOffset : Vector3 = Vector3(16,16);
var tooltipTexture : Texture2D; // bakgrundstexturen för tooltips

Screen.showCursor = false;
function Start () {
	position = Rect((Screen.width -crosshairTexture.width)/2,(Screen.height -crosshairTexture.height)/2,crosshairTexture.width,crosshairTexture.height);
	inventory = GetComponent(Inventory);
	cameraCtrl = GetComponent(Cameractrl);
	//var journalCrossed = new Array();
}

function Update(){
	
	if (Input.GetKeyDown(KeyCode.J) && journalEnabled){
		showJournal=!showJournal;
		/*if (showJournal==false){
			GameObject.Find("pacmanGhost").transform.position = transform.position+transform.forward;
			GameObject.Find("pacmanGhost").transform.LookAt(transform.position);
			AudioSource.PlayClipAtPoint(iScreamYouScreamForIcecream,transform.position);
		}*/
		BroadcastMessage("showJournal",0);
		if (showJournal && inventory.showInventory){
			BroadcastMessage("showInv",0);
			
		}
	}
	
		if(display){
		curtime+=Time.deltaTime;
		if (curtime>maxtime){
			if (textAlpha>0.1)
				textAlpha = Mathf.Lerp(textAlpha,0,Time.deltaTime*5);
			else
				display=false;
		}
	}
	if(inventory.selected!=null)
	itemIcon = inventory.selected.GetComponent(item).icon;
	
	i++;
	if (i % 2){
		if (crosshairTexture!=unactiveCrosshair )
			crosshairTexture=unactiveCrosshair;
		var hit : RaycastHit;
		if (Physics.Raycast(transform.position,transform.forward,hit,2.0)){
			if (hit.collider.gameObject.tag=="item"){
				crosshairTexture=activeCrosshair;
				DisplayText("Press 'e' to pickup",1);
			}
		}
	}
	
	if (style.normal.textColor.a != textAlpha)
		style.normal.textColor.a = textAlpha;
	
	
	PosRect1 = Rect(Input.mousePosition.x-16,Screen.height-Input.mousePosition.y-16,32,32);
	PosRect2 = Rect(Input.mousePosition.x-inventory.iconSize.x/2,Screen.height-Input.mousePosition.y-inventory.iconSize.y/2,inventory.iconSize.x,inventory.iconSize.y);
}


function OnGUI(){
	
	if (showJournal){
		GUI.DrawTexture(Rect(Screen.width/2-journalBack.width/2,0,journalBack.width,journalBack.height),journalBack);
		var jpos = jNotesPos;
		jpos.x = Screen.width/2-journalBack.width/2+jNotesPos.x;
		 // fixa notes pos
	
		for (var i=0;i<journalFound;i++){
			GUI.DrawTexture(Rect(jpos.x,jpos.y,journalArray[i].width,journalArray[i].height),journalArray[i],ScaleMode.StretchToFill);
			if (crossedArray[i])
			GUI.DrawTexture(Rect(jpos.x,jpos.y,journalArray[i].width,journalArray[i].height),journalCrossTexture,ScaleMode.StretchToFill);
			jpos = Vector2(jpos.x,jpos.y+journalArray[i].height);
		}
		
	}


	if(inventory.showInventory){
		if (inventory.selected!=null){
			GUI.DrawTexture(PosRect2,itemIcon);
		}else{
			// kommentera bort linjen under ifall iconerna för muspekaren ska bero på storleken
			//GUI.DrawTexture(Rect(Input.mousePosition.x-cursor.width/2,Screen.height-Input.mousePosition.y-cursor.height/2,cursor.width,cursor.height),cursor);
			GUI.DrawTexture(PosRect1,cursor); // fast värden
		}
	}else{
		GUI.DrawTexture(position, crosshairTexture);	
	}
	
	if(display){
		GUI.Label(pos,curtext,style);
	}
}

function DisplayTooltip(item){
	mousePos=Event.current.mousePosition;
	GUI.DrawTexture(Rect(mousePos.x+tooltipOffset.x,mousePos.y+tooltipOffset.y,tooltipSize.x,tooltipSize.y),tooltipTexture,ScaleMode.StretchToFill);
	GUI.Label(Rect(mousePos.x+tooltipOffset.x,mousePos.y+tooltipOffset.y,tooltipSize.x,tooltipSize.y),item.tooltipText);
}



function DisplayText(text : String,time : float){
	display = true;
	maxtime = time;
	curtime = 0;
	curtext = text;
	textAlpha=1;
	pos = Rect(0,Screen.height/2,Screen.width,Screen.height-Screen.height/2);
	//print(pos);

}