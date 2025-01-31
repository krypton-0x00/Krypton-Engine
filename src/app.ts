let engine: KENGINE.Engine;
window.onload = () => {
  engine = new KENGINE.Engine();
  engine.start();
};

window.onresize = () => {
  engine.resize();
};
