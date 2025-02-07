import React from "react";
import { UserInfo } from "../components/UserInfo/userInfo";
import { RecentProjects } from "../components/recentprojects/RecentProjects";
import { Stats } from "../components/Estadisticas/Stats";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <UserInfo />
          <RecentProjects />
        </div>
        <Stats />
      </div>
    </div>
  );
};

export default Dashboard;

