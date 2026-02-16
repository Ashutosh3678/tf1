// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 8 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on page load
createParticles();

// Handle form submission
document.getElementById('recruitmentForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const statusMessage = document.getElementById('statusMessage');
    const formData = new FormData(form);
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    statusMessage.style.display = 'none';
    statusMessage.className = 'status-message';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Success
            statusMessage.className = 'status-message success';
            statusMessage.textContent = '✓ Application submitted successfully! We will review your application and get back to you soon.';
            statusMessage.style.display = 'block';
            form.reset();
            
            // Scroll to message
            statusMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            // Error from server
            const data = await response.json();
            throw new Error(data.error || 'Submission failed');
        }
    } catch (error) {
        // Error
        statusMessage.className = 'status-message error';
        statusMessage.textContent = '✗ Error submitting application. Please try again or contact us directly.';
        statusMessage.style.display = 'block';
        console.error('Error:', error);
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Application';
    }
});

// Phone number formatting (optional enhancement)
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            e.target.value = value;
        } else if (value.length <= 6) {
            e.target.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            e.target.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
});
