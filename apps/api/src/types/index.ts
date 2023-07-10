/* eslint-disable no-unused-vars */
export type User = {
  _id: string;
  __v: number;
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
  _id: string;
  __v: number;
  name: string;
  createdAt: Date;
};

export type JWTUser = {
  _id: string;
  email: string;
  role: Role;
};
