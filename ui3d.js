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

loadMeshes();
makeBoard();
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
	
	alert(primaryGrid.pieces[0].length)
	for(var i = 0; i < primaryGrid.pieces[0].length; i++){
		primaryGrid.pieces[0][i].mesh = makePiece(primaryGrid.pieces[0][i].type, 0, new THREE.Vector3(i % 8, 0, Math.floor(i / 8)).multiplyScalar(2));
	}
	for(var i = 0; i < primaryGrid.pieces[1].length; i++){
		primaryGrid.pieces[1][i].mesh = makePiece(primaryGrid.pieces[1][i].type, 1, new THREE.Vector3(i % 8, 0, Math.floor(i / 8) + 6).multiplyScalar(2));
	}
	/*makePiece(0, materialWhite, new THREE.Vector3(6, 0, 0));
	makePiece(1, materialWhite, new THREE.Vector3(0, 0, 0));
	makePiece(2, materialBlack, new THREE.Vector3(2, 0, 0));
	makePiece(3, materialWhite, new THREE.Vector3(4, 0, 0));
	makePiece(4, materialBlack, new THREE.Vector3(-2, 0, 0));
	makePiece(5, materialWhite, new THREE.Vector3(-4, 0, 0))*/
}
function makePiece(index, side, coords){

	var material = new Array(2);
	material[0] = new THREE.MeshPhongMaterial({color: 0x0a0a0a, shading: THREE.SmoothShading});
	material[1] = new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.SmoothShading});
	
	var mesh = new THREE.Mesh(meshes[index].piece, material[side]);
	mesh.position = coords;
	mesh.rotation.y = side * Math.PI
	scene.add(mesh);
	return mesh;
}

function makeBoard(){
	var squareGeometry = new THREE.CubeGeometry( 2, 0.1, 2 );
	//purposefully different materials than pieces
	var material = new Array(2);
	material[0] = new THREE.MeshPhongMaterial({color: 0x0a0a0a, shading: THREE.SmoothShading});
	material[1] = new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.SmoothShading});
	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8 ; j++){
			var squareMesh = new THREE.Mesh(squareGeometry, material[((i % 2 == j % 2) ? 0 : 1)]);
			squareMesh.position = new THREE.Vector3(i, 0, j).multiplyScalar(2);
			scene.add(squareMesh);
		}
	}
}

var light = new THREE.PointLight( 0xffffff, 1, 100 ); light.position.set( 5, 5, 5 ); scene.add( light );
camera.position.z = 4 * 2;
camera.position.x = 4 * 2;
camera.position.y = 20;
camera.rotation.x = -Math.PI / 2;
var render = function () { 
	requestAnimationFrame(render);
	renderer.render(scene, camera);
};
render();

function textInput(){
	var killed
	moves = convertNotationToMove(document.getElementById("input").value);
	if(primaryGrid.squares[moves[3]][moves[2]].piece != null){
		killed = primaryGrid.squares[moves[3]][moves[2]].piece.mesh
	}
	if(move(moves[0], moves[1], moves[2], moves[3], primaryGrid))
		updateText(moves[0], moves[1], moves[2], moves[3]);
	//alert(moves);
	//alert(primaryGrid.squares[moves[2]][moves[3]].piece.x + " "+ primaryGrid.squares[moves[2]][moves[3]].piece.y);
	scene.remove(killed);
	primaryGrid.squares[moves[3]][moves[2]].piece.mesh.position = new THREE.Vector3(moves[2], 0, moves[3]).multiplyScalar(2);
	document.getElementById("input").value = "";
	render();
}
function updateText(x1, y1, x2, y2){
	document.getElementById("lastMove").textContent = convertMoveToNotation(x1, y1, x2, y2);
}