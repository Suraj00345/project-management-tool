import { useAuthStore } from "../../store/useAuthStore";

const SideBar = ({ tabs, activeTab, setActiveTab }) => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-sm border border-gray-50 p-6">
        {/* Profile Avatar */}
        <div className="text-center mb-6">
          <div className="uppercase w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
            {user.firstName[0]}
            {user.lastName[0]}
          </div>
          <h3 className="font-semibold text-gray-900 capitalize">
            {user?.firstName} {user?.lastName}
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
                className={`cursor-pointer w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} className="mr-3" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
