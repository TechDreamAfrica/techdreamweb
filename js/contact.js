// Contact Form Handler with Firebase Integration
import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', function() {
    
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoader = document.getElementById('btn-loader');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Hide any previous messages
            successMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');
            
            // Disable submit button and show loader
            submitBtn.disabled = true;
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                company: document.getElementById('company').value.trim(),
                service: document.getElementById('service').value,
                message: document.getElementById('message').value.trim(),
                timestamp: serverTimestamp(),
                status: 'new'
            };
            
            // Validate email
            if (!window.validateEmail(formData.email)) {
                showError('Please enter a valid email address.');
                resetButton();
                return;
            }
            
            // Validate required fields
            if (!formData.name || !formData.email || !formData.service || !formData.message) {
                showError('Please fill in all required fields.');
                resetButton();
                return;
            }
            
            try {
                // Add document to Firestore
                const docRef = await addDoc(collection(db, 'contacts'), formData);
                
                console.log('Document written with ID: ', docRef.id);
                
                // Show success message
                showSuccess();
                
                // Reset form
                contactForm.reset();
                
                // Send notification (optional - you can integrate with email service)
                // await sendEmailNotification(formData);
                
            } catch (error) {
                console.error('Error adding document: ', error);
                showError('There was an error submitting your message. Please try again or contact us directly at info@techdreamafrica.org');
            } finally {
                resetButton();
            }
        });
    }
    
    function showSuccess() {
        successMessage.classList.remove('hidden');
        successMessage.classList.add('message-slide-in');
        
        // Scroll to message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Use utility notification if available
        if (window.Utils && window.Utils.showNotification) {
            window.Utils.showNotification('Message sent successfully!', 'success');
        }
    }
    
    function showError(message) {
        errorMessage.classList.remove('hidden');
        errorMessage.classList.add('message-slide-in');
        errorMessage.querySelector('span').textContent = message;
        
        // Scroll to message
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Use utility notification if available
        if (window.Utils && window.Utils.showNotification) {
            window.Utils.showNotification(message, 'error');
        }
    }
    
    function resetButton() {
        submitBtn.disabled = false;
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
    }
    
    // Optional: Email notification function (requires backend API)
    async function sendEmailNotification(formData) {
        try {
            // This would call your backend API to send email notifications
            // Example endpoint: /api/send-notification
            const response = await fetch('/api/send-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to send notification');
            }
            
            console.log('Email notification sent');
        } catch (error) {
            console.error('Error sending email notification:', error);
            // Don't show error to user as the form submission was successful
        }
    }
    
    // Real-time form validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !window.validateEmail(this.value)) {
                this.classList.add('border-red-500');
                this.classList.remove('border-gray-300');
            } else {
                this.classList.remove('border-red-500');
                this.classList.add('border-gray-300');
            }
        });
    }
    
    // Character counter for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        const maxLength = 1000;
        const counter = document.createElement('div');
        counter.className = 'text-sm text-gray-500 mt-1 text-right';
        counter.textContent = `0 / ${maxLength} characters`;
        messageField.parentNode.appendChild(counter);
        
        messageField.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length} / ${maxLength} characters`;
            
            if (length > maxLength) {
                counter.classList.add('text-red-500');
                counter.classList.remove('text-gray-500');
            } else {
                counter.classList.remove('text-red-500');
                counter.classList.add('text-gray-500');
            }
        });
        
        messageField.setAttribute('maxlength', maxLength);
    }
    
});