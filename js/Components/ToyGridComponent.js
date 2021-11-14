class ToyGridComponent {
  constructor() {
    this.init();
  }
  init = () => {
    this.htmlElement = document.createElement("div");
    this.htmlElement.innerHTML = "Some toys, yall";
  };
}
