import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useJob from "../context/JobContext";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import {
  FaSmile,
  FaSurprise,
  FaGrinStars,
  FaSadTear,
  FaGrinBeam,
} from "react-icons/fa";
import { JOB_STATUS } from "../components/constants";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const iconMap = {
  [JOB_STATUS.BOOKMARKED]: <FaGrinStars className="text-4xl text-purple-300" />,
  [JOB_STATUS.APPLIED]: <FaSmile className="text-4xl text-purple-300" />,
  [JOB_STATUS.INTERVIEWING]: (
    <FaSurprise className="text-4xl text-purple-300" />
  ),
  [JOB_STATUS.REJECTED]: <FaSadTear className="text-4xl text-purple-300" />,
  [JOB_STATUS.OFFERED]: <FaGrinBeam className="text-4xl text-purple-300" />,
};

const JobStats = () => {
  const { state, getJobStats } = useJob();
  const { jobStats } = state;
  const navigate = useNavigate();

  useEffect(() => {
    getJobStats();
  }, []);

  const statusCounts =
    jobStats?.jobCountByStatus.reduce(
      (acc, { status, count }) => ({ ...acc, [status]: count }),
      Object.fromEntries(Object.values(JOB_STATUS).map((status) => [status, 0]))
    ) || {};

  const positionCounts = jobStats?.jobCountByPosition.reduce(
    (acc, { position, count }) => ({ ...acc, [position]: count }),
    {}
  );

  const positionData = {
    labels: Object.keys(positionCounts || {}),
    datasets: [
      {
        label: "Job Positions",
        data: Object.values(positionCounts || {}),
        backgroundColor: [
          "#4B9CD3",
          "#FFBF00",
          "#FF6F61",
          "#D9534F",
          "#5BC0DE",
        ],
        borderWidth: 0,
      },
    ],
  };

  const dailyAppliedCounts = jobStats?.jobAppliedPerDay.reduce(
    (acc, { _id, count }) => ({ ...acc, [_id]: count }),
    {}
  );

  const dailyAppliedData = {
    labels: Object.keys(dailyAppliedCounts || {}),
    datasets: [
      {
        label: "Jobs Applied Per Day",
        data: Object.values(dailyAppliedCounts || {}),
        borderColor: "#6D28D9",
        backgroundColor: "rgba(0, 0, 0, 0)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="container mt-8 mb-32">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Job Statistics</h2>

      {/* Job Status*/}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Job Status</h3>
        <div className="flex flex-wrap gap-6">
          {Object.values(JOB_STATUS).map((status) => (
            <div
              key={status}
              onClick={() => navigate("/jobs")}
              className="flex items-start justify-between gap-4 p-4 bg-white rounded-lg shadow-md flex-1 border-t-8 border-purple-300 cursor-pointer"
            >
              <div className="flex flex-col items-start flex-1">
                <div className="text-sm text-gray-600 capitalize mb-2">
                  {status}
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {statusCounts[status]}
                </div>
              </div>
              <div className="flex items-center">{iconMap[status]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Positions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Job Positions
          </h3>
          <div className="h-64">
            <Doughnut
              data={positionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "bottom" },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        {/* Jobs Applied Per Day */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Jobs Applied Per Day
          </h3>
          <div className="h-64">
            <Line
              data={dailyAppliedData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: { display: false },
                  },
                  y: {
                    grid: { display: false },
                    ticks: {
                      beginAtZero: true,
                      stepSize: 50,
                    },
                  },
                },
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `${context.dataset.label}: ${context.raw}`,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobStats;
