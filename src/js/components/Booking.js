import { templates, select, settings } from "../settings.js";
import AmountWidget from "./AmountWidget.js";
import DatePicker from "./DatePicker.js";
import HourPicker from "./HourPicker.js";
import utils from "../utils.js";

class Booking {
    constructor(element) {
        const thisBooking = this;
        thisBooking.render(element);
        thisBooking.initWidgets();
        thisBooking.getData();
    }

    render (element) {
        const thisBooking = this;
        const generatedHTML = templates.bookingWidget;
        thisBooking.dom = {};
        thisBooking.dom.wrapper = element;
        thisBooking.dom.wrapper.innerHTML = generatedHTML;
        thisBooking.dom.peopleAmount = document.querySelector(select.booking.peopleAmount);
        thisBooking.dom.hoursAmount = document.querySelector(select.booking.hoursAmount);
        thisBooking.dom.datePicker = document.querySelector(select.widgets.datePicker.wrapper);
        thisBooking.dom.hourPicker = document.querySelector(select.widgets.hourPicker.wraper);
    }

    getData () {
        const thisBooking = this; 
        const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
        const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);
        
        const params = {
            booking: [
                startDateParam,
                endDateParam,    
            ],
            eventsCurrent: [
                settings.db.notRepeatParam,
                startDateParam,
                endDateParam,
            ],
            eventsRepeat: [
                settings.db.repeatParam,
                endDateParam,
            ],
        };

        console.log('getData params:', params);

        const urls = {
          booking: settings.db.url + '/' + settings.db.booking + '?' + params.booking.join('&'), //adres endpointu API, który zwraca listę rezerwacji
          eventsCurrent: settings.db.url + '/' + settings.db.event + '?' + params.eventsCurrent.join('&'), //lista wydarzeń jednorazowych
          eventsRepeat: settings.db.url + '/' + settings.db.event + '?' + params.eventsRepeat.join('&'),  //lista wydarzeń cyklicznych
        };


    }

    initWidgets () {
        const thisBooking = this;
        thisBooking.peopleAmountWidget = new AmountWidget(thisBooking.dom.peopleAmount);
        thisBooking.dom.peopleAmount.addEventListener('updated', function(){
        });
    
        thisBooking.hoursAmountWidget = new AmountWidget(thisBooking.dom.hoursAmount);
        thisBooking.dom.hoursAmount.addEventListener('updated', function(){
        });

        thisBooking.datePickerWidget = new DatePicker(thisBooking.dom.datePicker);
        thisBooking.datePickerWidget.addEventListener('updated', function() {
        });

        thisBooking.hourPickerWidget = new HourPicker(thisBooking.dom.hourPicker);
        thisBooking.hourPickerWidget.addEventListener('updated', function() {
        });
    }

}

export default Booking;