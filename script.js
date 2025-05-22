document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    
    // Cat facts array
    const catFacts = [
        "Cats have five toes on their front paws, but only four on the back.",
        "A group of cats is called a 'clowder'.",
        "Cats sleep for approximately 70% of their lives.",
        "A cat's purr vibrates at a frequency of 25 to 150 hertz, which can promote healing.",
        "The world's oldest cat lived to be 38 years old.",
        "Cats have 230 bones, while humans only have 206.",
        "The average cat can jump up to six times its height.",
        "Cats have a specialized collarbone that allows them to always land on their feet.",
        "A cat's nose print is as unique as a human's fingerprint.",
        "Cats have whiskers on the backs of their front legs as well.",
        "Cats can rotate their ears 180 degrees.",
        "The hearing of a cat is five times better than that of a human.",
        "Cats can't taste sweet things due to a genetic mutation.",
        "Cats have three eyelids, including a 'third eyelid' that helps protect the eye.",
        "A cat's heart beats nearly twice as fast as a human heart."
    ];
    
    // Special cat days - format: [month (0-11), day, description]
    const specialCatDays = [
        [7, 8, "International Cat Day"],
        [9, 16, "National Black Cat Day"],
        [9, 29, "National Cat Day"],
        [10, 17, "Black Cat Appreciation Day"],
        [5, 4, "Hug Your Cat Day"],
        [1, 17, "National Cat Lovers Day"],
        [2, 28, "Respect Your Cat Day"],
        [4, 25, "World Veterinary Day"]
    ];
    
    // DOM elements
    const daysGrid = document.getElementById('days-grid');
    const currentMonthYear = document.getElementById('current-month-year');
    const prevButton = document.getElementById('prev-month');
    const nextButton = document.getElementById('next-month');
    const catFactElement = document.getElementById('cat-fact');
    
    // Add event listeners for navigation buttons
    prevButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    nextButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
    
    // Set a random cat fact
    function setRandomCatFact() {
        const randomIndex = Math.floor(Math.random() * catFacts.length);
        catFactElement.textContent = catFacts[randomIndex];
    }
    
    // Render the calendar for the current month/year
    function renderCalendar() {
        // Clear previous days
        daysGrid.innerHTML = '';
        
        // Update header text
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                           'August', 'September', 'October', 'November', 'December'];
        currentMonthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        // Get the first day of the month
        const firstDay = new Date(currentYear, currentMonth, 1);
        // Get the last day of the month
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        
        // Get the starting day of the week (0 = Sunday, 6 = Saturday)
        const startDay = firstDay.getDay();
        
        // Get the number of days in the month
        const daysInMonth = lastDay.getDate();
        
        // Get the previous month's last date for filling in the start of the calendar
        const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
        
        // Calculate the total number of cells needed (max 42 for a 6-row calendar)
        const totalCells = Math.ceil((daysInMonth + startDay) / 7) * 7;
        
        // Add days from the previous month to fill the first row
        for (let i = 0; i < startDay; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'other-month');
            const dayNumber = prevMonthLastDay - startDay + i + 1;
            dayElement.innerHTML = `<span class="day-number">${dayNumber}</span>`;
            daysGrid.appendChild(dayElement);
        }
        
        // Add days of the current month
        const currentDate = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            
            // Check if this day is today
            if (i === currentDate.getDate() && 
                currentMonth === currentDate.getMonth() && 
                currentYear === currentDate.getFullYear()) {
                dayElement.classList.add('current-day');
            }
            
            // Check if this is a special cat day
            let dayContent = `<span class="day-number">${i}</span>`;
            
            // Check for special cat days
            for (const specialDay of specialCatDays) {
                if (specialDay[0] === currentMonth && specialDay[1] === i) {
                    dayContent += `<div class="special-day">🐱 ${specialDay[2]}</div>`;
                    dayElement.classList.add('special-cat-day');
                    break;
                }
            }
            
            dayElement.innerHTML = dayContent;
            daysGrid.appendChild(dayElement);
        }
        
        // Add days from the next month to fill the remaining cells
        const remainingCells = totalCells - (daysInMonth + startDay);
        for (let i = 1; i <= remainingCells; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'other-month');
            dayElement.innerHTML = `<span class="day-number">${i}</span>`;
            daysGrid.appendChild(dayElement);
        }
    }
    
    // Initialize the calendar and cat fact
    renderCalendar();
    setRandomCatFact();
    
    // Change cat fact daily
    setInterval(setRandomCatFact, 24 * 60 * 60 * 1000);
});