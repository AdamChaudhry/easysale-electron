import { round } from 'lodash';

const getDiscount = ({ value, type, price }) => {
  let newPrice;
  let discount;
  let percentage;

  if (type == 'flate') {
    newPrice = price - value;
    discount = value;
    percentage = (value / price) * 100;
  }
  else if (type == 'percentage') {
    discount = (value / 100) * price;
    newPrice = price - discount;
    percentage = value;
  }

  return {
    newPrice: round(newPrice, 1),
    discount: round(discount, 1),
    percentage: round(percentage, 1)
  };
}

export default getDiscount;
