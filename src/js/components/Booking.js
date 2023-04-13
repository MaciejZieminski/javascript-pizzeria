import { templates, select } from "../settings.js";
import AmountWidget from "./AmountWidget.js";

class Booking {
    constructor(element) {
        const thisApp = this;
        thisApp.render(element);
        thisApp.initWidgets();
    }

    render (element) {
        const thisApp = this;
        const generatedHTML = templates.bookingWidget;
        thisBooking.dom = {};
        thisBooking.dom.wrapper = element;
        thisBooking.dom.wrapper.innerHTML = generatedHTML;
        thisBooking.dom.peopleAmount = document.querySelector(select.booking.peopleAmount);
        thisBooking.dom.hoursAmount = document.querySelector(select.booking.hoursAmount);
    }

    initWidgets () {
        const thisApp = this;
        thisBooking.peopleAmountWidget = new AmountWidget(thisBooking.dom.peopleAmount);
        thisBooking.dom.peopleAmount.addEventListener('updated', function(){
        });
    
        thisBooking.hoursAmountWidget = new AmountWidget(thisBooking.dom.hoursAmount);
        thisBooking.dom.hoursAmount.addEventListener('updated', function(){
        });
    }

}

export default Booking;