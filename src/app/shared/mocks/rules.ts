import { IUserRules } from "../../models/IUserRules";

export const UserRules: Readonly<IUserRules[]> = [
  {
    path: 'tickets/tickets-list',
    rules: {
      write: false,
      read: true,
    }
  },
  {
    path: 'tickets/settings',
    rules: {
      write: false,
      read: true,
    }
  },
  {
    path: 'tickets/orders',
    rules: {
      write: false,
      read: true
    }
  }
];
