class ToyGridComponent {
  constructor() {
    this.state = {
      loading: false,
      toys: [],
    };
    this.init();
  }
  initFetch = () =>
    setTimeout(() => {
      API.fetchToys(
        (toys) => {
          this.state.loading = false;
          this.saveToys(toys);
        },
        (err) => {
          alert(err);
          this.state.loading = false;
          this.render();
        }
      );
    }, 1000);

  deleteToy = (id) => {
    API.deleteToy(id, () => API.fetchToys(this.saveToys, alert), alert);
  };

  saveToys = (toys) => {
    this.state.toys = toys;
    this.state.loading = false;
    this.render();
  };

  init = () => {
    this.state.loading = true;
    this.initFetch();
    this.htmlElement = document.createElement("div");
    this.htmlElement.className = "row g-3";
    this.render();
  };

  wrappedInColumn = (element) => {
    const column = document.createElement("div");
    column.className = "col-12 col-sm-6 col-md-4 col-xl-2";
    column.append(element);
    return column;
  };

  render = () => {
    const { loading, toys } = this.state;
    if (loading) {
      this.htmlElement.innerHTML = `<div class="text-center"><img src="assets/loading.gif" /></div>`;
    } else if (toys.length > 0) {
      this.htmlElement.innerHTML = "";
      const toysComponent = toys
        .map(
          ({ id, ...props }) =>
            new ToyCardComponent({
              ...props,
              onDelete: () => this.deleteToy(id),
            })
        )
        .map((x) => x.htmlElement)
        .map(this.wrappedInColumn);
      this.htmlElement.append(...toysComponent);
    } else {
      this.htmlElement = `<h2>Žaislų laikinai nėra</h2>`;
    }
  };
}
