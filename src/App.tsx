import React, { useState } from "react";

import { ethers } from "ethers";

import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

const greetingAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function App() {
  const [greeting, setGreetingValue] = useState<string>("");

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
          Set Greeting
        </button>
      </div>
    </div>
  );
}
