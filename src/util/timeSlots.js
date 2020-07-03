//fish
// 9pm - 4am
// 9am - 4pm
// 4pm - 9am

//bugs
// 4am - 5pm
// 4am - 7pm
// 4am - 8am
// 8am - 4pm
// 8am - 5pm
// 8am - 7pm
// 4pm - 7pm
// 4pm - 11pm
// 5pm - 4am
// 5pm - 7pm
// 5pm - 8am
// 7pm - 4am
// 7pm - 8am
// 11pm - 8am

//sea critters
// 4pm - 9am
// 9pm - 4am
// 9am - 4pm
// 4am - 9pm

const timeSlots = {
    0: {
        label: '12am',
        timeSlots: [
            '9pm - 4am',
            '4pm - 9am',
            '5pm - 4am',
            '5pm - 8am',
            '7pm - 4am',
            '7pm - 8am',
            '11pm - 8am',
        ],
    },
    1: {
        label: '1am',
        timeSlots: [
            '9pm - 4am',
            '4pm - 9am',
            '5pm - 4am',
            '5pm - 8am',
            '7pm - 4am',
            '7pm - 8am',
            '11pm - 8am',
        ],
    },
    2: {
        label: '2am',
        timeSlots: [
            '9pm - 4am',
            '4pm - 9am',
            '5pm - 4am',
            '5pm - 8am',
            '7pm - 4am',
            '7pm - 8am',
            '11pm - 8am',
        ],
    },
    3: {
        label: '3am',
        timeSlots: [
            '9pm - 4am',
            '4pm - 9am',
            '5pm - 4am',
            '5pm - 8am',
            '7pm - 4am',
            '7pm - 8am',
            '11pm - 8am',
        ],
    },
    4: {
        label: '4am',
        timeSlots: [
            '4am - 9pm',
            '4pm - 9am',
            '5pm - 8am',
            '7pm - 8am',
            '11pm - 8am',
            '4am - 5pm',
            '4am - 7pm',
            '4am - 8am',
        ],
    },
    5: {
        label: '5am',
        timeSlots: [
            '4am - 9pm',
            '4pm - 9am',
            '5pm - 8am',
            '7pm - 8am',
            '11pm - 8am',
            '4am - 5pm',
            '4am - 7pm',
            '4am - 8am',
        ],
    },
    6: {
        label: '6am',
        timeSlots: [
            '4am - 9pm',
            '4pm - 9am',
            '5pm - 8am',
            '7pm - 8am',
            '11pm - 8am',
            '4am - 5pm',
            '4am - 7pm',
            '4am - 8am',
        ],
    },
    7: {
        label: '7am',
        timeSlots: [
            '4am - 9pm',
            '4pm - 9am',
            '5pm - 8am',
            '7pm - 8am',
            '11pm - 8am',
            '4am - 5pm',
            '4am - 7pm',
            '4am - 8am',
        ],
    },
    8: {
        label: '8am',
        timeSlots: [
            '4am - 9pm',
            '4pm - 9am',
            '4am - 5pm',
            '4am - 7pm',
            '8am - 4pm',
            '8am - 5pm',
            '8am - 7pm',
        ],
    },
    9: {
        label: '9am',
        timeSlots: [
            '4am - 9pm',
            '9am - 4pm',
            '4am - 5pm',
            '4am - 7pm',
            '8am - 4pm',
            '8am - 5pm',
            '8am - 7pm',
        ],
    },
    10: {
        label: '10am',
        timeSlots: [
            '4am - 9pm',
            '9am - 4pm',
            '4am - 5pm',
            '4am - 7pm',
            '8am - 4pm',
            '8am - 5pm',
            '8am - 7pm',
        ],
    },
    11: {
        label: '11am',
        timeSlots: [
            '9am - 4pm',
            '4am - 5pm',
            '4am - 7pm',
            '4am - 9pm',
            '8am - 4pm',
            '8am - 5pm',
            '8am - 7pm',
        ],
    },
    12: {
        label: '12pm',
        timeSlots: [
            '9am - 4pm',
            '4am - 5pm',
            '4am - 7pm',
            '4am - 9pm',
            '8am - 4pm',
            '8am - 5pm',
            '8am - 7pm',
        ],
    },
    13: {
        label: '1pm',
        timeSlots: [
            '9am - 4pm',
            '4am - 5pm',
            '4am - 7pm',
            '4am - 9pm',
            '8am - 4pm',
            '8am - 5pm',
            '8am - 7pm',
        ],
    },
    14: {
        label: '2pm',
        timeSlots: [
            '9am - 4pm',
            '4am - 5pm',
            '4am - 7pm',
            '4am - 9pm',
            '8am - 4pm',
            '8am - 5pm',
            '8am - 7pm',
        ],
    },
    15: {
        label: '3pm',
        timeSlots: [
            '9am - 4pm',
            '4am - 5pm',
            '4am - 7pm',
            '4am - 9pm',
            '8am - 4pm',
            '8am - 5pm',
            '8am - 7pm',
        ],
    },
    16: {
        label: '4pm',
        timeSlots: [
            '4pm - 9am',
            '4am - 5pm',
            '4am - 7pm',
            '4am - 9pm',
            '8am - 5pm',
            '8am - 7pm',
            '4pm - 7pm',
            '4pm - 11pm',
        ],
    },
    17: {
        label: '5pm',
        timeSlots: [
            '4pm - 9am',
            '4am - 7pm',
            '8am - 7pm',
            '4pm - 7pm',
            '4am - 9pm',
            '4pm - 11pm',
            '5pm - 4am',
            '5pm - 7pm',
            '5pm - 8am',
        ],
    },
    18: {
        label: '6pm',
        timeSlots: [
            '4pm - 9am',
            '4am - 7pm',
            '8am - 7pm',
            '4pm - 7pm',
            '4am - 9pm',
            '4pm - 11pm',
            '5pm - 4am',
            '5pm - 7pm',
            '5pm - 8am',
        ],
    },
    19: {
        label: '7pm',
        timeSlots: [
            '4am - 9pm',
            '4pm - 9am',
            '4pm - 11pm',
            '5pm - 4am',
            '5pm - 8am',
            '7pm - 4am',
            '7pm - 8am',
        ],
    },
    20: {
        label: '8pm',
        timeSlots: [
            '4am - 9pm',
            '4pm - 9am',
            '4pm - 11pm',
            '5pm - 4am',
            '5pm - 8am',
            '7pm - 4am',
            '7pm - 8am',
        ],
    },
    21: {
        label: '9pm',
        timeSlots: [
            '4pm - 9am',
            '9pm - 4am',
            '4pm - 11pm',
            '5pm - 4am',
            '5pm - 8am',
            '7pm - 4am',
            '7pm - 8am',
        ],
    },
    22: {
        label: '10pm',
        timeSlots: [
            '4pm - 9am',
            '9pm - 4am',
            '4pm - 11pm',
            '5pm - 4am',
            '5pm - 8am',
            '7pm - 4am',
            '7pm - 8am',
        ],
    },
    23: {
        label: '11pm',
        timeSlots: [
            '4pm - 9am',
            '9pm - 4am',
            '5pm - 4am',
            '5pm - 8am',
            '7pm - 4am',
            '7pm - 8am',
            '11pm - 8am',
        ],
    },
};

export default timeSlots;
