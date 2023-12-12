const App = {
    getTodaysDate: () => { //returns todays date in DDMM format
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // months are zero based; january = 0
        return day + month;
    },

    getNameDay: (date) => { //returns name day and/or holiday, requires date in DDMM format
        //use API here
    },

    getFormattedDate: (date) => { // changes the date format from DDMM to "(D)D. (M)M." example: 0101 = 1. 1.
        if (date.length !== 4) {
            console.error("Invalid date format.");
            return null;
          }
        
          const day = date.substring(0,2).replace(/^0/, '');
          const month = date.substring(2).replace(/^0/, '');

          const formattedDay = day + ". " + month + ".";

          return formattedDay
    }
}

const todaysDateSpan = document.getElementById("todaysDate");
const todaysDate = App.getTodaysDate();
const formattedTodaysDate = App.getFormattedDate(todaysDate);
todaysDateSpan.textContent = formattedTodaysDate;
