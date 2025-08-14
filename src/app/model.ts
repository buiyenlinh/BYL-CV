export interface IProfile {
  id: number;
  fullName: string;
  englishName: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  introduction: string;
  avatar: string;
  socialLinks: {
    linkedIn: string;
    cv: string;
  };
}

export interface IExperience {
  id: number;
  company: string;
  position: string;
  department?: string;
  startDate: string;
  endDate: string;
  experiences: Array<{
    businessDomains: string;
    technologies: string;
    responsibilities: string[];
  }>;
}

export interface IHobby {
  title: string;
  description: string;
  icon: string;
}

export interface IContact {
  email: string;
  phone: string;
  address: string;
  university: string;
  major: string;
  startTime: string;
  graduationYear: string;
}
