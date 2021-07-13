// Depends on:
// <script src="https://threejs.org/build/three.min.js"></script>
// <script src="https://threejs.org/examples/js/controls/OrbitControls.js"></script>
// <script src="https://unpkg.com/delaunator@3.0.2/delaunator.js"></script> <!-- https://github.com/mapbox/delaunator -->
// <script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.3/dat.gui.min.js"></script>

// idea from:
// https://codepen.io/prisoner849/pen/bQWOjY


function getGeometry(fn, x, y)
{
  var points3d = [];
  for (let i = 0; i < x.length; i++) {
    points3d.push(new THREE.Vector3(x[i], y[i], fn[i]));
  }

  // triangulate x, y
  var indexDelaunay = Delaunator.from(
    points3d.map(v => {
      return [v.x, v.y];
    })
  );

  var meshIndex = []; // delaunay index => three.js index
  for (let i = 0; i < indexDelaunay.triangles.length; i++){
    meshIndex.push(indexDelaunay.triangles[i]);
  }

  var geom = new THREE.BufferGeometry().setFromPoints(points3d);
  geom.setIndex(meshIndex); // add three.js index to the existing geometry
  geom.computeVertexNormals();

  return geom;
}


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, 1, 1, 200);
camera.position.set(0,-10,-2);
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
var canvas = renderer.domElement;
var controls = new THREE.OrbitControls(camera, canvas);


var light = new THREE.DirectionalLight(0xffffff, 2.5);
light.position.setScalar(100);
scene.add(light);
light.position.setScalar(-100);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

var rand_fn = [...Array(5)].map(()=>0.01*Math.random());
var rand_x = [...Array(5)].map(()=>0.01*Math.random());
var rand_y = [...Array(5)].map(()=>0.01*Math.random());

var geom = getGeometry(rand_fn, rand_x, rand_y);
var mesh = new THREE.Mesh(
  geom,
  new THREE.MeshPhongMaterial({
    color: "#316",
    wireframe: true,
    side: THREE.DoubleSide,
  })
);
scene.add(mesh);

var gui = new dat.GUI();
gui.add(mesh.material, "wireframe");

function updateMesh(fn, x, y) {
  var geom = getGeometry(fn, x, y);
  mesh.geometry = geom;
}

function resize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render() {
  if (resize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}


function renderCanvas(element)
{
  element.appendChild(canvas);
  render();
}