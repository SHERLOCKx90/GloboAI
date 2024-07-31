export const SelectTravelList = [
    {
        id: 1,
        title: 'Just You',
        desc: 'A sole traveler in exploration',
        icon: '✈️',
        people: '1'
    },
    {
        id: 8,
        title: 'Romantic Getaway',
        desc: 'A romantic trip for two',
        icon: '❤️',
        people: '2 people'
    },
    {
        id: 3,
        title: 'Family Trip',
        desc: 'A trip for the whole family',
        icon: '👨‍👩‍👧‍👦',
        people: '4+ people'
    },
    {
        id: 4,
        title: 'Friends Group',
        desc: 'A fun journey with friends',
        icon: '👫',
        people: '3-5 people'
    },
    {
        id: 5,
        title: 'Team Outing',
        desc: 'An outing for a team',
        icon: '🧑‍💼🧑‍💼',
        people: '5-10 people'
    },
    {
        id: 6,
        title: 'Extended Family',
        desc: 'Traveling with extended family',
        icon: '👨‍👩‍👦‍👦👨‍👩‍👧‍👦',
        people: '6+ people'
    },
    {
        id: 7,
        title: 'Solo Adventure',
        desc: 'A daring solo adventure',
        icon: '🏞️',
        people: '1 person'
    },

    {
        id: 9,
        title: 'Corporate Retreat',
        desc: 'A retreat for the entire company',
        icon: '🏢',
        people: '10+ people'
    },
    {
        id: 10,
        title: 'Backpacking Crew',
        desc: 'A group of backpackers',
        icon: '🎒',
        people: '3-7 people'
    }
];



export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on average side',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Enjoy at all costs',
        icon: '💸',
    },
]


export const AI_PROMPT = 'Generate Travel Plan for Location : Miami, for {noOfDays} Days for {traveler} with a {budget} budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.'