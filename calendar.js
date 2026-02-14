// Sample scheduled posts data
const scheduledPosts = [
    { date: '2024-02-14', time: '15:00', platform: 'instagram', title: 'Valentine\'s Day Special', content: 'Spread the love today! 💝 #ValentinesDay' },
    { date: '2024-02-15', time: '10:00', platform: 'facebook', title: 'Weekly Tips', content: 'Here are 5 tips to boost your productivity this week' },
    { date: '2024-02-15', time: '14:00', platform: 'twitter', title: 'Industry News', content: 'Breaking: New trends in social media marketing' },
    { date: '2024-02-16', time: '09:00', platform: 'linkedin', title: 'Professional Insights', content: 'How to leverage LinkedIn for B2B growth' },
    { date: '2024-02-16', time: '16:00', platform: 'instagram', title: 'Behind the Scenes', content: 'A day in the life of our team' },
    { date: '2024-02-17', time: '11:00', platform: 'twitter', title: 'Engagement Thread', content: 'What\'s your favorite productivity hack?' },
    { date: '2024-02-18', time: '13:00', platform: 'facebook', title: 'Customer Story', content: 'How our client increased engagement by 200%' },
    { date: '2024-02-19', time: '10:30', platform: 'instagram', title: 'Product Showcase', content: 'New features launching next week!' },
    { date: '2024-02-20', time: '15:00', platform: 'linkedin', title: 'Thought Leadership', content: 'The future of digital marketing in 2024' }
];

let currentDate = new Date();
let selectedFilter = 'all';

function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();
    const nextDays = 7 - lastDayIndex - 1;
    
    const calendarBody = document.getElementById('calendarBody');
    calendarBody.innerHTML = '';
    
    // Previous month days
    for (let i = firstDayIndex; i > 0; i--) {
        const day = prevLastDay.getDate() - i + 1;
        calendarBody.appendChild(createDayElement(day, true, year, month - 1));
    }
    
    // Current month days
    for (let day = 1; day <= lastDay.getDate(); day++) {
        calendarBody.appendChild(createDayElement(day, false, year, month));
    }
    
    // Next month days
    for (let i = 1; i <= nextDays; i++) {
        calendarBody.appendChild(createDayElement(i, true, year, month + 1));
    }
}

function createDayElement(day, isOtherMonth, year, month) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    if (isOtherMonth) dayDiv.classList.add('other-month');
    
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // Check if today
    const today = new Date();
    if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
        dayDiv.classList.add('today');
    }
    
    dayDiv.innerHTML = `<div class="day-number">${day}</div><div class="day-posts"></div>`;
    
    // Add scheduled posts for this day
    const dayPosts = scheduledPosts.filter(post => {
        if (selectedFilter !== 'all' && post.platform !== selectedFilter) return false;
        return post.date === dateStr;
    });
    
    const postsContainer = dayDiv.querySelector('.day-posts');
    dayPosts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = `calendar-post ${post.platform}`;
        postDiv.innerHTML = `
            <div class="post-time">${post.time}</div>
            <div class="post-title">${post.title}</div>
        `;
        postDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            showPostModal(post);
        });
        postsContainer.appendChild(postDiv);
    });
    
    // Add click to create post
    dayDiv.addEventListener('click', () => {
        showNotification(`Create post for ${dateStr}`, 'info');
    });
    
    return dayDiv;
}

function showPostModal(post) {
    const modal = document.getElementById('postModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <span class="modal-platform ${post.platform}">${post.platform.toUpperCase()}</span>
        <h4 style="margin-bottom: 1rem; font-family: 'Outfit', sans-serif;">${post.title}</h4>
        <div class="modal-content-text">${post.content}</div>
        <div class="modal-info">
            <div class="info-item">
                <div class="info-label">Scheduled Date</div>
                <div class="info-value">${new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Scheduled Time</div>
                <div class="info-value">${post.time}</div>
            </div>
        </div>
        <div class="modal-actions">
            <button class="btn-edit">Edit Post</button>
            <button class="btn-delete">Delete</button>
        </div>
    `;
    
    modal.style.display = 'flex';
    
    // Add event listeners
    modalBody.querySelector('.btn-edit').addEventListener('click', () => {
        showNotification('Edit feature coming soon!', 'info');
        modal.style.display = 'none';
    });
    
    modalBody.querySelector('.btn-delete').addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this post?')) {
            showNotification('Post deleted successfully!', 'success');
            modal.style.display = 'none';
            updateCalendar();
        }
    });
}

function updateCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    
    document.getElementById('currentMonth').textContent = 
        `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

// Navigation controls
document.getElementById('prevMonth')?.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

document.getElementById('nextMonth')?.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

document.getElementById('todayBtn')?.addEventListener('click', () => {
    currentDate = new Date();
    updateCalendar();
});

// Platform filter
document.querySelector('.platform-filter')?.addEventListener('change', (e) => {
    selectedFilter = e.target.value;
    updateCalendar();
});

// Close modal
document.querySelector('.modal-close')?.addEventListener('click', () => {
    document.getElementById('postModal').style.display = 'none';
});

document.getElementById('postModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'postModal') {
        e.target.style.display = 'none';
    }
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#00D4FF'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        z-index: 99999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize calendar
document.addEventListener('DOMContentLoaded', () => {
    updateCalendar();
});

console.log('Calendar loaded successfully!');
