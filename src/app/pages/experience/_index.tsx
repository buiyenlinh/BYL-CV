import { useState, useEffect } from "react";
import Loading from "@/app/components/common/loading/_index";
import ErrorComponent from "@/app/components/common/error/_index";
import { getExperiences } from "@/mockapi/_index";
import type { IExperience } from "@/app/model";

const ExperiencePage = () => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadExperiences = async () => {
    getExperiences()
      .then((data: IExperience[]) => {
        setExperiences(data);
        setError("");
      })
      .catch(() => {
        setError("Loading experience data failed.");
      })
      .finally(() => {
        setLoading(false);
      });
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
      <div className="text-3xl font-bold text-center pt-8 pb-12">
        Experiences
      </div>
      <div className="space-y-8 pb-12">
        {experiences?.map((exp: IExperience) => (
          <div
            key={exp.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t border-[#e4e4e4]"
          >
            <div className="mb-4">
              <div className="text-2xl font-semibold">{exp.company}</div>
              <div className="text-xl text-gray-600 dark:text-gray-300">
                {exp.position}
              </div>
              <p className="text-gray-500">
                {exp.startDate} - {exp.endDate}
              </p>
            </div>

            {exp?.experiences?.map((project, index) => (
              <div
                key={index}
                className="mb-6 border-l-4 border-orange-400 pl-4"
              >
                {project.businessDomains && (
                  <h4 className="font-semibold mb-2">
                    Domain: {project.businessDomains}
                  </h4>
                )}
                <p className="mb-2">
                  <span className="font-medium">Technologies: </span>
                  {project.technologies}
                </p>
                <div className="mt-2">
                  <h5 className="font-medium mb-1">Key Responsibilities: </h5>
                  <ul className="list-disc list-inside space-y-1">
                    {project?.responsibilities?.map((resp, idx) => (
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
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePage;
