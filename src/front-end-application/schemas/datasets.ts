export type MovieData = {
  movieId: 0,
  title: '',
  director: '',
  random: ''
};

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
