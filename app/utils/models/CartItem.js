import { round } from 'lodash';

class CartItem {
  initializedValue = {};

  constructor({ productId, name, qty, price }) {
    this.initializedValue = { productId, name, qty, price };
  }

  setDiscount = ({ value, type }) => {
    this.initializedValue.discount = { value, type };
  }

  setQty = (qty) => {
    this.initializedValue.qty = qty;
  }

  getQty = () => this.initializedValue.qty;
  getProductName = () => this.initializedValue.name;
  getProductId = () => this.initializedValue.productId;
  getEachPrice = () => this.initializedValue.price;

  isProductAdded = ({ productId }) => {
    return this.initializedValue.productId == productId;
  }

  isDiscountApplied = () => {
    return !!this.initializedValue.discount;
  }

  getDiscountValue = () => {
    const { price, discount, } = this.initializedValue;
    const { value, type } = discount || {};

    if (!this.isDiscountApplied()) return 0;
    let discountValue = 0;

    if (type == 'flate') {
      discountValue = value;
    }
    else if (type == 'percentage') {
      discountValue = (value / 100) * price;
    }

    return round(discountValue, 1);
  }

  getDiscountPercentage = () => {
    const { price, discount } = this.initializedValue;
    const { value, type } = discount || {};

    if (!this.isDiscountApplied()) return 0;
    let percentage = 0;

    if (type == 'flate') {
      percentage = (value / price) * 100;
    }
    else if (type == 'percentage') {
      percentage = value;
    }

    return round(percentage, 1);
  }

  getLineTotal = () => {
    const { price, qty, } = this.initializedValue;
    return price * qty;
  }

  getDiscountLineTotal = () => {
    const { qty, } = this.initializedValue;
    return this.getLineTotal() - (this.getDiscountValue() * qty);
  }
}

export default CartItem;
