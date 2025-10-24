/**
 * Validación y mejora de formularios para JUAMPI IA
 */

class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.fields = {};
        this.submitButton = null;
        this.init();
    }

    init() {
        if (!this.form) {
            console.error(`Formulario con ID "${formId}" no encontrado`);
            return;
        }

        this.setupFields();
        this.setupSubmitButton();
        this.setupEventListeners();
        this.setupAccessibility();
        this.setupMobileOptimizations();
    }

    setupFields() {
        // Obtener todos los campos del formulario
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            const fieldName = input.name || input.id;
            if (fieldName) {
                this.fields[fieldName] = {
                    element: input,
                    validated: false,
                    errorElement: null
                };
            }
        });
    }

    setupSubmitButton() {
        this.submitButton = this.form.querySelector('button[type="submit"], input[type="submit"]');
        if (this.submitButton) {
            this.submitButton.setAttribute('aria-disabled', 'false');
        }
    }

    setupEventListeners() {
        // Validación en tiempo real
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            const element = field.element;

            // Validar al salir del campo
            element.addEventListener('blur', () => {
                this.validateField(fieldName);
            });

            // Validar mientras se escribe (con debounce)
            let debounceTimer;
            element.addEventListener('input', () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.validateField(fieldName);
                }, 500);
            });

            // Limpiar error al empezar a escribir
            element.addEventListener('focus', () => {
                this.clearFieldError(fieldName);
            });

            // Validación especial para email
            if (element.type === 'email') {
                element.addEventListener('blur', () => {
                    this.validateEmail(fieldName);
                });
            }
        });

        // Validación al enviar formulario
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validateForm();
        });
    }

    setupAccessibility() {
        // Mejorar accesibilidad de los campos
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            const element = field.element;

            // Añadir atributos ARIA
            element.setAttribute('aria-required', element.hasAttribute('required') ? 'true' : 'false');
            element.setAttribute('aria-invalid', 'false');

            // Mejorar etiquetas
            const label = this.form.querySelector(`label[for="${element.id}"]`);
            if (label) {
                label.setAttribute('aria-label', label.textContent);
            }

            // Manejar navegación por teclado
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && element.tagName === 'TEXTAREA') {
                    // Permitir Enter en textarea
                    return;
                }

                if (e.key === 'Tab') {
                    // Validar campo al salir con Tab
                    setTimeout(() => {
                        this.validateField(fieldName);
                    }, 100);
                }
            });
        });
    }

    setupMobileOptimizations() {
        // Optimizaciones para móviles
        if (window.innerWidth <= 768) {
            Object.keys(this.fields).forEach(fieldName => {
                const field = this.fields[fieldName];
                const element = field.element;

                // Aumentar tamaño de zonas clickeables
                element.style.minHeight = '44px';
                element.style.minWidth = '44px';

                // Mejorar experiencia táctil
                element.style.fontSize = '16px'; // Prevenir zoom en iOS

                // Configurar teclado apropiado
                if (element.type === 'email') {
                    element.setAttribute('inputmode', 'email');
                    element.setAttribute('autocomplete', 'email');
                } else if (element.type === 'tel') {
                    element.setAttribute('inputmode', 'tel');
                    element.setAttribute('autocomplete', 'tel');
                } else if (element.name?.includes('name') || element.name?.includes('nombre')) {
                    element.setAttribute('autocomplete', 'name');
                }
            });

            // Ajustar altura de textarea en mobile
            const textareas = this.form.querySelectorAll('textarea');
            textareas.forEach(textarea => {
                textarea.addEventListener('input', () => {
                    this.adjustTextareaHeight(textarea);
                });
            });
        }
    }

    validateField(fieldName) {
        const field = this.fields[fieldName];
        const element = field.element;

        if (!element) return false;

        let isValid = true;
        let errorMessage = '';

        // Validar campo requerido
        if (element.hasAttribute('required') && !element.value.trim()) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }

        // Validar tipo de email
        if (element.type === 'email' && element.value.trim()) {
            if (!this.isValidEmail(element.value)) {
                isValid = false;
                errorMessage = 'Por favor, introduce un email válido';
            }
        }

        // Validar longitud mínima
        const minLength = element.getAttribute('minlength');
        if (minLength && element.value.length < parseInt(minLength)) {
            isValid = false;
            errorMessage = `Mínimo ${minLength} caracteres requeridos`;
        }

        // Validar longitud máxima
        const maxLength = element.getAttribute('maxlength');
        if (maxLength && element.value.length > parseInt(maxLength)) {
            isValid = false;
            errorMessage = `Máximo ${maxLength} caracteres permitidos`;
        }

        // Validar patrón
        const pattern = element.getAttribute('pattern');
        if (pattern && element.value.trim()) {
            const regex = new RegExp(pattern);
            if (!regex.test(element.value)) {
                isValid = false;
                errorMessage = 'El formato no es válido';
            }
        }

        // Actualizar estado del campo
        field.validated = true;
        this.updateFieldStatus(fieldName, isValid, errorMessage);

        return isValid;
    }

    validateEmail(fieldName) {
        const field = this.fields[fieldName];
        const element = field.element;

        if (!element || element.type !== 'email') return false;

        const email = element.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (!email) {
            if (element.hasAttribute('required')) {
                isValid = false;
                errorMessage = 'El email es obligatorio';
            }
        } else if (!this.isValidEmail(email)) {
            isValid = false;
            errorMessage = 'Por favor, introduce un email válido';
        }

        field.validated = true;
        this.updateFieldStatus(fieldName, isValid, errorMessage);

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    updateFieldStatus(fieldName, isValid, errorMessage) {
        const field = this.fields[fieldName];
        const element = field.element;

        // Actualizar ARIA
        element.setAttribute('aria-invalid', isValid ? 'false' : 'true');

        // Actualizar clases visuales
        if (isValid) {
            element.classList.remove('error');
            element.classList.add('valid');
        } else {
            element.classList.remove('valid');
            element.classList.add('error');
        }

        // Mostrar/ocultar mensaje de error
        this.showFieldError(fieldName, isValid ? '' : errorMessage);

        // Actualizar botón de envío
        this.updateSubmitButton();
    }

    showFieldError(fieldName, message) {
        const field = this.fields[fieldName];
        const element = field.element;

        // Eliminar mensaje de error anterior
        if (field.errorElement) {
            field.errorElement.remove();
            field.errorElement = null;
        }

        if (message) {
            // Crear nuevo mensaje de error
            field.errorElement = document.createElement('div');
            field.errorElement.className = 'field-error';
            field.errorElement.setAttribute('role', 'alert');
            field.errorElement.setAttribute('aria-live', 'polite');
            field.errorElement.textContent = message;
            field.errorElement.style.cssText = `
                color: #ff4444;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                font-weight: 500;
            `;

            // Insertar después del campo
            element.parentNode.insertBefore(field.errorElement, element.nextSibling);
        }
    }

    clearFieldError(fieldName) {
        const field = this.fields[fieldName];
        const element = field.element;

        element.classList.remove('error');

        if (field.errorElement) {
            field.errorElement.remove();
            field.errorElement = null;
        }
    }

    validateForm() {
        let isFormValid = true;
        const firstInvalidField = null;

        // Validar todos los campos
        Object.keys(this.fields).forEach(fieldName => {
            const isValid = this.validateField(fieldName);
            if (!isValid) {
                isFormValid = false;
                if (!firstInvalidField) {
                    firstInvalidField = this.fields[fieldName].element;
                }
            }
        });

        if (isFormValid) {
            this.submitForm();
        } else {
            // Enfocar primer campo inválido
            if (firstInvalidField) {
                firstInvalidField.focus();
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            this.showFormError('Por favor, corrige los errores antes de enviar');
        }

        return isFormValid;
    }

    submitForm() {
        // Mostrar indicador de carga
        if (this.submitButton) {
            this.submitButton.disabled = true;
            this.submitButton.textContent = 'Enviando...';
            this.submitButton.setAttribute('aria-disabled', 'true');
        }

        // Simular envío de formulario
        setTimeout(() => {
            this.showSuccessMessage();
            this.resetForm();
        }, 2000);
    }

    showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.setAttribute('role', 'alert');
        successMessage.setAttribute('aria-live', 'polite');
        successMessage.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #44ff44, #00cc00);
                color: #000;
                padding: 1rem;
                border-radius: 8px;
                margin: 1rem 0;
                font-weight: 600;
                text-align: center;
                box-shadow: 0 4px 15px rgba(68, 255, 68, 0.3);
            ">
                <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                ¡Mensaje enviado correctamente!
            </div>
        `;

        // Insertar antes del formulario
        this.form.parentNode.insertBefore(successMessage, this.form);

        // Eliminar mensaje después de 5 segundos
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    showFormError(message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error';
        errorMessage.setAttribute('role', 'alert');
        errorMessage.setAttribute('aria-live', 'polite');
        errorMessage.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #ff4444, #cc0000);
                color: #fff;
                padding: 1rem;
                border-radius: 8px;
                margin: 1rem 0;
                font-weight: 600;
                text-align: center;
                box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3);
            ">
                <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
                ${message}
            </div>
        `;

        // Insertar antes del formulario
        this.form.parentNode.insertBefore(errorMessage, this.form);

        // Eliminar mensaje después de 5 segundos
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    }

    resetForm() {
        this.form.reset();

        // Limpiar estados de validación
        Object.keys(this.fields).forEach(fieldName => {
            this.clearFieldError(fieldName);
            const element = this.fields[fieldName].element;
            element.classList.remove('valid', 'error');
            element.setAttribute('aria-invalid', 'false');
        });

        // Restaurar botón de envío
        if (this.submitButton) {
            this.submitButton.disabled = false;
            this.submitButton.textContent = 'Enviar Mensaje';
            this.submitButton.setAttribute('aria-disabled', 'false');
        }
    }

    updateSubmitButton() {
        if (!this.submitButton) return;

        const allValid = Object.keys(this.fields).every(fieldName => {
            const field = this.fields[fieldName];
            const element = field.element;

            // Si el campo es requerido y está vacío, no es válido
            if (element.hasAttribute('required') && !element.value.trim()) {
                return false;
            }

            // Si el campo tiene valor pero no es válido
            if (element.value.trim() && element.classList.contains('error')) {
                return false;
            }

            return true;
        });

        this.submitButton.disabled = !allValid;
        this.submitButton.setAttribute('aria-disabled', allValid ? 'false' : 'true');
    }

    adjustTextareaHeight(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.max(80, Math.min(200, textarea.scrollHeight)) + 'px';
    }
}

// Inicializar validación cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    // Buscar formularios en la página
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        new FormValidator('contactForm');
    }

    // Buscar otros formularios
    const forms = document.querySelectorAll('form:not(#contactForm)');
    forms.forEach((form, index) => {
        if (!form.id) {
            form.id = `form-${index}`;
        }
        new FormValidator(form.id);
    });
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormValidator;
}