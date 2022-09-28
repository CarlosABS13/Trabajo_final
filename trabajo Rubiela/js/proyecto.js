//escenario
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a2b3c);
var loader = new THREE.TextureLoader();
loader.load('./imagenes/fondo_1.jpg', function(texture) {
	scene.background = texture;
});

//camera
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

//render
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/* var control = new THREE.OrbitControls( camera, renderer.domElement );
control.minDistance = 5;
control.maxDistance = 8; */

const gltfLoader = new THREE.GLTFLoader();

gltfLoader.load('../imagenes/autodesk_ninja/scene.gltf', 
	(gltf)=>{
		var loaderObjeto = gltf.scene;
		loaderObjeto.scale.set(2,2,3);
		loaderObjeto.position.y = -70;
		loaderObjeto.position.x = 50;
		loaderObjeto.rotation.y = 0.3;
		console.log('carga completa');
		scene.add(loaderObjeto);
		const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
		scene.add( directionalLight)
	}, ()=>{
		console.log('cargando');
	}, ()=>{
		console.log('error')
	}
	);
	

gltfLoader.load('../imagenes/ninja2/scene.gltf', 
	(gltf)=>{
		var loaderObjeto2 = gltf.scene;
		loaderObjeto2.scale.set(20,20,20);
		loaderObjeto2.position.y = -60;
		loaderObjeto2.position.x = 80;
		loaderObjeto2.rotation.y = 0.5;
		console.log('carga completa');
		scene.add(loaderObjeto2);
		const directionalLight = new THREE.DirectionalLight( 0xffff00, 5 );
		scene.add( directionalLight)
	}, ()=>{
		console.log('cargando');
	}, ()=>{
		console.log('error')
	}
	);

gltfLoader.load('../imagenes/dragon_ver2/scene.gltf', 
	(gltf)=>{
		var loaderObjeto3 = gltf.scene;
		loaderObjeto3.scale.set(1,1,1);
		loaderObjeto3.position.y = -20;
		loaderObjeto3.position.x = 50;
		loaderObjeto3.rotation.y = 5;
		console.log('carga completa');
		scene.add(loaderObjeto3);
		const directionalLight = new THREE.DirectionalLight( 0xd53507, 10 );
		scene.add( directionalLight)
	}, ()=>{
		console.log('cargando');
	}, ()=>{
		console.log('error')
	}
	);


	//animation
const geometry = new THREE.TorusKnotGeometry( 3.9, 3, 23, 6, 4, 7 );
const material = new THREE.MeshNormalMaterial( { color: 0xffff00 } );
const torusKnot = new THREE.Mesh( geometry, material );
	
	
const geometry2 = new THREE.TorusKnotGeometry( 5, 2, 23, 6, 4, 7 );
const material2 = new THREE.MeshNormalMaterial();
const torusKnot2 = new THREE.Mesh( geometry2, material2 );
	
const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xfffffff } ) );
scene.add( torusKnot, torusKnot2, line );

var objetos = [torusKnot, torusKnot2, line]
	
camera.position.x = 80;
camera.position.y = -30;
camera.position.z = 50;
torusKnot2.position.x = 150;

const flycontrols = new THREE.FlyControls(camera, renderer.domElement);
flycontrols.movementSpeed = 5;
flycontrols.rollSpeed = 0.01;
flycontrols.autoForward = false;
flycontrols.dragToLock = false;

function animate (){
	torusKnot.rotation.y += 0.04
	torusKnot.rotation.x += 0.04
	torusKnot.rotation.z += 0.04
	torusKnot2.rotation.y += 0.04
	torusKnot2.rotation.x += 0.04
	torusKnot2.rotation.z += 0.044
	line.rotation.z += 0.04
	line.rotation.x += 0.04
    line.rotation.y += 0.04
	flycontrols.update(0.1);
	requestAnimationFrame( animate );
	renderer.render( scene, camera )
}

animate()