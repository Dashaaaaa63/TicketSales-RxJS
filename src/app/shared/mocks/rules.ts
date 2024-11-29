import { IUserRules } from "../../models/IUserRules";

export const UserRules: Readonly<IUserRules[]> = [
  {
    path: 'tickets/tickets-list',
    rules: {
      write: true,
      read: true,
    }
  },
  {
    path: 'tickets/settings',
    rules: {
      write: true,
      read: true,
    }
  },
  {
    path: 'tickets/orders',
    rules: {
      write: true,
      read: true
    }
  }
];
