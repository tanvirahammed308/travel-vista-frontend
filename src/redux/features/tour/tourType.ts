export interface TourImage {
  public_id: string;
  url: string;
}

/* ---------------- MAIN ENTITY ---------------- */
export interface Tour {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category?: string;
  rating?: number;
  location: string;
  maxGroupSize?: number;  
  image: TourImage;
  createdAt?: string;
  updatedAt?: string;
}

/* ---------------- STATE ---------------- */
export interface TourState {
  tours: Tour[];
  selectedTour: Tour | null;
  loading: boolean;
  error: string | null;
}

/* ---------------- INPUT TYPES ---------------- */
export interface CreateTourInput {
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  image: File; 
}

export interface UpdateTourInput {
  title?: string;
  description?: string;
  price?: number;
  duration?: string;
  location?: string;
  image?: File;
}

/* ---------------- API RESPONSES ---------------- */

export interface CreateTourResponse {
  success?: boolean;
  message?: string;
  tour: Tour;
}

export interface UpdateTourResponse {
  success?: boolean;
  message?: string;
  tour: Tour;
}

export interface GetToursResponse {
  tours: Tour[];
}

export interface GetTourResponse {
  tour: Tour;
}

export interface DeleteTourResponse {
  success?: boolean;
  message?: string;
}