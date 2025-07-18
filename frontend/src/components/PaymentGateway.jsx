import React from "react";
import fourDots from "../assets/4-dots.svg";
import cardIcon from "../assets/card-nn.svg";
import edit from "../assets/edit.svg";
import solanaIcon from "../assets/solana.svg";
import "../css/PaymentGateway.css";
function Input() {
  return (
    <div className="pay-gate-wrapper">
      <div className="payment-gateway">
        <form className="payment-gateway-left">
          <div className="input-container-1">
            <div className="label-and-edit-btn">
              <div className="label">
                <span className="main-headline">Wallet address</span>
                <span className="secondary-headline">
                  Enter your wallets’s public address
                </span>
              </div>
              <div
                className="edit"
                onClick={() => {
                  console.log("ehh");
                  //add edit logic
                }}
              >
                <img src={edit} alt="edit credit card number" />
                <span className="edit-txt">Edit</span>
              </div>
            </div>
            <img src={solanaIcon} alt="" className="solana-logo" />
            <input type="text" className="input-box-ccn" />
          </div>
          <div className="input-container">
            <div className="label">
              <span className="main-headline">Promo code</span>
              <span className="secondary-headline">
                Enter Promo code for discount
              </span>
            </div>
            <input type="text" className="input-box" />
          </div>
          <div className="input-container last-input-container">
            <div className="label">
              <span className="main-headline">Password</span>
              <span className="secondary-headline">
                Enter your wallet's password
              </span>
            </div>
            <input type="password" id="input" className="input-box" />
          </div>
          <div>
            <input
              type="submit"
              id="submit"
              className="pay-now-btn"
              value="Pay Now"
              onClick={(e) => e.preventDefault()}
            />
          </div>
        </form>
        <div className="payment-gateway-right">
          <div className="payment-summary">
            <div className="card-outer">
              <div className="card">
                <div className="card-holder"></div>
                <img src={cardIcon} alt="" className="card-svg" />
                <span className="credit-card-name">Jonathan Michael</span>
                <span className="ccn-last-four-digits">3456</span>
                <img src={fourDots} alt="" className="four-dots" />
                <span className="balance-in-solana-ccn">1.294 SOL</span>
              </div>
            </div>
            <div className="summary-info">
              <div className="summary-info-item">
                <span className="summary-info-item-left">From</span>
                <span className="summary-info-item-right">Mumbai</span>
              </div>
              <div className="summary-info-item">
                <span className="summary-info-item-left">To</span>
                <span className="summary-info-item-right">Rajapur</span>
              </div>
              <div className="summary-info-item">
                <span className="summary-info-item-left">Date</span>
                <span className="summary-info-item-right">09/06/2025</span>
              </div>
              <div className="summary-info-item">
                <span className="summary-info-item-left">Passengers</span>
                <span className="summary-info-item-right">8</span>
              </div>
              <div className="summary-info-item">
                <span className="summary-info-item-left">Price</span>
                <span className="summary-info-item-right">549.99</span>
              </div>
            </div>
            <div className="total-price">
              <span className="total-price-header">You have to Pay</span>
              <span className="total-price-int">549</span>
              <span className="total-price-float">.99 SOL</span>
            </div>
            <hr className="payment-summary-hr" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Input;
