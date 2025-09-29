import React, { useState, useEffect } from "react";
import { Plus, Package } from "lucide-react";

const AddPlan = ({ showToast }) => {
  const initialPlanState = {
    planName: "",
    validity: "28",
    energyLimit: "",
    type: "AC",
    price: "",
  };

  const [formData, setFormData] = useState(initialPlanState);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const savedPlans = localStorage.getItem("energyPlans");
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.planName || !formData.energyLimit || !formData.price) {
      showToast("Please fill all plan fields.", "error");
      return;
    }
    const newPlan = { id: Date.now().toString(), ...formData };
    const updatedPlans = [...plans, newPlan];
    setPlans(updatedPlans);
    localStorage.setItem("energyPlans", JSON.stringify(updatedPlans));
    setFormData(initialPlanState);
    showToast("Plan added successfully!", "success");
  };

  const handleRemovePlan = (planId) => {
    const updatedPlans = plans.filter((p) => p.id !== planId);
    setPlans(updatedPlans);
    localStorage.setItem("energyPlans", JSON.stringify(updatedPlans));
    showToast("Plan removed.", "success");
  };

  const validityOptions = [
    { value: "10", label: "10 Days" },
    { value: "28", label: "28 Days" },
    { value: "48", label: "48 Days" },
    { value: "90", label: "3 Months" },
    { value: "180", label: "6 Months" },
    { value: "365", label: "12 Months" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Create Plan Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Create a New Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Plan Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name</label>
            <input
              type="text"
              name="planName"
              value={formData.planName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., Monthly Saver"
              required
            />
          </div>

          {/* Validity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Validity</label>
            <select
              name="validity"
              value={formData.validity}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              {validityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Energy Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Set Energy Limit (kWh)</label>
            <input
              type="number"
              name="energyLimit"
              value={formData.energyLimit}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., 100"
              min="0"
              required
            />
          </div>

          {/* Type & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="AC">AC</option>
                <option value="DC">DC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., 599"
                min="0"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Plus className="inline-block -mt-1 mr-2 h-5 w-5" />
            Create Plan
          </button>
        </form>
      </div>

      {/* Existing Plans */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Existing Plans</h2>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {plans.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p>No plans created yet.</p>
            </div>
          ) : (
            plans.map((p) => (
              <div
                key={p.id}
                className="p-4 border border-gray-200 rounded-lg flex justify-between items-center hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{p.planName}</h3>
                  <p className="text-sm text-gray-600">
                    {p.energyLimit} kWh | {validityOptions.find((opt) => opt.value === p.validity)?.label} | {p.type}
                  </p>
                  <p className="font-bold text-blue-600 text-lg mt-1">₹{p.price}</p>
                </div>
                <button
                  onClick={() => handleRemovePlan(p.id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPlan;
