class ToyCardComponent {
  static USD_EUR = 0.87;
  constructor(props) {
    this.props = props;
    this.init();
  }

  fortmatBadge = (content) =>
    `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success ms-4">${content}</span>`;

  formatPrice = () => {
    const {
      price: { currency, amount },
      discount: { type, amount: value },
    } = this.props;

    let finalPrice;
    let discountBadge = "";
    if (type === "absolute") {
      finalPrice = amount - value;
      discountBadge = this.fortmatBadge(`-${value} ${currency}`);
    } else if (type === "toFixed") {
      finalPrice = value;
    } else if (type === "percentage") {
      finalPrice = Math.round(100 * amount * (1 - value / 100)) / 100;
      discountBadge = this.fortmatBadge(`-${value} %`);
    }

    return `
    <span class="d-inline-flex">
      <span class="text-decoration-line-through fw-light pe-2 text-danger">${amount} ${currency}</span>
      <strong class="text-primary position-relative">${finalPrice} ${currency} ${discountBadge}</strong>
    </span>`;
  };

  formatAgeRestriction = () => {
    const { ageRestrictions } = this.props;
    return ageRestrictions && ageRestrictions.from
      ? `<div>Age: ${ageRestrictions.from}+</div>`
      : ``;
  };

  init = () => {
    const { title, imgSrc, onDelete } = this.props;

    this.htmlElement = document.createElement("article");
    this.htmlElement.className = "card shadow";
    this.htmlElement.innerHTML = `
    <img src="${imgSrc}" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <div>
        <span>Price:</span>
        ${this.formatPrice()}
      </div>
      ${this.formatAgeRestriction()}
    </div>
    <div class="text-center">
    <button class="btn btn-danger mb-2">Ištrinti</button>
    </div>`;
    const btn = this.htmlElement.querySelector(".btn");
    btn.addEventListener("click", onDelete);
  };
}
