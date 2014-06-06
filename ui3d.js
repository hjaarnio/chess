var ui = document.getElementById("ui");
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, ui.offsetWidth/ui.offsetHeight, 0.1, 1000);
alert("begin file")

var renderer = new THREE.WebGLRenderer();

renderer.setSize(ui.offsetWidth, ui.offsetHeight);
ui.appendChild(renderer.domElement);

var loader = new THREE.JSONLoader();

var basePath = "assets/models/";
//var paths = ["assets/models/pawn.js", "assets/models/rook.js", "assets/models/bishop.js", "assets/models/knight.js", "assets/models/queen.js", "assets/models/king.js"]
var dir = ""
var paths = [dir + "assets/models/pawn.js", dir + "assets/models/rook.js", dir + "assets/models/bishop.js", dir + "assets/models/knight.js", dir + "assets/models/queen.js", dir + "assets/models/king.js"]

var meshes = [{}, {}, {}, {}, {}, {}];
var allMeshesLoaded = false;

function loadMeshes(){
	alert("begin loading meshes");
	for(i = 5; i >= 0; i--){
		meshes[i].loaded = false;
		meshes[i].piece = new THREE.CubeGeometry( 1, 1, 1 );
		loadMesh(i);
	} //loadMesh(0)
}
function loadMesh(index){
	//alert(index);
	var loader = new THREE.JSONLoader();
	loader.load(paths[index], function(geometry) {
				//alert("meep");
				meshes[index].piece = geometry;
				meshes[index].loaded = true;
				meshLoaded();
			});
	
}
loadMeshes();
//makePieces();
function meshLoaded(){
	//alert("loaded mesh")
	for(i = 5; i >= 0; i--){
		if(!meshes[i].loaded){
			//alert("mesh "+i)
			return;
		}
	}
	alert("all meshes loaded");
	allMeshesLoaded = true;
	makePieces();
}
function makePieces(){
	var materialWhite = new THREE.MeshPhongMaterial({color: 0xdddddd, shading: THREE.SmoothShading});
	var materialBlack = new THREE.MeshPhongMaterial({color: 0x0a0a0a, shading: THREE.SmoothShading});
	
	alert(primaryGrid.pieces[0].length)
	for(i = 0; i < primaryGrid.pieces[0].length; i++){
		makePiece(primaryGrid.pieces[0][i].type, materialBlack, new THREE.Vector3(i % 8, 0, i / 8 + 1).multiplyScalar(2));
	}
	for(i = 0; i < primaryGrid.pieces[0].length; i++){
		makePiece(primaryGrid.pieces[1][i].type, materialWhite, new THREE.Vector3(i % 8, 0, i / 8 + 6).multiplyScalar(2));
	}
	/*makePiece(0, materialWhite, new THREE.Vector3(6, 0, 0));
	makePiece(1, materialWhite, new THREE.Vector3(0, 0, 0));
	makePiece(2, materialBlack, new THREE.Vector3(2, 0, 0));
	makePiece(3, materialWhite, new THREE.Vector3(4, 0, 0));
	makePiece(4, materialBlack, new THREE.Vector3(-2, 0, 0));
	makePiece(5, materialWhite, new THREE.Vector3(-4, 0, 0))*/
}
function makePiece(index, material, coords){
	//while(meshes[index] != undefined && !meshes[index].loaded) //alert(meshes[index] + " " + index);
	var mesh = new THREE.Mesh(meshes[index].piece, material);
	mesh.position = coords;
	scene.add(mesh);
	return mesh;
}

var light = new THREE.PointLight( 0xffffff, 1, 100 ); light.position.set( 5, 5, 5 ); scene.add( light );
camera.position.z = 0;
camera.position.y = 20;
camera.rotation.x = -Math.PI / 2;
var render = function () { 
	requestAnimationFrame(render);
	renderer.render(scene, camera);
};
render();
