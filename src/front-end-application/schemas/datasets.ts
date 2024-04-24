export type MovieData = {
  movieId: 0,
  title: '',
  director: '',
  random: ''
};

export type UserData = {
  userId: string;
  userName: string;
  email: string | null;  // To handle the possibility of null values
  admin?: boolean;
  number?: string;
  content?: string;
  firstName: string;
  lastName: string;
  bio: string;
  image: string | null;
};


// Example of an initialized object
  export type BookingData = {
  userId: string,
  bookingId: string,
  accommodationId: number,
  startDate: string,
  endDate?: string,
  guests?: string,
};


export interface Room {
  pricePerRoom: number;
  noAvailable: number;
}

export type AccomadationData = {
  accId: number,
  title: String,
  description: String,
  location: String,
  profilePicture: String,
  facilities: {
    wifi: boolean,
    privateRoomsAvailable: boolean,
    food: boolean,
    lateCheckout: boolean,
    twentyFourCheckIn: boolean,
  },
}

  export type AccomadationPageData = {
    accId: number,
    title: String,
    descriptionOne: String,
    descriptionTwo: String,
    Rooms: {
      single: {
        pricePerRoom: number,
        noAvailable: number,
      },
      double: {
        pricePerRoom: number,
        noAvailable: number,
      },
      twin: {
        pricePerRoom: number,
        noAvailable: number,
      },
      bunkBeds: {
        pricePerRoom: number,
        noAvailable: number,
      }
    };
  }
