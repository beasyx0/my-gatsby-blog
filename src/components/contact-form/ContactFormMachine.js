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
                onDone: {
                    target: 'valid',
                },
                onError: {
                    target: 'invalid',
                },
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
                onDone: {
                    target: 'success',
                },
                onError: {
                    target: 'error',
                },
            },
        },
        success: {
            type: 'final',
        },
        error: {
            on: {
                CHANGE: 'validating',
                RETRY: 'submitting',
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
            })
        ),
    },
}

const ContactFormMachine = Machine(statechart, machineConfig);

export default ContactFormMachine;
