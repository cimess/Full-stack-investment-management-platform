import React, { useState } from "react";

type ViewMode = "grid" | "list";

interface Project {
  id: number;
  title: string;
  category: string;
  progress: number;
  bgColor: string;
  progressColor: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Web Designing",
    category: "Prototyping",
    progress: 60,
    bgColor: "bg-orange-100",
    progressColor: "bg-orange-500",
  },
  {
    id: 2,
    title: "Testing",
    category: "Prototyping",
    progress: 50,
    bgColor: "bg-indigo-100",
    progressColor: "bg-indigo-600",
  },
  {
    id: 3,
    title: "SVG Animations",
    category: "Prototyping",
    progress: 80,
    bgColor: "bg-teal-100",
    progressColor: "bg-teal-600",
  },
];

const Dashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showMessages, setShowMessages] = useState<boolean>(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300 flex flex-col">

        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-6 flex-1">
            <h1 className="text-xl font-bold">Portfolio</h1>

            <input
              type="text"
              placeholder="Search"
              className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full w-full max-w-md shadow focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              🌙
            </button>

            <button className="bg-black dark:bg-gray-700 text-white w-8 h-8 rounded-full flex items-center justify-center">
              +
            </button>

            <button
              onClick={() => setShowMessages(true)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
            >
              💬
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">

          {/* Sidebar */}
          <aside className="w-20 hidden md:flex flex-col items-center py-10 gap-6">
            <button className="p-3 rounded-full bg-gray-200 dark:bg-gray-700">
              🏠
            </button>
            <button className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              📊
            </button>
            <button className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              📅
            </button>
            <button className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              ⚙️
            </button>
          </aside>

          {/* Projects Section */}
          <section className="flex-1 bg-white dark:bg-gray-800 rounded-3xl p-8 overflow-auto">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Projects</h2>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-gray-200 dark:bg-gray-700"
                      : ""
                  }`}
                >
                  📃
                </button>

                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-gray-200 dark:bg-gray-700"
                      : ""
                  }`}
                >
                  🔲
                </button>
              </div>
            </div>

            <div
              className={`${
                viewMode === "grid"
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }`}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`rounded-3xl p-6 ${project.bgColor} dark:bg-gray-700 transition`}
                >
                  <div className="mb-4">
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm opacity-70">
                      {project.category}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-2">
                      Progress
                    </p>

                    <div className="w-full bg-white dark:bg-gray-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${project.progressColor}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>

                    <p className="text-right text-sm font-bold mt-2">
                      {project.progress}%
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-6 text-xs font-semibold">
                    <span className="bg-white/60 dark:bg-gray-600 px-3 py-1 rounded-full">
                      2 Days Left
                    </span>
                    <span>👥 3</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Messages Panel */}
          {showMessages && (
            <aside className="absolute right-0 top-0 w-full md:w-96 h-full bg-white dark:bg-gray-800 shadow-2xl p-6 transition">
              <button
                onClick={() => setShowMessages(false)}
                className="absolute top-4 right-4"
              >
                ❌
              </button>

              <h2 className="text-xl font-bold mb-6">
                Client Messages
              </h2>

              <div className="space-y-4">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-semibold">Stephanie</p>
                  <p className="text-sm opacity-70">
                    Great work! Let’s move forward.
                  </p>
                </div>

                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-semibold">Mark</p>
                  <p className="text-sm opacity-70">
                    Any updates on the project?
                  </p>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
