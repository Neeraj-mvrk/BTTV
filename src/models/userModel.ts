export interface IUser {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string | null;
  image?: string | null;
  provider?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

  

  export interface PreferenceData {
    location: string;
    minTemperature: number;
    maxTemperature: number;
    humidity?: number;
    condition: string;
    notify: boolean;
    userId: number; // Add userId to ensure preferences are saved for the correct user
    lat: string;
    lon: string;
  }