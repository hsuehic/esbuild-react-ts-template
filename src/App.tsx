import React, { useState } from "react";

import { ethers } from "ethers";

import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/NDToken.sol/NDToken.json";

const greetingAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
const tokenAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";

export default function App() {
  const [greeting, setGreetingValue] = useState<string>("");
  const [userAccount, setUserAccount] = useState<string>();
  const [amount, setAmount] = useState<number>();

  async function requestAccount() {
    if (window.ethereum.request) {
      await window.ethereum.request({ method: "eth_accounts" });
    }
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greetingAddress, Greeter.abi, provider);
      try {
        const data = await contract.greet();
        setGreetingValue(data as string);
        console.log("Data:", data);
      } catch (err) {
        console.log("Error:", err);
      }
    }
  }

  async function setGreeting() {
    if (!!greeting && typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greetingAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      fetchGreeting();
    }
  }

  async function getBalance() {
    if (typeof window.ethereum.request !== "undefined") {
      const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transation = await contract.transfer(userAccount, amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  return (
    <div>
      <h1>Hello World, DApp!</h1>
      <div>
        <button type='button' onClick={fetchGreeting}>
          Fetch Greeting
        </button>
      </div>
      <div>
        <input
          type='text'
          onChange={(e) => {
            setGreetingValue(e.target.value);
          }}
          placeholder='Set Greeting'
          value={greeting}
        />
        <button type='button' onClick={setGreeting}>
          Set Greetings
        </button>
      </div>
      <div>
        <input onChange={(e) => setUserAccount(e.target.value)} placeholder='Account ID' />
      </div>
      <div>
        <input onChange={(e) => setAmount(parseInt(e.target.value, 10))} placeholder='Amount' />
      </div>
      <div>
        <button type='button' onClick={getBalance}>
          Get Balance
        </button>
        <button type='button' onClick={sendCoins}>
          Send Coins
        </button>
      </div>
    </div>
  );
}
