/* eslint-disable no-unused-vars */
export type User = {
  email: string;
  role: Role;
};

export enum Role {
  Admin = "admin",
  SuperAdmin = "super-admin",
}

export type Camera = {
  name: string;
  slug: string;
};
