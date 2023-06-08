import { v4 as uuidv4 } from 'uuid';
import { additionalUsers, randomUserMock } from "./FE4U-Lab3-mock.js";

// ---------------------task  1---------------------
const courseList = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics'];

const formatTeachers = (data) => {
    const transformedData = randomUserMock.map(teacher => {
        return {
            id: uuidv4(),
            gender: teacher.gender.charAt(0).toUpperCase() + teacher.gender.slice(1),
            title: teacher.name.title,
            full_name: teacher.name.first + ' ' + teacher.name.last,
            city: teacher.location.city,
            state: teacher.location.state,
            country: teacher.location.country,
            postcode: teacher.location.postcode,
            coordinates: {
                Latitude: teacher.location.coordinates.latitude,
                Longitude: teacher.location.coordinates.longitude,
            },
            timezone: {
                offset: teacher.location.timezone.offset,
                description: teacher.location.timezone.description,
            },
            email: teacher.email,
            b_date: teacher.dob.date,
            age: teacher.dob.age,
            phone: teacher.phone,
            picture_Large: teacher.picture.large,
            picture_thumbnail: teacher.picture.thumbnail,
            favorite: false,
            course: courseList[Math.floor(Math.random() * courseList.length)],
            bg_color: '#ffffff',
            note: 'this is a note',
        }
    });
    return transformedData;
}

const teachers = formatTeachers(randomUserMock);
//console.log(teachers);

const mergeLists = (arrayA, arrayB) => {
    const mergedArray = [...arrayA, ...arrayB];
    const resultArray = mergedArray.reduce((acc, curr) => {
        if (!acc.find(obj => obj['full_name'] === curr['full_name'])) {
            acc.push(curr);
        }
        return acc;
    }, []);
    return resultArray;
}

const mergedTeachers = mergeLists(teachers, additionalUsers)
// console.log("Merged arrays:\n", mergedTeachers)

// ---------------------task 2---------------------
const validation = (teacherInfo) => {
    const {
        full_name,
        gender,
        note,
        state,
        city,
        country,
        age,
        phone,
        email
    } = teacherInfo;

    const regex = /^[\p{Lu}]/u;

    if (typeof full_name !== 'string' || regex.test(full_name) != true) {
        throw new Error('Incorrect input of full name. Please try again.');
    }
    if (typeof gender !== 'string' || regex.test(gender) != true) {
        throw new Error('Incorrect input of gender. Please try again.');
    }
    if (typeof note !== 'string' || regex.test(note) != true) {
        throw new Error('Incorrect input of note. Please try again.');
    }
    if (typeof state !== 'string' || regex.test(state) != true) {
        throw new Error('Incorrect input of state. Please try again.');
    }
    if (typeof city !== 'string' || regex.test(city) != true) {
        throw new Error('Incorrect input of city. Please try again.');
    }
    if (typeof country !== 'string' || regex.test(country) != true) {
        throw new Error('Incorrect input of country. Please try again.');
    }
    if(typeof age !== 'number') {
        throw new Error('Incorrect input of age. Please try again.');
    }
    if(!email.includes('@')) {
        throw new Error('Incorrect input of email. Please try again.');
    }
};

// const submitHandler = (data) => {
//     try {
//         validation(data);
//         console.log(data);
//     } catch (e) {
//         console.log(e.message);
//     }
// };

// ---------------------task 3---------------------
const filterTeachers = (teachers, country, age, gender, favorite) => {
    return teachers.filter((teacher) => {
        return (country === undefined || teacher.country === country) &&
        (age === undefined || teacher.age === age) &&
        (gender === undefined || teacher.gender === gender) &&
        (favorite === undefined || teacher.favorite === favorite)
    })
};

// console.log(filterTeachers(mergedTeachers, 'Germany', 35, 'Female'));

// ---------------------task 4---------------------
const sortTeachers = (teachers, ascending = true, sortBy = 'full_name') => {
    return teachers.sort((a, b) => {
        if (sortBy === 'age') {
            if (ascending) {
                return a.age - b.age;
            } else {
                return b.age - a.age;
            }
        } else if (sortBy === 'full_name') {
            if (ascending) {
                return a.full_name.localeCompare(b.full_name);
            } else {
                return b.full_name.localeCompare(a.full_name);
            }
        } else if (sortBy === 'b_day') {
            if (ascending) {
                return new Date(a.b_date) - new Date(b.b_date);
            } else {
                return new Date(b.b_date) - new Date(a.b_date);
            }
        } else if (sortBy === 'country') {
            if (ascending) {
                return a.country.localeCompare(b.country);
            } else {
                return b.country.localeCompare(a.country);
            }
        }
    });
};

// console.log(sortTeachers(mergedTeachers, true, 'age'));

// ---------------------task 5---------------------
const findTeacher = (teachers, searchParam) => {
    return teachers.find((teacher) => {
      return (
        teacher.full_name === searchParam ||
        teacher.note === searchParam ||
        teacher.age === searchParam
      );
    });
  };
  
// console.log(findTeacher(mergedTeachers, 'Lucy Walker'));

// ---------------------task 6---------------------
const calculatePercentage = (teachers, searchParam) => {
    const matchingObjects = teachers.filter((teacher) => {
      return (
        teacher.name === searchParam ||
        teacher.note === searchParam ||
        teacher.age === searchParam
      );
    });
  
    const totalObjects = teachers.length;
    const matchingCount = matchingObjects.length;
  
    const percentage = (matchingCount / totalObjects) * 100;
    return percentage.toFixed(1);
  };

let searchParameter = 40;
console.log("The percentage of teachers that match your search parameter (", searchParameter, ") is ", calculatePercentage(mergedTeachers, searchParameter), "%");