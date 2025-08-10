import { useState, useEffect } from "react";
import avt from "@/assets/images/avt.jpg";
import cv from "@/assets/documents/BUI YEN LINH_CV.pdf";
import Loading from "@/app/components/common/loading/_index";
import ErrorComponent from "@/app/components/common/error/_index";

// Function to resolve asset paths
const resolveAssetPath = (path: string) => {
  if (path.includes("/assets/images/avt.jpg")) return avt;
  if (path.includes("/assets/documents/BUI YEN LINH_CV.pdf")) return cv;
  return path;
};

interface ProfileData {
  FullName: string;
  Introduction: string;
  Avatar: string;
  SocialLinks: {
    LinkedIn: string;
    CV: string;
  };
}

const HomePage = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = async () => {
    try {
      const response = await fetch("http://localhost:3000/Profile");
      if (!response.ok) {
        throw new Error("Loading profile data failed.");
      } else {
        setError(null);
      }
      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return <Loading fullScreen />;
  }

  if (error) {
    return (
      <ErrorComponent
        title={"Loading profile data failed."}
        onReload={loadProfile}
      />
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        No profile data available
      </div>
    );
  }

  return (
    <div className="home container mx-auto px-4 max-w-screen-xl h-full">
      <div className="flex items-center justify-center h-full">
        <div className="home__intro flex flex-col md:flex-row items-center gap-8 h-full">
          <div className="home__intro-avatar w-48 h-48 rounded-full overflow-hidden">
            <img
              src={resolveAssetPath(profile.Avatar)}
              alt={profile.FullName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="home__intro-content max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">{profile?.FullName}</h1>
            <p className="text-lg mb-6 text-justify">{profile?.Introduction}</p>

            <div className="home__intro-links flex gap-4">
              <a
                href={profile?.SocialLinks.LinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </a>

              <a
                href={resolveAssetPath(profile?.SocialLinks.CV)}
                download="BUI YEN LINH_CV.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
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
