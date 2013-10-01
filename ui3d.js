var ui = document.getElementById("ui");
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, ui.offsetWidth/ui.offsetHeight, 0.1, 1000);
alert("begin file")
var renderer = new THREE.WebGLRenderer();
renderer.setSize(ui.offsetWidth, ui.offsetHeight);
ui.appendChild(renderer.domElement);

var loader = new THREE.JSONLoader();

var basePath = "assets/models/";
var paths = ["assets/models/pawn.js", "assets/models/rook.js", "assets/models/bishop.js", "assets/models/knight.js", "assets/models/queen.js", "assets/models/king.js"]
var meshes = [{}, {}, {}, {}, {}, {}];
var meshesLoaded = 0;

function loadMeshes(){
	alert("begin loading meshes");
	loadMesh(0);
	loadMesh(1);
	loadMesh(2);
	loadMesh(3);
	loadMesh(4);
	loadMesh(5);
}
function loadMesh(index){
alert(index);
	var loader = new THREE.JSONLoader();
	switch(index){
		case 0: 
			loader.load(paths[index], function(geometry){ 
					meshes[0].piece = geometry;
					meshes[0].loaded = true;
					meshLoaded();
				}); break;

		case 1:
			loader.load(paths[index], function(geometry){ 
					meshes[1].piece = geometry;
					meshes[1].loaded = true;
					meshLoaded();
				}); break;

		case 2:
			loader.load(paths[index], function(geometry){ 
					meshes[2].piece = geometry;
					meshes[2].loaded = true;
					meshLoaded();
				}); break;

		case 3:
			loader.load(paths[index], function(geometry){ 
					meshes[3].piece = geometry;
					meshes[3].loaded = true;
					meshLoaded();
				}); break;

		case 4:
			loader.load(paths[index], function(geometry){ 
					meshes[4].piece = geometry;
					meshes[4].loaded = true;
					meshLoaded();
				}); break;

		case 5: 
			loader.load(paths[index], function(geometry){ 
					meshes[5].piece = geometry;
					meshes[5].loaded = true;
					meshLoaded();
				}); break;
	}
}
loadMeshes();
function meshLoaded(){
	alert("mesh loaded")
	meshesLoaded++;
	alert(meshesLoaded);
	alert(meshes.length);
	if(meshesLoaded == meshes.length){
		makePieces();
	}
}
function makePieces(){
	var materialWhite = new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.SmoothShading});
	var materialBlack = new THREE.MeshPhongMaterial({color: 0x0a0a0a, shading: THREE.SmoothShading});
	makePiece(0, materialWhite, new THREE.Vector3(6, 0, 0));
	makePiece(1, materialWhite, new THREE.Vector3(0, 0, 0));
	makePiece(2, materialBlack, new THREE.Vector3(2, 0, 0));
	makePiece(3, materialWhite, new THREE.Vector3(4, 0, 0));
	makePiece(4, materialBlack, new THREE.Vector3(-2, 0, 0));
	makePiece(5, materialWhite, new THREE.Vector3(-4, 0, 0))
}
function makePiece(index, material, coords){
	while(meshes[index] != undefined && !meshes[index].loaded) alert(meshes[index] + " " + index);
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
