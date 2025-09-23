import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { DashboardFooter } from "../components/DashboardFooter";
import RecentTransactions from "../components/ConsumerComponents/RecentTransactions";
import { ethers } from "ethers";
import { contractAddress, abi } from "../contract";

const TransactionsPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const ITEMS_PER_PAGE = 10;

  const loadTransactions = async () => {
    try {
      if (!window.ethereum) return alert("MetaMask not installed");

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const txs = await contract.getUserTransactions(await signer.getAddress());

      // Format transactions (no reversal yet)
      const formatted = txs.map((tx) => ({
        type: tx.transactionType,
        amount: tx.amount.toString(),
        timestamp: new Date(Number(tx.timestamp) * 1000).toLocaleString(),
      }));

      setTransactions(formatted);
    } catch (err) {
      console.error("Error loading transactions:", err);
    }
  };

  React.useEffect(() => {
    loadTransactions();
  }, []);

  // Reverse transactions for newest-first display
  const reversedTransactions = [...transactions].reverse();

  // Pagination logic
  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentTransactions = reversedTransactions.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="flex min-h-screen bg-white w-full">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 px-8 py-6 space-y-8 w-full">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-3xl font-bold">Transactions</h1>
          </div>

          <p className="text-gray-600">
            Here are your most recent charge and wallet activity logs.
          </p>

          <div className="grid grid-cols-1 gap-4 w-full">
            <div className="max-h-[500px] overflow-y-auto  rounded-lg p-4">
              <RecentTransactions transactions={currentTransactions} />
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-2">
                <button
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span className="px-3 py-1">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
};

export default TransactionsPage;
