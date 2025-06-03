import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import StatCard from "./widget-card";
import PieChart from "./pie-chart";
import BarChart from "./bar-chart";
import { Mail, ShoppingBag, ShoppingCart } from "@mui/icons-material";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import {
  ArrowUturnLeftIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@mui/material";
import { useAxios } from "../../lib/hooks";
import Logo from "../../assets/logo.png";

const OverviewAnalytics = () => {
  const axios = useAxios();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    staffCount: 0,
    supervisorCount: 0,
    workCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [staffRes, supervisorRes, workRes] = await Promise.all([
          axios.get("/user/admin/staff/"),
          axios.get("/user/admin/supervisors/"),
          axios.get("/user/admin/catering-work/create/"),
          axios.get("/user/admin/assign-work/list/"),
        ]);

        setStats({
          staffCount: staffRes?.data?.length || 0,
          supervisorCount: supervisorRes?.data?.length || 0,
          workCount: workRes?.data?.length || 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      icon: <UsersIcon className="w-6 h-6" />,
      title: "New Staffs",
      path: "/staff",
      value: stats.staffCount,
      color: "bg-purple-400",
    },
    {
      icon: <SupervisedUserCircleIcon fontSize="medium" />,
      title: "New Supervisors",
      path: "/supervisors",
      value: stats.supervisorCount,
      color: "bg-blue-500",
    },
    {
      icon: <ClipboardDocumentListIcon className="w-6 h-6" />,
      title: "New Works",
      path: "/work-item",
      value: stats.workCount,
      color: "bg-yellow-400",
    },
    {
      icon: <ClipboardDocumentCheckIcon className="w-6 h-6" />,
      title: "Assigned Works",
      path: "/assigned-works",
      value: stats.workCount,
      color: "bg-cyan-400",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Hi, Welcome back 👋</h1>
        <Button
          size="small"
          variant="outlined"
          onClick={() => navigate(-1)}
          color="gray"
          startIcon={<ArrowUturnLeftIcon className="w-5 h-5" />}
        >
          Back
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <StatCard key={i} {...card} isLoading={loading} />
          ))}
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center">
          <img
            src={Logo}
            alt="Dashboard Illustration"
            className="w-[90%] md:w-[80%] xl:w-[66%]"
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewAnalytics;
