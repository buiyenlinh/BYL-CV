import ErrorComponent from "@/app/components/common/error/_index";
import Loading from "@/app/components/common/loading/_index";
import { getHobbies } from "@/mockapi/_index";
import { useEffect, useState } from "react";

interface IHobbyItem {
  title: string;
  description: string;
  icon: string;
}
const HobbiesPage = () => {
  const [hobbies, setHobbies] = useState<IHobbyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHobbies = async () => {
    getHobbies()
      .then((data: IHobbyItem[]) => {
        setHobbies(data);
        setError("");
      })
      .catch(() => {
        setError("Loading hobbies data failed.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadHobbies();
  }, []);

  if (isLoading) {
    return <Loading fullScreen />;
  }

  if (error) {
    return <ErrorComponent title={error} onReload={() => loadHobbies()} />;
  }

  return (
    <div className="hobbies container mx-auto  max-w-screen-xl px-4 py-8">
      <div className="hobbies__title text-3xl font-bold text-center mb-8">
        Hobbies & Interests
      </div>
      <div className="hobbies__list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            className="hobbies__item p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800"
          >
            <div className="text-4xl mb-4">{hobby.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{hobby.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {hobby.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HobbiesPage;
