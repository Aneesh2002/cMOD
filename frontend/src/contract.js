// src/contract.js
import { ethers } from "ethers";

export const contractAddress = "0xedab9db8c58af930d38969a0a187c7c2549c5261";

export const abi = [
  "function topUpFiat(uint256 amount) external",
  "function buyTokens(uint256 amount) external",
  "function sellTokens(uint256 amount) external",
  "function getBalances(address user) external view returns (uint256, uint256)"
];

// Optional helper to get contract instance
export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not installed");

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, abi, signer);
};
