namespace KENGINE{
    export class Engine{
        public constructor(){
            console.log("Hello");
        }
        public start(): void {

            this.loop();
        }
        private loop(): void {
            
            requestAnimationFrame(this.loop.bind(this))
        }
    }
}
window.onload = () => {
    let E = new KENGINE.Engine;
    document.body.innerHTML += "Foo";
}
