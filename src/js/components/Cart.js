import {select, classNames, templates, settings} from '../settings.js';
import utils from '../utils.js';
import CartProduct from './CartProduct.js';


class Cart {
  constructor(element) {
    const thisCart = this;
    thisCart.products = [];
    thisCart.getElements(element);
    this.initActions();
  }

  getElements(element) {
    const thisCart = this;

    thisCart.dom = {};
  
    thisCart.dom.wrapper = element;
    thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = thisCart.dom.wrapper.querySelector(select.cart.productList);
    thisCart.dom.deliveryFee = thisCart.dom.wrapper.querySelector(select.cart.deliveryFee);
    thisCart.dom.subtotalPrice = thisCart.dom.wrapper.querySelector(select.cart.subtotalPrice);
    thisCart.dom.totalPrice = thisCart.dom.wrapper.querySelectorAll(select.cart.totalPrice);
    thisCart.dom.totalNumber = thisCart.dom.wrapper.querySelector(select.cart.totalNumber);
    thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form);
    thisCart.dom.phone = thisCart.dom.wrapper.querySelector(select.cart.phone);
    thisCart.dom.address = thisCart.dom.wrapper.querySelector(select.cart.address);
  }

  initActions (){
    const thisCart = this;
    thisCart.dom.toggleTrigger.addEventListener('click', function(){
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });
    thisCart.dom.productList.addEventListener('updated', function(){
      thisCart.update();
    });
    thisCart.dom.productList.addEventListener('remove', function(event){
      thisCart.remove(event.detail.cartProduct);
    });
    thisCart.dom.form.addEventListener('submit', function(event) {
      event.preventDefault();
      thisCart.sendOrder();
    });
  }

  sendOrder() {
    const thisCart = this;
    const url = settings.db.url + '/' + settings.db.orders;
    const payload = {
      address: thisCart.dom.address.value,
      phone: thisCart.dom.phone.value,
      totalPrice: thisCart.dom.totalPrice,
      subtotalPrice: thisCart.subtotalPrice,
      totalNumber: thisCart.totalNumber,
      deliveryFee: thisCart.deliveryFee,
      products:[]
    };

    for(let prod of thisCart.products) {
      payload.products.push(prod.getData());
    }

    const options = { 
      method: 'POST', 
      headers: {
        'Content-type': 'application/json'}, 
      body: JSON.stringify(payload), };

    fetch(url, options);
  }

  add(menuProduct) {
    const thisCart = this;
    const generatedHTML = templates.cartProduct(menuProduct);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    thisCart.dom.productList.appendChild(generatedDOM);
    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    thisCart.update();
  }

  update(){
    const thisCart = this;
  
    thisCart.deliveryFee = settings.cart.defaultDeliveryFee;
    thisCart.totalNumber = 0;
    thisCart.subtotalPrice = 0;
  
    for (let cartProduct of thisCart.products) {
      thisCart.totalNumber += cartProduct.amount;
      thisCart.subtotalPrice += cartProduct.price;
    }
    if (thisCart.totalNumber !== 0) {
      thisCart.totalPrice = thisCart.deliveryFee + thisCart.subtotalPrice;
    } else {
      thisCart.totalPrice = 0;
      thisCart.deliveryFee = 0;
    }
    thisCart.dom.totalNumber.innerHTML = thisCart.totalNumber;
    thisCart.dom.deliveryFee.innerHTML = thisCart.deliveryFee;
    thisCart.dom.subtotalPrice.innerHTML = thisCart.subtotalPrice;
    for (let totalPriceHolder of thisCart.dom.totalPrice) {
      totalPriceHolder.innerHTML = thisCart.totalPrice;
    }
  }

  remove (cartProduct) {
    const thisCart = this;
    cartProduct.dom.wrapper.remove();
    const removeCartProduct = thisCart.products.indexOf(cartProduct);
    thisCart.products.splice(removeCartProduct, 1);
    thisCart.update();
  }
}

export default Cart; 