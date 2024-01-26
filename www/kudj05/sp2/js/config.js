const URL = "https://exercisedb.p.rapidapi.com/exercises"
const API_KEY = "4246e281eemshdae204e6f51785ep18760ejsn43e683dd105c";
const API_HOST = "exercisedb.p.rapidapi.com";
const NUMBER_OF_EXERCISES = 1300;
const batchSize = 10;
const storageKeys = {
    workoutName: "workout_name",
    workoutExercises: "workout_exercises",
    updateDay: "update_day",
    googleToken: 'google_token'
};

const settings = {
    async: true,
    crossDomain: true,
    url: URL,
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
    }
};