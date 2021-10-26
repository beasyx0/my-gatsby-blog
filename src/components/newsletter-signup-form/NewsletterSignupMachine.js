import { Machine, assign } from 'xstate';
import validator from 'validator';
import addToMailchimp from 'gatsby-plugin-mailchimp';


const validateNewsletterFormInput = (data) => {
    const email = data.email;

    const isValidEmail = validator.isEmail(email);

    return new Promise((resolve, reject) => {
        if (isValidEmail) {
            return resolve('validated');
        } else {
            return reject('not valid');
        }
    })
}


const submitNewsletterFormData = async (data) => {
    const email = data.email;
    const websiteUrl = data.websiteUrl;
    const emailInput = data.emailInput;
    const websiteUrlInput = data.websiteUrlInput;
    const mailChimpListFields = {'MMERGE6': window.location.href};

    const clearForm = () => {
        emailInput.current.value = '';
        websiteUrlInput.current.value = '';
    }

    // if this input has a value we don't actually submit the form
    if (websiteUrl) {
        clearForm();
        return new Promise((resolve, reject)=>{
            resolve('Form submitted ;-)')
        })
    }

    await addToMailchimp(email, mailChimpListFields)
        .then(function (response) {
            clearForm();
            return response;
        })
        .catch(function (error) {
            return error;
        })

    return new Promise((resolve, reject)=>{
        clearForm();
        return resolve('Form submitted.')
    })
}


const statechart = {
    id: 'newsletterForm',
    initial: 'idle',
    context: {
        email: '',
        websiteUrl: '',
        emailInput: '',
        websiteUrlInput: '',
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
                id: 'validateEmail',
                src: 'validateEmail',
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
                id: 'submitNewsletterForm',
                src: 'submitNewsletterForm',
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
        submitNewsletterForm: (
            (context, event) => submitNewsletterFormData(event.data)
        ),
        validateEmail: (
            (context, event) => validateNewsletterFormInput(event.data)
        ),
    },
    actions: {
        storeFormData: (
            assign({ 
                email: (context, event) => event.data.email,
                websiteUrl: (context, event) => event.data.websiteUrl,
                emailInput: (context, event) => event.data.emailInput,
                websiteUrlInput: (context, event) => event.data.websiteUrlInput,
            })
        ),
    },
}

const NewsletterSignupMachine = Machine(statechart, machineConfig);

export default NewsletterSignupMachine;
