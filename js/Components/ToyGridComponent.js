class ToyGridComponent {
  constructor() {
    this.state = {
      loading: false,
      toys: [],
    };
    this.init();
  }
  initFetch = () => API.fetchToys(this.saveToys, alert);

  saveToys = (toys) => {
    this.state.toys = toys;
    this.state.loading = false;
    this.render();
  };

  init = () => {
    this.state.loading = true;
    this.initFetch();
    this.htmlElement = document.createElement("div");
    this.render();
  };

  render = () => {
    const { loading } = this.state;
    if (loading) {
      this.htmlElement.innerHTML = "siunčiama...";
    } else {
      this.htmlElement.innerHTML = "parsiųsta...";
    }
  };
}
