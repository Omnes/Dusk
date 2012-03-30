var changeLimit : float = 3;
var hardImpactSound : AudioClip;
var softImpactSound : AudioClip;
var volumeAmp : float = 1;
private var audioSource : AudioSource;

function Awake(){
	audioSource = gameObject.AddComponent("AudioSource");
	audioSource.playOnAwake=false;
	audioSource.loop = false;
}

function OnCollisionEnter (other : Collision) {
	if (other.gameObject.name != "Player" && Time.time>3){
		if (rigidbody.velocity.magnitude>changeLimit)
			audioSource.clip = hardImpactSound;
		else
			audioSource.clip = softImpactSound;
			
		audioSource.volume = Mathf.Clamp01(volumeAmp * rigidbody.velocity.magnitude/10);
		audioSource.Play();
	}
	
}