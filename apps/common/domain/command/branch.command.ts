export interface IBranchCommand {
  id?: string;
  name: string;
  location: {
    city: string;
    country: string;
  };
}
