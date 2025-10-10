export interface IProject {
  title: string;
  status: "pending" | "open" | "in_progress" | "under_review" | "completed" | "cancelled" | "disputed"; // extend with all possible statuses
  dueDate: string; // ISO date string
  brief: string;
  goal: string;
  resources: string[]; // array of file URLs
  proposedTotalCost: number;
  paymentStatus: "pending" | "paid" | "failed"; // extend with possible states
  adminApproved: boolean;
  requestSupervisor: boolean;
  businessId: {
    id: string;
    name: string;
    title: string;
    email: string;
  };
   challengeId: {
    id: string;
    description: string;
    type: string;
  };
  experts: string[]; // assuming expert IDs or names
  createdAt: string; // ISO date string
  id: string;
}
