var speed = 1;
private var org_color : Color;
private var org_range : float;
var flicker = true;
private var random;

function Start (){
	org_color = light.color;
	random = Random.Range(0,1000);
}


function LateUpdate () {
	if (flicker && Time.time%2){
		//light_.color = Mathf.Lerp(min,max,org_color * calc_value());
		var noise = Mathf.PerlinNoise(random,Time.time*speed);
		light.color = org_color * noise;
	}
}

