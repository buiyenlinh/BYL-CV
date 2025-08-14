import { useState, useEffect } from "react";
import Loading from "@/app/components/common/loading/_index";
import ErrorComponent from "@/app/components/common/error/_index";
import { getContact } from "@/mockapi/_index";
import type { IContact } from "@/app/model";

const ContactPage = () => {
  const [contactInfo, setContactInfo] = useState<IContact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContactInfo = async () => {
    getContact()
      .then((data) => {
        setContactInfo(data);
        setError(null);
      })
      .catch(() => {
        setError("Loading contact information failed.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadContactInfo();
  }, []);

  if (loading) {
    return <Loading fullScreen />;
  }

  if (error || !contactInfo) {
    return (
      <ErrorComponent title={error || "Contact information not available"} />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Contact Information
      </h1>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Personal Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 dark:text-gray-300 font-medium min-w-[120px]">
                  Email:
                </span>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {contactInfo.email}
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-gray-600 dark:text-gray-300 font-medium min-w-[120px]">
                  Phone:
                </span>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {contactInfo.phone}
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-gray-600 dark:text-gray-300 font-medium min-w-[120px]">
                  Address:
                </span>
                <span className="text-gray-800 dark:text-gray-100">
                  {contactInfo.address}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Education
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 dark:text-gray-300 font-medium min-w-[120px]">
                  University:
                </span>
                <span className="text-gray-800 dark:text-gray-100">
                  {contactInfo.university}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-gray-600 dark:text-gray-300 font-medium min-w-[120px]">
                  Major:
                </span>
                <span className="text-gray-800 dark:text-gray-100">
                  {contactInfo.major}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-gray-600 dark:text-gray-300 font-medium min-w-[120px]">
                  Study Period:
                </span>
                <span className="text-gray-800 dark:text-gray-100">
                  {contactInfo.startTime} - {contactInfo.graduationYear}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
