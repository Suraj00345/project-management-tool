import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Check, X, Bell } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function OrganivoProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Corp",
    position: "Product Manager",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [verificationCode, setVerificationCode] = useState("");

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSave = () => {
    console.log("Profile saved:", profileData);
    alert("Profile updated successfully!");
  };

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    console.log("Password updated");
    alert("Password updated successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const sendVerificationCode = () => {
    setCodeSent(true);
    console.log("Verification code sent to:", profileData.email);
    alert("Verification code sent to your email!");
  };

  const verifyEmail = () => {
    if (verificationCode.length === 6) {
      setEmailVerified(true);
      console.log("Email verified with code:", verificationCode);
      alert("Email verified successfully!");
      setVerificationCode("");
      setCodeSent(false);
    } else {
      alert("Please enter a valid 6-digit code");
    }
  };

  const tabs = [
    { id: "profile", label: "Profile Info", icon: User },
    { id: "password", label: "Password", icon: Lock },
    { id: "email", label: "Email Verification", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-2">Manage your profile information and account security</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Profile Avatar */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                  {profileData.firstName[0]}
                  {profileData.lastName[0]}
                </div>
                <h3 className="font-semibold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h3>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id ? "bg-blue-50 text-blue-600 border border-blue-200" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={20} className="mr-3" />
                      <span className="font-medium">{tab.label}</span>
                      {tab.id === "email" && emailVerified && <Check size={16} className="ml-auto text-green-500" />}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Profile Info Tab */}
              {activeTab === "profile" && (
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <User className="text-blue-500 mr-3" size={24} />
                    <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                  </div>

                  <div className="grid gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      onClick={handleProfileSave}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Password Tab */}
              {activeTab === "password" && (
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <Lock className="text-blue-500 mr-3" size={24} />
                    <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
                  </div>

                  <div className="max-w-md space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Password Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                          At least 8 characters long
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                          Contains uppercase and lowercase letters
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                          Contains at least one number
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      onClick={handlePasswordSave}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              )}

              {/* Email Verification Tab */}
              {activeTab === "email" && (
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <Mail className="text-blue-500 mr-3" size={24} />
                    <h2 className="text-2xl font-bold text-gray-900">Email Verification</h2>
                  </div>

                  <div className="max-w-md">
                    {/* Email Status */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <Mail className="text-gray-400 mr-3" size={20} />
                          <div>
                            <p className="font-medium text-gray-900">{profileData.email}</p>
                            <p className="text-sm text-gray-600">Current email address</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {emailVerified ? (
                            <div className="flex items-center text-green-600">
                              <Check size={20} className="mr-1" />
                              <span className="text-sm font-medium">Verified</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-600">
                              <X size={20} className="mr-1" />
                              <span className="text-sm font-medium">Not Verified</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {!emailVerified && (
                      <>
                        {!codeSent ? (
                          <div>
                            <p className="text-gray-600 mb-4">To verify your email address, we'll send a 6-digit verification code to your email.</p>
                            <button
                              onClick={sendVerificationCode}
                              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                              Send Verification Code
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                              <div className="flex items-center">
                                <Bell className="text-blue-500 mr-2" size={20} />
                                <p className="text-blue-800 text-sm">Verification code sent to {profileData.email}</p>
                              </div>
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Enter 6-digit verification code</label>
                              <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-center text-2xl font-mono tracking-widest"
                                placeholder="000000"
                                maxLength="6"
                              />
                            </div>

                            <div className="space-y-3">
                              <button
                                onClick={verifyEmail}
                                className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                              >
                                Verify Email
                              </button>
                              <button
                                onClick={sendVerificationCode}
                                className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors"
                              >
                                Resend Code
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {emailVerified && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={20} />
                          <div>
                            <p className="text-green-800 font-medium">Email Verified!</p>
                            <p className="text-green-700 text-sm">Your email address has been successfully verified.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
