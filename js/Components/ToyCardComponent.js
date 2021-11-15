class ToyCardComponent {
  constructor(props) {
    this.props = props;
    this.init();
  }

  fortmatBadge = (content) =>
    `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success ms-4">${content}</span>`;

  formatPrice = () => {
    const {
      price: { currency, amount },
      discount: { type, amount: discountValue },
    } = this.props;

    const USD_EUR = 0.87;

    const oldPrice =
      Math.round(100 * (currency === "$" ? amount * USD_EUR : amount)) / 100;
    const finalDiscount =
      type === "percentage"
        ? discountValue
        : Math.round(
            100 * (currency === "$" ? discountValue * USD_EUR : discountValue)
          ) / 100;

    let finalPrice;
    let discountBadge = "";
    if (type === "absolute") {
      finalPrice = Math.round(100 * (oldPrice - finalDiscount)) / 100;
      discountBadge = this.fortmatBadge(`-${finalDiscount}  €`);
    } else if (type === "toFixed") {
      finalPrice = finalDiscount;
    } else if (type === "percentage") {
      finalPrice =
        Math.round(100 * (oldPrice * (1 - finalDiscount / 100))) / 100;
      discountBadge = this.fortmatBadge(`-${finalDiscount} %`);
    }

    return `
    <span class="d-inline-flex">
      <span class="text-decoration-line-through fw-light pe-2 text-danger">${oldPrice} €</span>
      <strong class="text-primary position-relative">${finalPrice} € ${discountBadge}</strong>
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
