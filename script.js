// Replace YOUR_API_ENDPOINT with the actual endpoint from CloudFormation outputs
const API_ENDPOINT = 'YOUR_API_ENDPOINT/messages';

document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        content.style.transition = 'all 0.5s ease-in-out';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 200);

    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messagesList = document.getElementById('messagesList');

    // Load existing messages
    loadMessages();

    // Handle form submission
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const message = messageInput.value.trim();
        if (!message) return;

        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            // Clear input and reload messages
            messageInput.value = '';
            await loadMessages();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message. Please try again.');
        }
    });

    // Function to load messages
    async function loadMessages() {
        try {
            const response = await fetch(API_ENDPOINT);
            if (!response.ok) {
                throw new Error('Failed to load messages');
            }

            const messages = await response.json();
            messagesList.innerHTML = messages
                .map(msg => `<li>${msg.message}</li>`)
                .join('');
        } catch (error) {
            console.error('Error:', error);
            messagesList.innerHTML = '<li>Failed to load messages</li>';
        }
    }
});
