var ui = document.getElementById("ui");
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, ui.offsetWidth/ui.offsetHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(ui.offsetWidth, ui.offsetHeight);
ui.appendChild(renderer.domElement);

var loader = new THREE.JSONLoader();

var meshes = [{}, {}, {}, {}, {}, {}, {}, {}];

function loadMeshes(){
	
	var materialWhite = new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.SmoothShading});
	var materialBlack = new THREE.MeshPhongMaterial({color: 0x0a0a0a, shading: THREE.SmoothShading});
	loadMesh("assets/models/pawn.js", 0);
	loadMesh("assets/models/rook.js", 1);
	loadMesh("assets/models/bishop.js", 2);
	loadMesh("assets/models/knight.js", 3);
	loadMesh("assets/models/queen.js", 4);
	loadMesh("assets/models/king.js", 5);
	makePiece(0, materialWhite, new THREE.Vector3(6, 0, 0));
	makePiece(1, materialWhite, new THREE.Vector3(0, 0, 0));
	makePiece(2, materialBlack, new THREE.Vector3(2, 0, 0));
	makePiece(3, materialWhite, new THREE.Vector3(4, 0, 0));
	makePiece(4, materialBlack, new THREE.Vector3(-2, 0, 0));
	makePiece(5, materialWhite, new THREE.Vector3(-4, 0, 0))
}
function loadMesh(path, index){
	loader.load(path, function(geometry){
		meshes[index].piece = geometry;
		meshes[index].loaded = true;
 	    }
	);
}
loadMeshes();

function makePiece(index, material, coords){
	while(meshes[index] != undefined && !meshes[index].loaded) alert("pim");
	var mesh = new THREE.Mesh(meshes[index].piece, material);
	mesh.position = coords;
	scene.add(mesh);
	return mesh;
}

var light = new THREE.PointLight( 0xffffff, 1, 100 ); light.position.set( 5, 5, 5 ); scene.add( light );
camera.position.z = 10;
var render = function () { 
	requestAnimationFrame(render);
	renderer.render(scene, camera);
};
render();
