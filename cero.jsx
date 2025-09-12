import React, { useState } from "react";
import {
  Rocket,
  Menu,
  MessageSquare,
  BarChart2,
  Layers,
  Users,
} from "lucide-react";

// Campaign type definition as JSDoc for clarity
/**
 * @typedef {Object} Campaign
 * @property {string} type
 * @property {string} name
 * @property {string} target
 * @property {string} budget
 * @property {{productName: string, productPrice: string, productDesc: string}|null} [product]
 * @property {{serviceName: string, serviceDesc: string, serviceAudience: string}|null} [service]
 */

export default function CEROApp() {
  // States
  const [page, setPage] = useState("welcome");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    campaignType: "",
    campaignName: "",
    targetAudience: "",
    budget: "",
    product: { productName: "", productPrice: "", productDesc: "" },
    service: { serviceName: "", serviceDesc: "", serviceAudience: "" },
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (page === "signup") {
      setIsAuthenticated(true);
      setPage("home");
    } else if (page === "promotionDetails") {
      setPage("promotionExtra");
    } else if (page === "promotionExtra") {
      const newCampaign = {
        type: formData.campaignType,
        name: formData.campaignName,
        target: formData.targetAudience,
        budget: formData.budget,
        product:
          formData.campaignType === "product" ? formData.product : null,
        service:
          formData.campaignType === "service" ? formData.service : null,
      };
      setCampaigns([...campaigns, newCampaign]);
      setPage("postPreview");
    }
  };

  // Reusable Navbar
  const Navbar = () => (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      <h1
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => setPage("home")}
      >
        CERO
      </h1>
      <button onClick={() => setMenuOpen(!menuOpen)}>
        <Menu className="w-6 h-6" />
      </button>
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-xl w-48 p-2">
          <button
            onClick={() => setPage("home")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Home
          </button>
          <button
            onClick={() => setPage("analysis")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Analysis
          </button>
          <button
            onClick={() => setPage("chat")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Chat
          </button>
          <button
            onClick={() => setPage("services")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Services
          </button>
          <button
            onClick={() => setPage("about")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            About Us
          </button>
        </div>
      )}
    </nav>
  );

  // Render pages
  const renderPage = () => {
    switch (page) {
      case "welcome":
        return (
          <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center p-6 relative overflow-hidden">
            {/* Looping marketing video background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
              src="https://assets.mixkit.co/videos/preview/mixkit-digital-marketing-team-discussing-ideas-5045-large.mp4"
            />
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
                alt="Marketing"
                className="mx-auto mb-6 rounded-2xl shadow-2xl w-40 h-40 object-cover border-4 border-white"
              />
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-bounce drop-shadow-lg">
                Welcome to CERO
              </h1>
              <p className="text-xl mb-8 drop-shadow">
                The future of digital promotion powered by AI
              </p>
              <button
                onClick={() => setPage("signup")}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition text-lg shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        );
      case "signup":
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Create Your Account
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-xl"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-xl"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-xl"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        );
      case "home":
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
            <Navbar />
            <header className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700 text-white flex items-center justify-center overflow-hidden">
              {/* Looping video background for home */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
                src="https://assets.mixkit.co/videos/preview/mixkit-marketing-team-brainstorming-5046-large.mp4"
              />
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
                alt="Hero"
                className="absolute inset-0 w-full h-full object-cover opacity-10 z-0"
              />
              <div className="relative text-center z-10">
                <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
                  Elevate Your Brand
                </h2>
                <p className="mb-6 drop-shadow">
                  AI-powered promotion for businesses of all sizes
                </p>
                <button
                  onClick={() => setPage("promotionSelect")}
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-100"
                >
                  Create Promotion
                </button>
              </div>
            </header>
            <main className="p-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.length === 0 && (
                <div className="col-span-full text-center text-gray-400 text-xl mt-12">
                  <img
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
                    alt="No Campaigns"
                    className="mx-auto mb-4 w-32 h-32 object-cover rounded-full opacity-60"
                  />
                  No campaigns yet. Start your first promotion!
                </div>
              )}
              {campaigns.map((c, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition flex flex-col items-center text-center border border-blue-100"
                >
                  <img
                    src={
                      c.type === "product"
                        ? "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
                        : "https://images.unsplash.com/photo-1515168833906-d2a3b82b1a48?auto=format&fit=crop&w=400&q=80"
                    }
                    alt={c.type}
                    className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-blue-200"
                  />
                  <h3 className="font-bold text-lg text-blue-700 mb-1">
                    {c.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 capitalize">
                    {c.type}
                  </p>
                  <p className="mt-2 text-gray-700">
                    Target:{" "}
                    <span className="font-semibold">{c.target}</span>
                  </p>
                  <p className="text-gray-700">
                    Budget:{" "}
                    <span className="font-semibold">{c.budget}</span>
                  </p>
                </div>
              ))}
            </main>
          </div>
        );
      case "promotionSelect":
        return (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">Select Promotion Type</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPage("promotionDetails");
                }}
                className="space-y-4"
              >
                <select
                  name="campaignType"
                  value={formData.campaignType}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-xl"
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="product">Product Promotion</option>
                  <option value="service">Service Promotion</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
                >
                  Next
                </button>
              </form>
            </div>
          </div>
        );
      case "promotionDetails":
        return (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">Campaign Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="campaignName"
                  placeholder="Campaign Name"
                  value={formData.campaignName}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-xl"
                  required
                />
                <input
                  type="text"
                  name="targetAudience"
                  placeholder="Target Audience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-xl"
                  required
                />
                <input
                  type="text"
                  name="budget"
                  placeholder="Budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-xl"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
                >
                  Next
                </button>
              </form>
            </div>
          </div>
        );
      case "promotionExtra":
        return (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">
                {formData.campaignType === "product"
                  ? "Product Details"
                  : "Service Details"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {formData.campaignType === "product" ? (
                  <>
                    <input
                      type="text"
                      name="productName"
                      placeholder="Product Name"
                      value={formData.product.productName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          product: { ...prev.product, productName: e.target.value },
                        }))
                      }
                      className="w-full p-3 border rounded-xl"
                      required
                    />
                    <input
                      type="text"
                      name="productPrice"
                      placeholder="Product Price"
                      value={formData.product.productPrice}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          product: { ...prev.product, productPrice: e.target.value },
                        }))
                      }
                      className="w-full p-3 border rounded-xl"
                      required
                    />
                    <textarea
                      name="productDesc"
                      placeholder="Product Description"
                      value={formData.product.productDesc}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          product: { ...prev.product, productDesc: e.target.value },
                        }))
                      }
                      className="w-full p-3 border rounded-xl"
                      required
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      name="serviceName"
                      placeholder="Service Name"
                      value={formData.service.serviceName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          service: { ...prev.service, serviceName: e.target.value },
                        }))
                      }
                      className="w-full p-3 border rounded-xl"
                      required
                    />
                    <textarea
                      name="serviceDesc"
                      placeholder="Service Description"
                      value={formData.service.serviceDesc}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          service: { ...prev.service, serviceDesc: e.target.value },
                        }))
                      }
                      className="w-full p-3 border rounded-xl"
                      required
                    />
                    <input
                      type="text"
                      name="serviceAudience"
                      placeholder="Target Audience"
                      value={formData.service.serviceAudience}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          service: { ...prev.service, serviceAudience: e.target.value },
                        }))
                      }
                      className="w-full p-3 border rounded-xl"
                      required
                    />
                  </>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
                >
                  Generate Post
                </button>
              </form>
            </div>
          </div>
        );
      case "postPreview":
        // Find the latest campaign
        const latest = campaigns[campaigns.length - 1];
        return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl text-left animate-fadeIn">
              <h2 className="text-2xl font-bold mb-2 text-blue-700 flex items-center gap-2">
                <Rocket className="inline w-6 h-6 text-purple-500" /> Your AI Campaign Plan
              </h2>
              <div className="mb-4 text-gray-600">
                <span className="font-semibold">Campaign:</span> {latest?.name} <br />
                <span className="font-semibold">Type:</span> {latest?.type} <br />
                <span className="font-semibold">Target:</span> {latest?.target} <br />
                <span className="font-semibold">Budget:</span> {latest?.budget}
              </div>
              {latest?.type === "product" && latest.product && (
                <div className="mb-4 bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-600 mb-1">Product Details</h4>
                  <div><b>Name:</b> {latest.product.productName}</div>
                  <div><b>Price:</b> {latest.product.productPrice}</div>
                  <div><b>Description:</b> {latest.product.productDesc}</div>
                </div>
              )}
              {latest?.type === "service" && latest.service && (
                <div className="mb-4 bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-600 mb-1">Service Details</h4>
                  <div><b>Name:</b> {latest.service.serviceName}</div>
                  <div><b>Description:</b> {latest.service.serviceDesc}</div>
                  <div><b>Audience:</b> {latest.service.serviceAudience}</div>
                </div>
              )}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-1">Sample Social Posts</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Grand opening special — 20% off today!</li>
                  <li>Try our best-selling item — order online now.</li>
                  <li>We're now accepting online orders and phone pre-orders!</li>
                </ul>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setPage("home")}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-semibold"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => alert('Publish campaign (backend integration needed)')}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Publish Campaign
                </button>
              </div>
            </div>
            <style>{`
              .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1); }
              @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: translateY(0);} }
            `}</style>
          </div>
        );
      case "analysis":
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full animate-fadeIn border border-blue-100">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-700">
                  <BarChart2 className="w-7 h-7 text-purple-500" /> Campaign Analysis
                </h2>
                <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-6">
                  <img src='https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80' alt="Analytics" className="w-40 h-40 object-cover rounded-xl shadow-lg border-2 border-blue-200" />
                  <div className="flex-1">
                    <p className="text-gray-600 text-lg mb-2">Analytics will appear here 📊</p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Track campaign reach and engagement</li>
                      <li>See best performing posts</li>
                      <li>Audience insights and trends</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 text-center mt-4">
                  <span className="text-blue-700 font-semibold">Coming soon:</span> Interactive charts and downloadable reports!
                </div>
              </div>
            </div>
            <style>{`
              .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1); }
              @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: translateY(0);} }
            `}</style>
          </div>
        );
      case "chat":
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full animate-fadeIn border border-blue-100 text-center">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-700">
                  <MessageSquare className="w-7 h-7 text-purple-500" /> AI Chat Assistant
                </h2>
                <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" alt="Chat" className="mx-auto mb-4 w-32 h-32 object-cover rounded-full border-2 border-blue-200 shadow" />
                <p className="text-gray-600 text-lg mb-2">Chat feature coming soon 💬</p>
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 mt-4">
                  <span className="text-blue-700 font-semibold">Ask anything about your campaigns, marketing, or growth!</span>
                </div>
              </div>
            </div>
            <style>{`
              .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1); }
              @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: translateY(0);} }
            `}</style>
          </div>
        );
      case "services":
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full animate-fadeIn border border-blue-100">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-700">
                  <Layers className="w-7 h-7 text-purple-500" /> Our Services
                </h2>
                <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Services" className="mx-auto mb-4 w-32 h-32 object-cover rounded-full border-2 border-blue-200 shadow" />
                <ul className="list-disc pl-6 text-gray-700 space-y-2 text-left">
                  <li>AI-powered promotion</li>
                  <li>Automated post generation</li>
                  <li>Market analysis</li>
                  <li>24/7 support</li>
                </ul>
              </div>
            </div>
            <style>{`
              .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1); }
              @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: translateY(0);} }
            `}</style>
          </div>
        );
      case "about":
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full animate-fadeIn border border-blue-100 text-center">
                <h2 className="text-2xl font-bold mb-4 text-blue-700">About CERO</h2>
                <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80" alt="About" className="mx-auto mb-4 w-32 h-32 object-cover rounded-full border-2 border-blue-200 shadow" />
                <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-2">
                  CERO is a next-gen AI-powered promotion platform designed to help businesses grow online effortlessly 🚀
                </p>
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 mt-4">
                  <span className="text-blue-700 font-semibold">Our mission:</span> Empower every business with smart, affordable marketing.
                </div>
              </div>
            </div>
            <style>{`
              .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1); }
              @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: translateY(0);} }
            `}</style>
          </div>
        );
      default:
        return (
          <div className="h-screen flex items-center justify-center text-gray-600">
            <p>Page under construction 🚧</p>
          </div>
        );
    }
  };

  return <>{renderPage()}</>;
}