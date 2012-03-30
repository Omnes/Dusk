var lightObject : GameObject;
var monster : GameObject;
var min : float = 0;
var max : float = .4;
private var light_;
private var org_color : Color;
private var flicker = false;
private var random;

function Start (){
	light_ = lightObject.GetComponent(Light);
	print(light);
	org_color = light_.color;
	print(org_color);
	random = Random.Range(0,1000);
}
function OnTriggerEnter(other : Collider){
	if (other.gameObject == monster && !flicker){
		flicker=true;
	}
}

function LateUpdate () {
	if (flicker && Time.time%2){
		//light_.color = Mathf.Lerp(min,max,org_color * calc_value());
		light_.color = org_color * calc_value();
	}
}

function OnTriggerExit(other : Collider){
	if (other.GameObject == monster){
		light_.color = org_color;
		flicker=false;
	}	
}

function calc_value(){
	var noise = Mathf.PerlinNoise(random,Time.time);
	return (noise);
	
}