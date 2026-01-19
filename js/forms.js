/**
 * Turn The Page Club - Form Validation
 * Client-side validation for all forms
 */

// ============================================
// DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
    initFormSubmission();
});

// ============================================
// Form Validation
// ============================================
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');

        // Real-time validation on blur
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                // Clear error on input
                const formGroup = this.closest('.form-group');
                if (formGroup && formGroup.classList.contains('error')) {
                    clearFieldError(this);
                }
            });
        });

        // Validate on submit
        form.addEventListener('submit', function(e) {
            const isValid = validateForm(this);

            if (!isValid) {
                e.preventDefault();

                // Focus first error field
                const firstError = form.querySelector('.form-group.error input, .form-group.error textarea');
                if (firstError) {
                    firstError.focus();
                }
            }
        });
    });
}

// ============================================
// Field Validation
// ============================================
function validateField(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return true;

    const value = field.value.trim();
    const type = field.type;
    const isRequired = field.hasAttribute('required');
    let isValid = true;
    let errorMessage = '';

    // Clear previous error
    clearFieldError(field);

    // Required validation
    if (isRequired && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Type-specific validation
    if (value && isValid) {
        switch (type) {
            case 'email':
                if (!isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;

            case 'tel':
                if (!isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;

            case 'url':
                if (!isValidURL(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid URL';
                }
                break;
        }
    }

    // Custom validation rules
    if (value && isValid) {
        // Min length
        const minLength = field.getAttribute('minlength');
        if (minLength && value.length < parseInt(minLength)) {
            isValid = false;
            errorMessage = `Must be at least ${minLength} characters`;
        }

        // Max length
        const maxLength = field.getAttribute('maxlength');
        if (maxLength && value.length > parseInt(maxLength)) {
            isValid = false;
            errorMessage = `Must be no more than ${maxLength} characters`;
        }

        // Pattern
        const pattern = field.getAttribute('pattern');
        if (pattern && !new RegExp(pattern).test(value)) {
            isValid = false;
            errorMessage = field.getAttribute('data-pattern-message') || 'Invalid format';
        }
    }

    // Show error if invalid
    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

// ============================================
// Form Validation
// ============================================
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// ============================================
// Error Display
// ============================================
function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;

    formGroup.classList.add('error');

    // Create error element if it doesn't exist
    let errorEl = formGroup.querySelector('.form-error');
    if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        errorEl.setAttribute('role', 'alert');
        formGroup.appendChild(errorEl);
    }

    errorEl.textContent = message;

    // Add aria attributes
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', errorEl.id || `error-${field.name}`);
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;

    formGroup.classList.remove('error');

    const errorEl = formGroup.querySelector('.form-error');
    if (errorEl) {
        errorEl.textContent = '';
    }

    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
}

// ============================================
// Validation Helpers
// ============================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Accept various phone formats
    const phoneRegex = /^[\d\s\-\(\)\+\.]{10,}$/;
    return phoneRegex.test(phone);
}

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// ============================================
// Form Submission (with Formspree)
// ============================================
function initFormSubmission() {
    const forms = document.querySelectorAll('form[data-ajax]');

    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validate first
            if (!validateForm(this)) {
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : '';

            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
                submitBtn.textContent = 'Sending...';
            }

            try {
                const formData = new FormData(form);
                const action = form.getAttribute('action');

                const response = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showFormSuccess(form, 'Thank you! Your message has been sent successfully.');
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                showFormError(form, 'Oops! Something went wrong. Please try again later.');
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    submitBtn.textContent = originalText;
                }
            }
        });
    });
}

// ============================================
// Success/Error Messages
// ============================================
function showFormSuccess(form, message) {
    // Remove any existing messages
    removeFormMessages(form);

    const successEl = document.createElement('div');
    successEl.className = 'form-success';
    successEl.setAttribute('role', 'alert');
    successEl.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${message}</span>
    `;

    form.insertBefore(successEl, form.firstChild);

    // Scroll to message
    successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        successEl.remove();
    }, 5000);
}

function showFormError(form, message) {
    // Remove any existing messages
    removeFormMessages(form);

    const errorEl = document.createElement('div');
    errorEl.className = 'form-error-message';
    errorEl.setAttribute('role', 'alert');
    errorEl.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        <span>${message}</span>
    `;

    form.insertBefore(errorEl, form.firstChild);

    // Scroll to message
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function removeFormMessages(form) {
    const messages = form.querySelectorAll('.form-success, .form-error-message');
    messages.forEach(msg => msg.remove());
}

// ============================================
// Export for use in other scripts
// ============================================
window.TurnThePageForms = {
    validateField,
    validateForm,
    showFieldError,
    clearFieldError,
    showFormSuccess,
    showFormError
};
