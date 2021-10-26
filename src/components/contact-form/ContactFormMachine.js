import { Machine, assign } from 'xstate';
import axios from 'axios';
import validator from 'validator';


const validateContactFormInput = (data) => {
    const email = data.email;
    const message = data.message;

    const isValidEmail = validator.isEmail(email);

    const wordCount = message.trim().split(/\s+/).length;
    const isValidMessage = wordCount >= 5;

    return new Promise((resolve, reject) => {
        if (isValidEmail && isValidMessage) {
            return resolve('validated');
        } else {
            return reject('not valid');
        }
    })
}


const submitContactForm = async (data) => {
    const getFormIoEndpointUrl = (
        process.env.GATSBY_GETFORM_CONTACT_FORM_ENDPOINT
    )
    const email = data.email;
    const message = data.message;
    const emailInput = data.emailInput;
    const messageInput = data.messageInput;
    const websiteUrlInput = data.websiteUrlInput;

    const clearForm = () => {
        emailInput.current.value = '';
        messageInput.current.value = '';
    }

    // if this input has a value we don't actually submit the form
    if (websiteUrlInput) {
        clearForm();
        return new Promise((resolve, reject)=>{
            resolve('Form submitted ;-)')
        })
    }

    let formData = new FormData();
    formData.append('contactFormEmail', email);
    formData.append('contactFormMessage', message);
    
    await axios({
        method: 'post',
        url: getFormIoEndpointUrl,
        data: formData,
        headers: { 
          "Content-Type": "multipart/form-data" 
        },
    })
    .then(function (response) {
        clearForm();
        return response;
    })
    .catch(function (error) {
        return error;
    })
}


const statechart = {
    id: 'contactForm',
    initial: 'idle',
    context: {
        email: '',
        message: '',
        websiteUrlInput: '',
        emailInput: '',
        messageInput: '',
    },
    states: {
        idle: {
            on: {
                CHANGE: 'validating',
            }
        },
        validating: {
            actions: ['storeFormData'],
            invoke: {
                id: 'validateEmailAndMessage',
                src: 'validateEmailAndMessage',
                onDone: 'valid',
                onError: 'invalid',
            },
        },
        valid: {
            on: {
                SUBMIT: 'submitting',
                CHANGE: 'validating',
            },
        },
        invalid: {
            on: {
                CHANGE: 'validating',
            }
        },
        submitting: {
            invoke: {
                id: 'submitContactFormData',
                src: 'submitContactFormData',
                onDone: 'success',
                onError: 'error',
            },
        },
        success: {
            type: 'final',
        },
        error: {
            on: {
                CHANGE: 'validating',
                SUBMIT: 'submitting',
            }
        },
    },
};


const machineConfig = {
    services: {
        submitContactFormData: (
            (context, event) => submitContactForm(event.data)
        ),
        validateEmailAndMessage: (
            (context, event) => validateContactFormInput(event.data)
        ),
    },
    actions: {
        storeFormData: (
            assign({ 
                email: (context, event) => event.data.email,
                message: (context, event) => event.data.message,
                websiteUrlInput: (context, event) => event.data.websiteUrlInput,
                emailInput: (context, event) => event.data.emailInput,
                messageInput: (context, event) => event.data.messsageInput,
            })
        ),
    },
}

const ContactFormMachine = Machine(statechart, machineConfig);

export default ContactFormMachine;
