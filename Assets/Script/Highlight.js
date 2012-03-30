var highlighted : boolean = false;
//var highlightMaterial : Material;

private var normalShader;
var highlightShader : Shader;


function Start(){
	normalShader = renderer.material.shader;
	
}

function Update(){
	
	
	if (highlighted){
		if (renderer.material.shader!=highlightShader)
			renderer.material.shader=highlightShader;
	}else{
		if (renderer.material.shader!=normalShader)
		renderer.material.shader=normalShader;
	}
	
}







/*function OnPostRender () {
	if (!highlighted)
	return;
	highlightMaterial.SetPass(0);
	var meshes = GetComponentsInChildren(MeshFilter);
	for (var m : MeshFilter in meshes){
		Graphics.DrawMeshNow( m.sharedMesh, m.transform.position, m.transform.rotation );
	}
	
}*/