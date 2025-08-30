import { useState } from "react";
import { User, Lock, Mail } from "lucide-react";

import PageHeading from "../components/my-account/PageHeading";
import SideBar from "../components/my-account/SideBar";
import ProfileForm from "../components/my-account/ProfileForm";
import PasswordForm from "../components/my-account/PasswordForm";
import EmailForm from "../components/my-account/EmailForm";
import { Helmet } from "react-helmet";

const tabs = [
  { id: "PROFILE", label: "Profile Info", icon: User },
  { id: "PASSWORD", label: "Password", icon: Lock },
  { id: "EMAIL", label: "Email", icon: Mail },
];

export default function OrganivoProfile() {
  const [activeTab, setActiveTab] = useState("PROFILE");

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>My Account</title>
        <meta name="description" content="Manage your account settings and preferences." />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeading />

        <div className="grid lg:grid-cols-4 gap-8 mt-8">
          <SideBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-50 p-6 md:p-12">
              {activeTab === "PROFILE" && <ProfileForm setActiveTab={setActiveTab} />}
              {activeTab === "PASSWORD" && <PasswordForm setActiveTab={setActiveTab} />}
              {activeTab === "EMAIL" && <EmailForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
