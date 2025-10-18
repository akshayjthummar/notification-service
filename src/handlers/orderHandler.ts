import { OrderEvents, PaymentMode } from '../types';
import config from 'config';

export const handleOrderText = (order: any) => {
  if (
    order.event_type === OrderEvents.ORDER_CREATE &&
    order.data.PaymentMode === PaymentMode.CASH
  ) {
    return `Tannk you for your order. \n Your order id is ${order.data._id}`;
  }
  return `Tannk you for your order.`;
};

export const handleOrderHtml = (order: any) => {
  if (
    (order.event_type === OrderEvents.ORDER_CREATE &&
      order.data.paymentMode?.toLowerCase() === PaymentMode.CASH) ||
    (order.event_type === OrderEvents.ORDER_CREATE &&
      order.data.paymentMode?.toLowerCase() === PaymentMode.CARD)
  ) {
    return `
        <h3>Tannk you for your order.</h3>
        <div>Your order id: <a href={${config.get('frontend.clientUi')}/order/${order.data._id}}>${order.data._id}</a></div>
    `;
  }
  return `Tannk you for your order.`;
};
