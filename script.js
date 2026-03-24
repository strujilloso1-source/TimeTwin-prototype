document.addEventListener('DOMContentLoaded', () => {
    
    // 1. BEHAVIORAL DATABASE (Sanitized for Ethics)
    const weekData = {
        "Monday": {
            "actual": [
                { time: "08:00 AM", event: "Morning Delay", note: "Multiple alarms ignored. Rushed start." },
                { time: "10:00 AM", event: "Class Session", note: "Reported difficulty maintaining focus." }
            ],
            "shadow": [
                { time: "07:00 AM", event: "Early Activation", fix: "Suggested 90m buffer to reduce morning rush." },
                { time: "10:00 AM", event: "Focus Window", fix: "Optional nutritional hydration to support alertness." }
            ]
        },
        "Tuesday": {
            "actual": [
                { time: "08:30 AM", event: "Device Usage", note: "45 mins of screen time before rising." },
                { time: "08:00 PM", event: "Personal Study", note: "Task completion impacted by external distractions." }
            ],
            "shadow": [
                { time: "07:30 AM", event: "Optimized Start", fix: "Suggested device-free window for preparation." },
                { time: "02:15 PM", event: "Peak Window", fix: "Shifted complex tasks to higher energy periods." }
            ]
        },
        "Wednesday": {
            "actual": [
                { time: "09:00 AM", event: "Mid-Week Lag", note: "Observation of lower task engagement." },
                { time: "01:00 PM", event: "Active Tasks", note: "Physical fatigue noted after standing." }
            ],
            "shadow": [
                { time: "08:00 AM", event: "Routine Shift", fix: "Suggested sensory reset to improve focus." },
                { time: "01:00 PM", event: "Ergo-Breaks", fix: "Interval-based posture adjustments suggested." }
            ]
        },
        "Thursday": {
            "actual": [
                { time: "02:00 AM", event: "Late Activity", note: "Extended leisure usage past planned rest." },
                { time: "11:00 AM", event: "Missed Task", note: "Schedule disruption due to late rising." }
            ],
            "shadow": [
                { time: "11:00 PM", event: "Rest Threshold", fix: "Suggested device wind-down for sleep consistency." },
                { time: "11:00 AM", event: "Schedule Alignment", fix: "Gained attendance via recovered rest cycles." }
            ]
        },
        "Friday": {
            "actual": [
                { time: "06:00 PM", event: "Work Session", note: "Reported frustration during high-volume hours." }
            ],
            "shadow": [
                { time: "06:00 PM", event: "Active Presence", fix: "Pre-task breathing exercise for stress management." }
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

    // 3. NAVIGATION
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            sections.forEach(s => s.classList.add('d-none'));
            document.getElementById(`page-${link.getAttribute('data-page')}`).classList.remove('d-none');
        });
    });

    // 4. RENDER FUNCTION (Safety Tone Applied)
    function renderDay(dayName) {
        const day = weekData[dayName];
        if(!day) return;
        dayLabel.innerText = `${dayName}, March 2026`;
        
        actualContainer.innerHTML = day.actual.map(item => `
            <div class="timeline-block mb-4">
                <span class="badge bg-secondary mb-2">${item.time}</span>
                <h6 class="text-white mb-1">${item.event}</h6>
                <div class="user-note small text-secondary"><b>Observed:</b> ${item.note}</div>
            </div>
        `).join('');

        shadowContainer.innerHTML = day.shadow.map(item => `
            <div class="shadow-item timeline-block mb-4" style="opacity: 0;">
                <span class="badge bg-info-subtle text-info mb-2">${item.time}</span>
                <h6 class="text-white mb-1">${item.event}</h6>
                <p class="small text-light mb-0" style="font-style: italic;"><b>Suggested Adjustment:</b> ${item.fix}</p>
            </div>
        `).join('');
    }

    // 5. CALENDAR CLICK
    dayCells.forEach(cell => {
        cell.addEventListener('click', () => {
            dayCells.forEach(c => c.classList.remove('active-day'));
            cell.classList.add('active-day');
            revealBtn.innerText = "Reveal Optimized Schedule";
            renderDay(cell.getAttribute('data-day'));
        });
    });

    // 6. REVEAL LOGIC
    revealBtn.addEventListener('click', () => {
        const items = shadowContainer.querySelectorAll('.shadow-item');
        if (revealBtn.innerText === "Reveal Optimized Schedule") {
            items.forEach((item, i) => {
                setTimeout(() => { item.style.opacity = "1"; }, i * 150);
            });
            revealBtn.innerText = "Reset View";
        } else {
            items.forEach(item => { item.style.opacity = "0"; });
            revealBtn.innerText = "Reveal Optimized Schedule";
        }
    });

    renderDay("Tuesday");
});