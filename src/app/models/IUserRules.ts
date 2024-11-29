export interface IUserRules {
  readonly path: string;
  readonly rules: {
    readonly read: boolean;
    readonly write: boolean;
  }
}
