export interface IExpert {
    socialLinks: {
        twitter: string;
        github: string;
        linkedin: string;
        website: string;
    };
    avatar?: string;
    name: string;
    email: string;
    status: "active" | "inactive" | "pending"; // adjust if more statuses exist
    category: "expert" | "business" | string;   // extend if you have fixed categories
    phone: string;
    gender: string; // could be "male" | "female" | "other" if you want stricter typing
    verified: boolean;
    role: string[];
    preferredIndustry: string[];
    skills: string[];
    bio: string;
    profilePicture?: string;
    availability: "available" | "not available" | string;
    projectCount: number;
    taskCount: number;
    regPercentage: number;
    terms: boolean;
    lastLogin: string;   // ISO date string
    createdAt: string;   // ISO date string
    country: string;
    state: string;
    id: string;
}
