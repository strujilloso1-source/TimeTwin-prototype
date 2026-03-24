document.addEventListener('DOMContentLoaded', () => {
   
    // 1. FULL WEEK DATABASE (Unique for every day)
    const weekData = {
        "Monday": {
            "actual": [
                { time: "08:00 AM", event: "Snooze Cycle", note: "Snoozed 4 times. No breakfast, rushed to class." },
                { time: "10:00 AM - 12:00 PM", event: "Physics Lecture", note: "Brain fog. Felt like I was staring at a wall." },
                { time: "03:00 PM - 06:00 PM", event: "Work", note: "Drained. Drank 2 energy drinks just to stay awake." }
            ],
            "shadow": [
                { time: "07:00 AM", event: "Solar Wakeup", fix: "90 min earlier. Gained morning flow and hydration." },
                { time: "10:00 AM", event: "Physics Focus", fix: "High-protein fuel used to eliminate the 11 AM fog." },
                { time: "03:00 PM", event: "Steady Work", fix: "Natural energy maintenance. No caffeine crash." }
            ]
        },
        "Tuesday": {
            "actual": [
                { time: "08:30 AM", event: "Morning Drift", note: "Phone scrolling for 45 mins before getting up." },
                { time: "10:00 AM - 02:00 PM", event: "Calculus", note: "Feeling fried by the last hour of class." },
                { time: "08:00 PM - 10:00 PM", event: "Studying", note: "Don't need much time, but got distracted by TV." }
            ],
            "shadow": [
                { time: "07:30 AM", event: "Optimized Start", fix: "AI removed phone-block. +45m gained for prep." },
                { time: "10:00 AM", event: "High-Focus Cal", fix: "Hydration alerts at 12:30 PM to sustain brain." },
                { time: "02:15 PM", event: "Micro-Study", fix: "Compressed to 30 mins at peak focus window." }
            ]
        },
        "Wednesday": {
            "actual": [
                { time: "09:00 AM", event: "Mid-Week Slump", note: "Everything feels slow today. Low motivation." },
                { time: "01:00 PM - 04:00 PM", event: "Lab Work", note: "On my feet all day. Back starting to hurt." },
                { time: "07:00 PM - 09:00 PM", event: "Homework", note: "Eye strain is making it hard to read." }
            ],
            "shadow": [
                { time: "08:00 AM", event: "Neuro-Activation", fix: "3 min cold shower to break the slump." },
                { time: "01:00 PM", event: "Ergo-Labs", fix: "Scheduled ergonomic micro-breaks to save back." },
                { time: "06:00 PM", event: "Deep Work Block", fix: "20/20/20 rule applied for visual recovery." }
            ]
        },
        "Thursday": {
            "actual": [
                { time: "02:00 AM", event: "Late Night Gaming", note: "Lost track of time. Regretting it now." },
                { time: "11:00 AM", event: "Missed Class", note: "Slept through 3 alarms. Feeling guilty." },
                { time: "04:00 PM", event: "Chores", note: "Laundry pile is huge. This will take all night." }
            ],
            "shadow": [
                { time: "11:00 PM", event: "Sleep Threshold", fix: "Forced device shutdown. Recovered 7h sleep." },
                { time: "11:00 AM", event: "Class Attendance", fix: "100% attendance and participation achieved." },
                { time: "04:00 PM", event: "Batch Chores", fix: "Saved 2 hours via multi-task stacking." }
            ]
        },
        "Friday": {
            "actual": [
                { time: "10:00 AM", event: "Final Classes", note: "Just staring at the clock waiting for weekend." },
                { time: "06:00 PM - 09:00 PM", event: "Work Shift", note: "Annoyed. Everyone else is out having fun." },
                { time: "11:30 PM", event: "Party / Night Out", note: "Staying out until 3 AM again." }
            ],
            "shadow": [
                { time: "10:00 AM", event: "Final Sprint", fix: "Gamified class tasks to finish early." },
                { time: "06:00 PM", event: "Work Presence", fix: "Pre-work meditation to reset frustration." },
                { time: "10:00 PM", event: "Social Buffer", fix: "Moved start time earlier. +2h Sleep recovery." }
            ]
        },
        "Saturday": {
            "actual": [
                { time: "12:00 PM", event: "Late Wakeup", note: "Wasted the whole morning. Feeling lazy." },
                { time: "03:00 PM", event: "Clean Room", note: "Moving slow. No motivation to finish." },
                { time: "08:00 PM - 02:00 AM", event: "Gaming Marathon", note: "6 hours straight. Neck is stiff." }
            ],
            "shadow": [
                { time: "08:30 AM", event: "Active Saturday", fix: "30 min jump rope/gym session. Dopamine boost." },
                { time: "11:00 AM", event: "Deep Clean", fix: "Completed in 45 mins with high-intensity timer." },
                { time: "07:00 PM", event: "Balanced Hobby", fix: "Structured gaming with mobility breaks." }
            ]
        },
        "Sunday": {
            "actual": [
                { time: "11:00 AM", event: "Sunday Scaries", note: "Anxious about Monday. Wasting time worrying." },
                { time: "03:00 PM - 07:00 PM", event: "Meal Prep", note: "Takes 4 hours. Absolute chore." },
                { time: "09:00 PM", event: "Panic Review", note: "Last minute study for Monday's test." }
            ],
            "shadow": [
                { time: "09:00 AM", event: "Week Strategy", fix: "Planned the week to eliminate anxiety." },
                { time: "01:00 PM", event: "Batch Prep", fix: "Saved 2.5 hours using Nexus optimized recipes." },
                { time: "07:00 PM", event: "Ready State", fix: "All prep done. Relaxed evening. Sleep at 10 PM." }
            ]
        }
    };

    // 2. DOM ELEMENTS
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.view-section');
    const dayCells = document.querySelectorAll('.clickable-day');
    const actualContainer = document.getElementById('actual-content');
    const shadowContainer = document.getElementById('shadow-content');
    const revealBtn = document.getElementById('revealBtn');
    const dayLabel = document.getElementById('current-day-display');

    // 3. NAVIGATION LOGIC
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            sections.forEach(s => s.classList.add('d-none'));
            document.getElementById(`page-${link.getAttribute('data-page')}`).classList.remove('d-none');
        });
    });

    // 4. THE RENDER FUNCTION (Clears and injects new data)
    function renderDay(dayName) {
        const day = weekData[dayName];
        dayLabel.innerText = `${dayName}, March 2026`;
       
        // Clear previous containers
        actualContainer.innerHTML = '';
        shadowContainer.innerHTML = '';

        // Inject Actuals
        actualContainer.innerHTML = day.actual.map(item => `
            <div class="timeline-block mb-4">
                <span class="badge bg-danger-subtle text-danger mb-2">${item.time}</span>
                <h6 class="text-white mb-1">${item.event}</h6>
                <div class="user-note small"><b>Note:</b> ${item.note}</div>
            </div>
        `).join('');

        // Inject Shadows (start hidden)
        shadowContainer.innerHTML = day.shadow.map(item => `
            <div class="shadow-item timeline-block mb-4" style="opacity: 0;">
                <span class="badge bg-success-subtle text-success mb-2">${item.time}</span>
                <h6 class="text-white mb-1">${item.event}</h6>
                <p class="small text-info mb-0"><b>AI Fix:</b> ${item.fix}</p>
            </div>
        `).join('');
    }

    // 5. CALENDAR CLICK LOGIC
    dayCells.forEach(cell => {
        cell.addEventListener('click', () => {
            const selectedDay = cell.getAttribute('data-day');
           
            // UI Visual Update
            dayCells.forEach(c => c.classList.remove('active-day'));
            cell.classList.add('active-day');
           
            // Reset the reveal button text
            revealBtn.innerText = "Reveal Optimized Schedule";
           
            // Switch data
            renderDay(selectedDay);
        });
    });

    // 6. REVEAL BUTTON (Fixed logic to find the NEW shadow-items)
    revealBtn.addEventListener('click', () => {
        // We find the items inside the container right now
        const items = shadowContainer.querySelectorAll('.shadow-item');
       
        if (revealBtn.innerText === "Reveal Optimized Schedule") {
            items.forEach((item, i) => {
                setTimeout(() => {
                    item.classList.add('revealed');
                    item.style.opacity = "1"; // Ensure opacity is forced
                }, i * 150);
            });
            revealBtn.innerText = "Reset View";
        } else {
            items.forEach((item) => {
                item.classList.remove('revealed');
                item.style.opacity = "0";
            });
            revealBtn.innerText = "Reveal Optimized Schedule";
        }
    });

    // Initial Load (Tuesday)
    renderDay("Tuesday");
});