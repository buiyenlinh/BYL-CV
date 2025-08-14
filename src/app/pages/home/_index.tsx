import { useState, useEffect } from "react";
import avt from "@/assets/images/avt.jpg";
import cv from "@/assets/documents/BUI YEN LINH_CV.pdf";
import Loading from "@/app/components/common/loading/_index";
import ErrorComponent from "@/app/components/common/error/_index";
import { getProfile } from "@/mockapi/_index";

// Function to resolve asset paths
const resolveAssetPath = (path: string) => {
  if (path.includes("/assets/images/avt.jpg")) return avt;
  if (path.includes("/assets/documents/BUI YEN LINH_CV.pdf")) return cv;
  return path;
};

import type { IProfile } from "@/app/model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = async () => {
    getProfile()
      .then((data: IProfile) => {
        setProfile(data);
        setError("");
      })
      .catch(() => {
        setError("Loading profile data failed.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return <Loading fullScreen />;
  }

  if (error) {
    return <ErrorComponent title={error} onReload={loadProfile} />;
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        No profile data available
      </div>
    );
  }

  return (
    <div className="home container mx-auto py-4 max-w-screen-xl h-full">
      <div className="flex items-center justify-center py-12 lg:h-full">
        <div className="home__intro flex flex-col md:flex-row items-center gap-8 h-full">
          <div className="home__intro-avatar w-48 h-48 rounded-full overflow-hidden">
            <img
              src={resolveAssetPath(profile.avatar)}
              alt={profile.fullName}
              className="w-full h-full object-cover hover:scale-125 transition-transform duration-500"
            />
          </div>

          <div className="home__intro-content max-w-2xl">
            <h1 className="text-4xl font-bold mb-4 text-center sm:text-center lg:text-start">
              {profile?.fullName}
            </h1>
            <div className="text-lg font-bold mb-4">{profile?.role}</div>
            <p className="text-lg mb-6 text-justify">{profile?.introduction}</p>

            <div className="home__intro-links flex gap-4 justify-center sm:justify-center lg:justify-start">
              <a
                href={profile?.socialLinks.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <FontAwesomeIcon className="w-5 h-5" icon={faLinkedin} />
                LinkedIn
              </a>

              <a
                href={resolveAssetPath(profile?.socialLinks.cv)}
                download="BUI YEN LINH_CV.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <FontAwesomeIcon className="w-5 h-5" icon={faFileArrowDown} />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
