import { ethers } from "ethers";

export const contractAddress = "0xFE510A47f20e941674f179dDC3C00a68377a0194";

// ✅ Updated ABI (matches the new Solidity contract)
export const abi = [
  "function topUpFiat(uint256 amount) external",
  "function buyTokens(uint256 amount) external",
  "function sellTokens(uint256 amount) external",
  "function getBalances(address user) external view returns (uint256, uint256)",
  "function getUserTransactions(address user) external view returns (tuple(address user, string transactionType, uint256 amount, uint256 timestamp)[])",
  "function purchaseSubscription(uint256 planId, uint256 cost) external",
  "function getUserSubscription(address user) external view returns (tuple(uint256 id, string name, uint256 validityMonths) plan, uint256 expiryTimestamp, uint256 cost)",
  "function plans(uint256) external view returns (uint256 id, string name, uint256 validityMonths)",
  "function owner() external view returns (address)"
];

// --- Get contract instance ---
export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not installed");

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, abi, signer);
};

// --- Wallet functions ---
export const topUpFiat = async (amount) => {
  const contract = await getContract();
  const tx = await contract.topUpFiat(amount);
  await tx.wait();
};

export const buyTokens = async (amount) => {
  const contract = await getContract();
  const tx = await contract.buyTokens(amount);
  await tx.wait();
};

export const sellTokens = async (amount) => {
  const contract = await getContract();
  const tx = await contract.sellTokens(amount);
  await tx.wait();
};

export const getBalances = async (userAddress) => {
  const contract = await getContract();
  const [walletBalance, tokenBalance] = await contract.getBalances(userAddress);
  return { walletBalance, tokenBalance };
};

// --- Subscription functions ---
export const purchaseSubscription = async (planId, cost) => {
  const contract = await getContract();
  const tx = await contract.purchaseSubscription(planId, cost);
  await tx.wait();
};

export const getUserSubscription = async (userAddress) => {
  const contract = await getContract();
  const [plan, expiryTimestamp] = await contract.getUserSubscription(userAddress);
  return {
    plan,
    expiry: new Date(Number(expiryTimestamp) * 1000) // Convert to JS Date
  };
};

// --- Fetch available plans (optional helper) ---
export const getSubscriptionPlan = async (planId) => {
  const contract = await getContract();
  const plan = await contract.plans(planId);
  return {
    id: Number(plan.id),
    name: plan.name,
    validityMonths: Number(plan.validityMonths)
  };
};

// --- Transaction functions ---
export const getUserTransactions = async (userAddress) => {
  const contract = await getContract();
  const txs = await contract.getUserTransactions(userAddress);

  // Map raw tuples into readable objects
  return txs.map(tx => ({
    user: tx.user,
    type: tx.transactionType,
    amount: Number(tx.amount),
    timestamp: new Date(Number(tx.timestamp) * 1000)
  }));
};
