// Page navigation system
const navItems = document.querySelectorAll('.nav-item');
const pages = {
    'overview': document.getElementById('overview-page'),
    'schedule': document.getElementById('schedule-page'),
    'analytics': document.getElementById('analytics-page'),
    'content': document.getElementById('content-page'),
    'trends': document.getElementById('trends-page')
};

const pageTitles = {
    'overview': { title: 'Overview', subtitle: 'Monitor all your social media accounts' },
    'schedule': { title: 'Schedule Posts', subtitle: 'Create and schedule content across all platforms' },
    'analytics': { title: 'Analytics', subtitle: 'Track your performance and growth' },
    'content': { title: 'AI Content Generator', subtitle: 'Generate engaging content with AI' },
    'trends': { title: 'Trending Topics', subtitle: 'Discover what\'s trending in your industry' }
};

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const page = item.getAttribute('data-page');
        if (!page) return;
        
        e.preventDefault();
        
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Hide all pages
        Object.values(pages).forEach(p => {
            if (p) p.style.display = 'none';
        });
        
        // Show selected page
        if (pages[page]) {
            pages[page].style.display = 'block';
            pages[page].style.animation = 'fadeInUp 0.5s ease';
        }
        
        // Update header
        const pageInfo = pageTitles[page];
        document.getElementById('page-title').textContent = pageInfo.title;
        document.getElementById('page-subtitle').textContent = pageInfo.subtitle;
    });
});

// Create Post button
document.getElementById('createPostBtn')?.addEventListener('click', () => {
    document.querySelector('[data-page="schedule"]').click();
});

// Platform selector
document.querySelectorAll('.platform-checkbox input').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        console.log(`${e.target.value} ${e.target.checked ? 'selected' : 'deselected'}`);
    });
});

// Post timing
document.querySelectorAll('input[name="postTime"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const scheduleTime = document.getElementById('scheduleTime');
        scheduleTime.disabled = e.target.value !== 'schedule';
        if (e.target.value === 'schedule') scheduleTime.focus();
    });
});

// AI Generate
document.getElementById('aiGenerateBtn')?.addEventListener('click', () => {
    const suggestions = document.getElementById('aiSuggestions');
    if (suggestions.style.display === 'none' || !suggestions.style.display) {
        suggestions.style.display = 'block';
        suggestions.style.animation = 'fadeInUp 0.4s ease';
        document.getElementById('aiGenerateBtn').textContent = '⏳ Generating...';
        setTimeout(() => {
            document.getElementById('aiGenerateBtn').textContent = '✨ AI Generate';
        }, 1500);
    } else {
        suggestions.style.display = 'none';
    }
});

// Hashtags
document.getElementById('hashtagBtn')?.addEventListener('click', () => {
    const hashtags = document.getElementById('hashtagSuggestions');
    hashtags.style.display = (hashtags.style.display === 'none' || !hashtags.style.display) ? 'block' : 'none';
    if (hashtags.style.display === 'block') hashtags.style.animation = 'fadeInUp 0.4s ease';
});

// Use suggestions
document.querySelectorAll('.btn-use').forEach(button => {
    button.addEventListener('click', (e) => {
        const suggestion = e.target.closest('.suggestion-item')?.querySelector('p').textContent;
        if (suggestion) {
            document.getElementById('postContent').value = suggestion;
            document.getElementById('aiSuggestions').style.display = 'none';
        }
    });
});

// Hashtag tags
document.querySelectorAll('.hashtag-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
        const content = document.getElementById('postContent');
        if (content) content.value += ' ' + e.target.textContent;
    });
});

// Publish
document.querySelector('.btn-publish')?.addEventListener('click', () => {
    const content = document.getElementById('postContent').value;
    const selectedPlatforms = Array.from(document.querySelectorAll('.platform-checkbox input:checked')).map(cb => cb.value);
    
    if (!content.trim()) { alert('Please enter some content!'); return; }
    if (selectedPlatforms.length === 0) { alert('Please select at least one platform!'); return; }
    
    const btn = document.querySelector('.btn-publish');
    btn.textContent = '📤 Publishing...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = '✓ Published Successfully!';
        setTimeout(() => {
            btn.textContent = 'Publish Post';
            btn.disabled = false;
            document.getElementById('postContent').value = '';
            showNotification('Post scheduled successfully!', 'success');
        }, 2000);
    }, 1500);
});

// Content generator
document.getElementById('generateContent')?.addEventListener('click', () => {
    const topic = document.getElementById('contentTopic').value;
    if (!topic.trim()) { alert('Please enter a content topic!'); return; }
    
    const btn = document.getElementById('generateContent');
    btn.textContent = '⏳ Generating with AI...';
    btn.disabled = true;
    
    setTimeout(() => {
        document.getElementById('generatedContent').style.display = 'block';
        document.getElementById('generatedContent').style.animation = 'fadeInUp 0.5s ease';
        btn.textContent = '✨ Generate Content';
        btn.disabled = false;
        showNotification('Content generated successfully!', 'success');
    }, 2000);
});

// Copy
document.querySelectorAll('.btn-copy').forEach(button => {
    button.addEventListener('click', (e) => {
        const text = e.target.closest('.variant-card').querySelector('.variant-text').textContent;
        navigator.clipboard.writeText(text).then(() => {
            e.target.textContent = '✓ Copied!';
            setTimeout(() => { e.target.textContent = 'Copy'; }, 2000);
        });
    });
});

// Use variant
document.querySelectorAll('.variant-card .btn-use').forEach(button => {
    button.addEventListener('click', (e) => {
        const text = e.target.closest('.variant-card').querySelector('.variant-text').textContent;
        document.querySelector('[data-page="schedule"]').click();
        setTimeout(() => {
            document.getElementById('postContent').value = text;
            showNotification('Content added to post composer!', 'success');
        }, 300);
    });
});

// Trend filters
document.querySelectorAll('.trend-filter').forEach(filter => {
    filter.addEventListener('click', (e) => {
        document.querySelectorAll('.trend-filter').forEach(f => f.classList.remove('active'));
        e.target.classList.add('active');
    });
});

// Use trend
document.querySelectorAll('.btn-use-trend').forEach(button => {
    button.addEventListener('click', (e) => {
        const hashtag = e.target.closest('.trend-card').querySelector('h3').textContent;
        document.querySelector('[data-page="schedule"]').click();
        setTimeout(() => {
            document.getElementById('postContent').value += ' ' + hashtag;
            showNotification(`Added ${hashtag} to your post!`, 'success');
        }, 300);
    });
});

// Notifications
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
        z-index: 9999;
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

// Animations
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
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Chart placeholder
document.addEventListener('DOMContentLoaded', () => {
    const chartContainer = document.getElementById('engagementChart');
    if (chartContainer) {
        chartContainer.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: var(--text-secondary);">
                <div style="text-align: center;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">📊</div>
                    <div>Engagement chart would display here</div>
                    <div style="font-size: 0.9rem; margin-top: 0.5rem;">Integrate with Chart.js for live data</div>
                </div>
            </div>
        `;
    }
});

console.log('Dashboard loaded successfully!');
