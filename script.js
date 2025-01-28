// Add a simple animation to the content when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        content.style.transition = 'all 0.5s ease-in-out';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 200);
});
