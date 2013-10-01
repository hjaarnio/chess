var ui = document.getElementById("ui");
alert("blob")
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, ui.offsetWidth/ui.offsetHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(ui.offsetWidth, ui.offsetHeight);
ui.appendChild(renderer.domElement);
alert("creating loader")
var loader = new THREE.JSONLoader();
loader.load("assets/models/pawn.js", function(geometry){ alert("enter load")
	var material = new THREE.MeshPhongMaterial({color: 0x0ff090, shading: THREE.SmoothShading});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(0, 0, 0);
	mesh.rotation.set(0, 0, 0);
	scene.add(mesh);
    }
);
var light = new THREE.PointLight( 0xffffff, 1, 100 ); light.position.set( 5, 5, 5 ); scene.add( light );

camera.position.z = 5;
var render = function () { 
	requestAnimationFrame(render);
	renderer.render(scene, camera);
};
render();
