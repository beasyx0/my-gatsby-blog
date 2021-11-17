import React, { useEffect, useRef } from 'react';

import { 
  useEthers, 
  useEtherBalance, 
  useSendTransaction, 
  useNotifications, 
  getExplorerTransactionLink, 
} from '@usedapp/core';
import { useCoingeckoPrice } from '@usedapp/coingecko';

import { utils } from 'ethers';
import { formatEther } from '@ethersproject/units';

import CryptoTipMachine from './CryptoTipMachine';
import { useMachine } from '@xstate/react';

import Loader from 'react-loader-spinner';

import useDarkMode from 'use-dark-mode';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { 
  FaCheck, 
  FaTimes, 
  FaEthereum, 
  FaWallet
} from 'react-icons/fa';

import Identicon from './Identicon';


const CryptoTip = () => {

  // TODO: make disconnect button

  const [machine, send] = useMachine(CryptoTipMachine);

  const { activateBrowserWallet, account, chainId } = useEthers();

  const etherBalance = useEtherBalance(account) || 0;

  const etherPrice = useCoingeckoPrice('ethereum', 'usd');

  const dollarAmount = machine.context.dollarAmountDonation;

  const { sendTransaction, state } = useSendTransaction({ transactionName: 'Tip Crypto' });
  
  const { notifications } = useNotifications();

  const etherInputRef = useRef();

  const darkMode = useDarkMode();

  const handleConnectWallet = () => {
    activateBrowserWallet();
  }

  const handleOnChange = (e) => {
    send({
      type: 'UPDATE_ETHER_AMOUNT',
      data: {etherAmount: e.target.value}
    })
  }

  const handleSubmitDonation = async (e) => {
    e.preventDefault();
    etherInputRef.current.value = '';
    send({
      type: 'SUBMIT',
      data: {
        sendTransaction: sendTransaction,
        utils: utils,
        state: state,
      },
    })
  }

  const handleGetExplorerTransactionLink = (notification) => {
    const hash = notification.receipt.transactionHash;
    const currentChain = chainId;
    const transactionExplorerUrl = getExplorerTransactionLink(hash, currentChain);
    return (
      <small 
        className={`
          d-block ${notification.type === 'transactionSucceed' ? 'text-success' : 'text-danger'}
        `}
      >
        {notification.type === 'transactionSucceed' ? 'Success! ' : 'Something went wrong. '}
        {' '}
        <a 
          href={transactionExplorerUrl}
          target="_blank" 
          rel="noreferrer"
        >
          view transaction
        </a> 
      </small>
    )
  }

  const notificationsReducer = (notification) => {
    switch (notification.type) {
      case "walletConnected":
        return <small className={'d-block text-success'}>Wallet Connected.</small>
      case "transactionSucceed":
        return handleGetExplorerTransactionLink(notification)
      case "transactionFailed":
        return handleGetExplorerTransactionLink(notification)
      default:
        return <span className={'d-none'}></span>
    }
  }

  useEffect(()=>{
    send({
      type: 'CONNECTED',
      data: {account: account},
    })
  }, [account, send])

  useEffect(()=>{
    send({
      type: 'UPDATE_ETHER_BALANCE',
      data: {etherBalance: etherBalance}
    })
  }, [etherBalance, send])

  useEffect(()=>{
    send({
      type: 'UPDATE_ETHER_PRICE',
      data: {etherPrice: etherPrice}
    })
  }, [etherPrice, send])

  const notAllowedCursorStyle = {
    cursor: 'not-allowed',
  }

  const formLabelStyle = {
    position: 'absolute',
    left: '-9999px'
  }

  return(
    <Card className={'mb-4 p-2 bg-transparent shadow'}>
      <Card.Body>
        <div className={'d-flex justify-content-between'}>
          <h5 className={'mb-4'}>
            <FaEthereum  />
            {' '}
            Tip Ether
          </h5>
          {etherPrice && (
            <span>
              ETH <span className={'text-success'}>${etherPrice}</span>
            </span>
          )}
        </div>
        <Card.Text>
          If you like this page please consider connecting your 
          Ethereum wallet and making a donation. It would be much 
          apprectiated!
        </Card.Text>
        {account ? (
          <>
            <div className={'d-flex justify-content-between'}>
              <div className={`
                mb-2 px-1 d-inline-block border ${darkMode.value && 'border-secondary'} rounded
              `}>
                <small className={'mx-2'}>
                  {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH 
                </small>
                <div className={`
                  px-1 d-inline border ${darkMode.value ? 'border-secondary bg-dark' : 'bg-light'} rounded
                `}>
                  <small>
                    {account.slice(0, 6)}...{account.slice(account.length - 4, account.length)}
                  </small>
                  <Identicon />
                </div>
              </div>
            </div>
            <Form onSubmit={handleSubmitDonation}>
              <Form.Label for="cryptoTipInput" style={formLabelStyle}>
                Amount to donate
              </Form.Label>
              <Form.Control 
                id="cryptoTipInput" 
                type="number"
                required
                min={0}
                max={5}
                step={0.001}
                size="sm"
                placeholder="Enter amount to tip.."
                className={`mb-2 d-inline ${darkMode.value && 'bg-transparent text-light'}`}
                onChange={handleOnChange}
                ref={etherInputRef}
              />
              <span style={!machine.matches('connected.valid.idle') ? notAllowedCursorStyle : null}>
                <Button 
                  disabled={!machine.matches('connected.valid.idle')}
                  variant="primary"
                  type="submit"
                >
                  Tip ${
                    (dollarAmount && machine.matches('connected.valid.idle')) ? parseFloat(dollarAmount).toFixed(2) : '0.00'
                  }
                </Button>
              </span>
              {(machine.matches('connected.invalid.idle') && parseFloat(machine.context.etherAmount) > 0) && (
                <FaTimes className={'mx-3 d-inline text-danger'} />
              )}
              {machine.matches('connected.valid.idle') && (
                <FaCheck className={'mx-3 d-inline text-success'} />
              )}
              {machine.matches('connected.valid.submitting') && (
                <Loader
                  type="Puff"
                  color="#00BFFF"
                  height={35}
                  width={35}
                  className={'mx-3 d-inline'}
                />
              )}
              {notifications.length > 0 && (
                <div className={'py-2 position-absolute'}>
                  {notifications.map((notification)=>{
                    return notificationsReducer(notification)
                  })}
                </div>
              )}
            </Form>
          </>
        ) : (
          <Button variant="primary" onClick={handleConnectWallet}>
            Connect <FaWallet className={'text-light'} />
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default CryptoTip;
