class ToyCardComponent {
  constructor(props) {
    this.props = props;
    this.init();
  }
  init = () => {
    this.htmlElement = document.createElement("div");
    this.htmlElement.className = "card shadow";
    this.htmlElement.innerHTML = `
    <h2 class="h5">Kortele</h2>`;
  };
}
