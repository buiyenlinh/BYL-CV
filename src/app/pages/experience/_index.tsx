import { useState, useEffect } from "react";
import Loading from "@/app/components/common/loading/_index";
import ErrorComponent from "@/app/components/common/error/_index";

interface Experience {
  Id: number;
  Company: string;
  Position: string;
  Department?: string;
  StartDate: string;
  EndDate: string;
  Technologies: string | { Technologies: string };
  BusinessDomains?: string;
  Responsibilities: string[];
  Experiences?: Array<{
    BusinessDomains: string;
    Technologies: string;
    Responsibilities: string[];
  }>;
}

const ExperiencePage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadExperiences = async () => {
    try {
      const response = await fetch("http://localhost:3000/Experiences");
      if (!response.ok) {
        throw new Error("Loading experience data failed.");
      }
      const data = await response.json();
      setExperiences(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  if (loading) {
    return <Loading fullScreen />;
  }

  if (error) {
    return <ErrorComponent title={error} onReload={loadExperiences} />;
  }

  return (
    <div className="container mx-auto max-w-screen-xl h-full">
      <div className="space-y-8 py-12">
        {experiences.map((exp: Experience) => (
          <div
            key={exp.Id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t border-[#f9f9f9]"
          >
            <div className="mb-4">
              <div className="text-2xl font-semibold">{exp.Company}</div>
              <div className="text-xl text-gray-600 dark:text-gray-300">
                {exp.Position}
              </div>
              <p className="text-gray-500">
                {exp.StartDate} - {exp.EndDate}
              </p>
            </div>

            {exp.Experiences ? (
              // For experiences with multiple projects/domains
              exp.Experiences.map((project, index) => (
                <div
                  key={index}
                  className="mb-6 border-l-4 border-blue-500 pl-4"
                >
                  <h4 className="font-semibold mb-2">
                    Domain: {project.BusinessDomains}
                  </h4>
                  <p className="mb-2">
                    <span className="font-medium">Technologies: </span>
                    {project.Technologies}
                  </p>
                  <div className="mt-2">
                    <h5 className="font-medium mb-1">Key Responsibilities: </h5>
                    <ul className="list-disc list-inside space-y-1">
                      {project.Responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              // For experiences with single role responsibilities
              <div className="mb-6">
                {exp.BusinessDomains && (
                  <p className="mb-2">
                    <span className="font-medium">Domain: </span>
                    {exp.BusinessDomains}
                  </p>
                )}
                <p className="mb-2">
                  <span className="font-medium">Technologies: </span>
                  {typeof exp.Technologies === "string"
                    ? exp.Technologies
                    : exp.Technologies.Technologies}
                </p>
                <div className="mt-2">
                  <h5 className="font-medium mb-1">Key Responsibilities:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {exp.Responsibilities.map((resp, idx) => (
                      <li
                        key={idx}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePage;
