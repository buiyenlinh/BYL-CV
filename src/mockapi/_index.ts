import { ENV } from "@/app/env";
import type { IProfile, IExperience, IHobby, IContact } from "@/app/model";

export const getProfile = () => {
  return fetch(`${ENV.API_URL}/profile`)
    .then((res) => res.json())
    .then((json) => json as IProfile);
};

export const getExperiences = () => {
  return fetch(`${ENV.API_URL}/experiences`)
    .then((res) => res.json())
    .then((json) => json as IExperience[]);
};

export const getHobbies = () => {
  return fetch(`${ENV.API_URL}/hobbies`)
    .then((res) => res.json())
    .then((json) => json as IHobby[]);
};

export const getContact = () => {
  return fetch(`${ENV.API_URL}/contact`)
    .then((res) => res.json())
    .then((json) => json as IContact);
};
