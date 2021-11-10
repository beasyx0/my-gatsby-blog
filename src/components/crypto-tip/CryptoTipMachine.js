import { Machine, assign } from 'xstate';
import { formatEther } from '@ethersproject/units';


const submitEtherDonation = async (context, data) => {
    const donationAddress = context.donationAddress;
    const sendTransaction = data.sendTransaction;
    const state = data.state;
    const utils = data.utils;
    const amount = utils.parseEther(context.etherAmount);

    await sendTransaction({
      to: donationAddress,
      value: amount,
    })

    return new Promise((resolve, reject)=>{
        if (state.status === 'Mining' || 'Success') {
            return resolve('Transaction submitted to the blockchain.')
        } else {
            return reject('Something went wrong with the transaction.')
        }
    })
}


const alwaysActions = ['updateEtherAmountContext', 'updateDollarAmountDonationContext',];


const updateEtherAmountGuards = [
    {
        cond: 'isZero',
        target: '#cryptoTipMachine.connected.invalid',
        actions: alwaysActions,
    },
    {
        cond: 'isGreaterThanBalance',
        target: '#cryptoTipMachine.connected.invalid',
        actions: alwaysActions,
    },
    {
        cond: 'isEmptyString',
        target: '#cryptoTipMachine.connected.invalid',
        actions: alwaysActions,
    },
    {
        cond: 'isLessThanMinimum',
        target: '#cryptoTipMachine.connected.invalid',
        actions: alwaysActions,
    },
    {
        cond: 'isLessThanOrEqualToBalance',
        target: '#cryptoTipMachine.connected.valid',
        actions: alwaysActions,
    },
]


const statechart = {
    id: 'cryptoTipMachine',
    initial: 'disconnected',
    context: {
        account: undefined,
        donationAddress: process.env.GATSBY_ETH_DONATION_ADDRESS,
        etherBalance: 0,
        etherAmount: 0,
        etherPrice: 0,
        dollarAmountDonation: 0,
        minimumDonation: 0.001,
    },
    on: {
        CONNECTED: 'connected',
        DISCONNECTED: 'disconnected',
        UPDATE_ETHER_BALANCE: {
            actions: ['updateEtherBalanceContext',],
        },
        UPDATE_ETHER_PRICE: {
            actions: ['updateEtherPriceContext',],
        },
    },
    states: {
        disconnected: {},
        connected: {
            entry: 'updateAccountContext',
            initial: 'invalid',
            states: {
                invalid: {
                    initial: 'idle',
                    states: {
                        idle: {
                            on: {
                                UPDATE_ETHER_AMOUNT: updateEtherAmountGuards,
                            },
                        },
                        error: {},
                    },
                },
                valid: {
                    initial: 'idle',
                    states: {
                        idle: {
                            on: {
                                UPDATE_ETHER_AMOUNT: updateEtherAmountGuards,
                                SUBMIT: 'submitting',
                            },
                        },
                        submitting: {
                            invoke: {
                                id: 'submitDonation',
                                src: 'submitDonation',
                                onError: '#cryptoTipMachine.connected.invalid.error',
                                onDone: 'success',
                            },
                        },
                        success: {
                            on: {
                                UPDATE_ETHER_AMOUNT: updateEtherAmountGuards,
                            },
                        },
                    },
                },
            },
        },
    },
}

const machineConfig = {
    guards: {
        isZero: (
            (context, event) => parseFloat(event.data.etherAmount) === 0
        ),
        isGreaterThanBalance: (
            (context, event) => (
                Math.fround(parseFloat(event.data.etherAmount)) > (
                    Math.fround(parseFloat(context.etherBalance))
                )
            )
        ),
        isEmptyString: (
            (context, event) => event.data.etherAmount === ''
        ),
        isLessThanMinimum: (
            (context, event) => (
                Math.fround(parseFloat(event.data.etherAmount)) < (
                    Math.fround(parseFloat(context.minimumDonation))
                )
            )
        ),
        isLessThanOrEqualToBalance: (
            (context, event) => (
                Math.fround(parseFloat(event.data.etherAmount)) <= (
                    Math.fround(parseFloat(context.etherBalance))
                )
            )
        ),
    },
    services: {
        submitDonation: (
            (context, event) => submitEtherDonation(context, event.data)
        ),
    },
    actions: {
        updateAccountContext: (
            assign({
                account: (context, event) => event.data.account,
            })
        ),
        updateEtherBalanceContext: (
            assign({
                etherBalance: (context, event) => (
                    parseFloat(formatEther(event.data.etherBalance)).toFixed(3)
                ),
            })
        ),
        updateEtherAmountContext: (
            assign({
                etherAmount: (context, event) => event.data.etherAmount,
            })
        ),
        updateEtherPriceContext: (
            assign({
                etherPrice: (context, event) => event.data.etherPrice,
            })
        ),
        updateDollarAmountDonationContext: (
            assign({
                dollarAmountDonation: (context, event) => (
                    parseFloat(context.etherPrice * event.data.etherAmount).toFixed(2)
                ),
            })
        ),
    },
}

const CryptoTipMachine = Machine(statechart, machineConfig);

export default CryptoTipMachine;
