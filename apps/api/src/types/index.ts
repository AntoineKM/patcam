/* eslint-disable no-unused-vars */
export type User = {
  email: string;
  password?: string;
  role: Role;
  createdAt: Date;
};

export enum Role {
  Admin = "admin",
  SuperAdmin = "super-admin",
}

export type Camera = {
  name: string;
  createdAt: Date;
};
