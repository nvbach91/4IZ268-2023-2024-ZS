const swup = new Swup({
    plugins: [new SwupHeadPlugin({
        persistAssets: true
    })]
  });


function handleCredentialResponse(response) {
    localStorage.setItem(storageKeys.googleToken, response.credential);
    $('.body_main').css('display', 'block');
    $('.btn_wrap').css('display', 'none');
    showUser();
};

const showUser = () => {
    const googleName = $('#google_name');
    const googleEmail = $('#google_email');
    const googleImgContainer= $('#google_img_container');
    googleName.text(getGoogleInfo().name);
    googleEmail.text(getGoogleInfo().email);
    if (googleImgContainer.children().length === 0 ) {
        googleImgContainer.append(`<img src="${getGoogleInfo().picUrl}" alt="profile_picture" class="google_img">`);
   }
};

const getGoogleInfo = () => {
    const responsePayload = decodeJwtResponse(localStorage.getItem(storageKeys.googleToken));
    const google_info = {
        name: responsePayload.name,
        email: responsePayload.email,
        picUrl: responsePayload.picture
    }

    return google_info;
};


const decodeJwtResponse = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

const todaysDate = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [day, month, year].join('.');
};

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(',');
    const csvRows = data.map(row => Object.values(row).join(','));

    return [header, ...csvRows].join('\n');
};

const downloadCSV = (data, filename) => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv' });

    const link = $('<a></a>');
    link.attr('href', window.URL.createObjectURL(blob));
    link.attr('download', filename);

    // Append the link to the body and trigger the download
    $('body').append(link);
    link[0].click();
    link.remove();
};

const addSelectedExercises = (selectedElement) => {
    let selectedExercises;
    if (localStorage.getItem(storageKeys.workoutExercises) !== null) {
        selectedExercises = JSON.parse(localStorage.getItem(storageKeys.workoutExercises));
        $.each(selectedExercises, (_, exercise) => {
            $(selectedElement).append($(`
                <div class="exercise_container delete_active" id="${encodeURIComponent(exercise.name)}">
			        <div class="exercise_info">
                        <div class="exercise_name">${capitalizeFirstLetter(exercise.name)}</div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Sets</th>
                                    <td contenteditable="true" class="sets">${exercise.sets}</td>
                                </tr>
                                <tr>
                                    <th>Reps</th>
                                    <td contenteditable="true" class="reps">${exercise.reps}</td>
                                </tr>
                            </tbody>
                        </table>
			        </div>
			        <img src="${exercise.gifUrl}" alt="exercise_img">
                    <button class="remove_btn"><span>Remove</span></button>
		        </div>
            `));
        });
    }
};

const setRemoveEffect = (removeButtons) => {
    $.each(removeButtons, (_, button) => {
        $(button).on('click', (e) => {
            const selectedExercises = JSON.parse(localStorage.getItem(storageKeys.workoutExercises));
            const updatedExercises = selectedExercises.filter((exercise) => {
                const exerciseContainer = $(e.target).closest('.exercise_container');
                return encodeURIComponent(exercise.name) !== exerciseContainer.attr('id');
            });
            localStorage.setItem(storageKeys.workoutExercises, JSON.stringify(updatedExercises));
            $(button).parent('div').remove();
        });
    });
};

const setChangeEffect = (valueElements) => {
    $.each(valueElements, (_, element) => {
        $(element).on('input', (e) => {
            const selectedExercises = JSON.parse(localStorage.getItem(storageKeys.workoutExercises));
            const updatedExercises = selectedExercises.map((exercise) => {
                const exerciseContainer = $(e.target).closest('.exercise_container');
                if (encodeURIComponent(exercise.name) === exerciseContainer.attr('id')) {
                    if ($(e.target).text() !== "") {
                        exercise[$(e.target).attr('class')] = parseInt($(e.target).text());
                    }
                }
                return exercise;
            });
            localStorage.setItem(storageKeys.workoutExercises, JSON.stringify(updatedExercises));
        });

        $(element).on('keydown', (e) => {
            const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
            const stringLength = $(e.target).text().length;
            if (!allowedKeys.includes(e.key) || (stringLength >= 3 && e.key !== 'Backspace')) {
                e.preventDefault();
            }
        });
    });
};

// Function to clear existing options in a select element
const clearSelectOptions = (selectedElement) => {
    $(selectedElement).empty();
};

// Function to add an option to a select element
const addOptionToSelect = (selectedElement, item, index) => {
    $(selectedElement).append($('<option>', {
        value: index,
        text: item
    }));
};

const addExercise = (selectedElement, item) => {
    $(selectedElement).append($(`
		<a href="../" class="no_decoration">
		<div class="exercise_container add_active">
			<div class="exercise_info">
				<div class="exercise_name">${capitalizeFirstLetter(item.name)}</div>
				<div class="exercise_body_part">
					<span class="bold">Body part:</span>&nbsp;${capitalizeFirstLetter(item.bodyPart)}
				</div>
				<div class="exercise_equipment">
				<span class="bold">Equipment:</span>&nbsp;${capitalizeFirstLetter(item.equipment)}
				</div>
			</div>
			<img src="${item.gifUrl}" alt="exercise_img" loading="lazy">
		</div>
		</a>
		`
    ));
};

// Function to add effect to exercises, user can add them to their workout
const setAddEffect = (exercises) => {
    $.each(exercises, (_, exercise_data) => {
        $(exercise_data).on('click', () => {
            const exercise = {
                name: $(exercise_data).find('.exercise_name').text(),
                sets: 0,
                reps: 0,
                gifUrl: $(exercise_data).find('img').attr('src')
            }
            let existingExercises;
            if (localStorage.getItem(storageKeys.workoutExercises) === null) {
                existingExercises = [];
            } else {
                existingExercises = JSON.parse(localStorage.getItem(storageKeys.workoutExercises));
            }
            existingExercises.push(exercise);
            localStorage.setItem(storageKeys.workoutExercises, JSON.stringify(existingExercises));
        });
    });
};

// Function to fill options in the select element using data from the API
const fillSelectOptions = (selectedElement, apiSettings) => {
    const storageKey = apiSettings.url; // Use the entire URL as the storage key
    const cachedData = localStorage.getItem(storageKey);

    if (cachedData) {
        const data = JSON.parse(cachedData);
        if (Array.isArray(data)) {
            clearSelectOptions(selectedElement);
            addOptionToSelect(selectedElement, "--All--", 0);
            $.each(data, (index, item) => {
                addOptionToSelect(selectedElement, item, index + 1);
            });
        } else {
            console.error('Invalid cached data format or empty data.');
        }
    } else {
        $.getJSON(apiSettings)
            .done((data) => {
                if (Array.isArray(data)) {
                    clearSelectOptions(selectedElement);
                    addOptionToSelect(selectedElement, "--All--", 0);
                    $.each(data, (index, item) => {
                        addOptionToSelect(selectedElement, item, index + 1);
                    });
                    localStorage.setItem(storageKey, JSON.stringify(data));
                } else {
                    console.error('Invalid data format or empty data from the API.');
                }
            })
            .fail((textStatus, errorThrown) => {
                console.error('Error fetching data:', textStatus, errorThrown);
            });
    }
}

const showExercises = (selectedElement, apiSettings, selectedBodyPart, selectedEquipment, searchQuery) => {
    const storageKey = apiSettings.url; // Use the entire URL as the storage key
    const cachedData = localStorage.getItem(storageKey);
    const updateDay = localStorage.getItem(storageKeys.updateDay);

    if (cachedData && updateDay === todaysDate()) {
        // Use cached data if available
        const data = JSON.parse(cachedData);
        if (Array.isArray(data)) {
            if (data.length > 0) {
                const filteredExercises = data.filter(exercise => {
                    return (
                        (selectedBodyPart === "--All--" || exercise.bodyPart === selectedBodyPart) &&
                        (selectedEquipment === "--All--" || exercise.equipment === selectedEquipment) &&
                        (searchQuery === '' || exercise.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    );
                });

                if (filteredExercises.length > 0) {
                    $.each(filteredExercises, (_, item) => {
                        addExercise(selectedElement, item);
                    }); 
                } else {
                    selectedElement.append('<p class="info_message">No exercises.</p>');
                }
            } else {
                loadMoreBtn.hide();
            }
        } else {
            console.error('Invalid cached data format or empty data.');
        }
    } else {
        // Fetch data from API and store it in local storage
        $.getJSON(apiSettings)
            .done((data) => {
                if (Array.isArray(data)) {
                    if (data.length > 0) {
                        const filteredExercises = data.filter(exercise => {
                            return (
                                (selectedBodyPart === "--All--" || exercise.bodyPart === selectedBodyPart) &&
                                (selectedEquipment === "--All--" || exercise.equipment === selectedEquipment) &&
                                (searchQuery === '' || exercise.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            );
                        });

                        if (filteredExercises.length > 0) {
                            $.each(filteredExercises, (_, item) => {
                                addExercise(selectedElement, item);
                            });
                        } else {
                            selectedElement.append('<p class="info_message">No exercises.</p>');
                        }

                        localStorage.setItem(storageKey, JSON.stringify(data));
                        localStorage.setItem(storageKeys.updateDay, todaysDate());
                    } else {
                        loadMoreBtn.hide();
                    }
                } else {
                    console.error('Invalid data format or empty data from the API.');
                }
            })
            .fail((textStatus, errorThrown) => {
                console.error('Error fetching data:', textStatus, errorThrown);
            });
    }
};

const getBodyPartListSettings = () => {
    const bodyPartSettings = { ...settings };
    bodyPartSettings.url += "/bodyPartList";
    return bodyPartSettings;
};

const getEquipmentListSettings = () => {
    const equipmentSettings = { ...settings };
    equipmentSettings.url += "/equipmentList";
    return equipmentSettings;
}

const getExercisesSettings = () => {
    const exercisesSettings = { ...settings };
    exercisesSettings.url += `?limit=${NUMBER_OF_EXERCISES}`;
    return exercisesSettings;
};

const loadMoreExercises = (startIndex, batchSize) => {
    const exercises = $('.add_active');
    const endIndex = Math.min(startIndex + batchSize, exercises.length);
    exercises.slice(startIndex, endIndex).show();
};

const init = () => {
    $('#preloader').css('display', 'none');

    let currentIndex = batchSize;

    const workoutNameInput = $('#workout_name');
    if (localStorage.getItem(storageKeys.workoutName) === null) {
        localStorage.setItem(storageKeys.workoutName, workoutNameInput.text());
    } else {
        workoutNameInput.text(localStorage.getItem(storageKeys.workoutName));
    }


    const addedExercisesWrapper = $('#added_exercises_wrapper');
    addSelectedExercises(addedExercisesWrapper);

    const removeButtons = $('.remove_btn');
    setRemoveEffect(removeButtons);

    const setsValues = $('.sets');
    const repsValues = $('.reps');

    setChangeEffect(setsValues);
    setChangeEffect(repsValues);

    const exportBtn = $('#export_btn');
    const exportPng = $('#export_png');

    const searchBar = $('#searchBar');
    const exercisesWrapper = $('#exercises_wrapper');
    showExercises(exercisesWrapper, getExercisesSettings(), '--All--', '--All--', '');


    const bodyPartForm = $('#body_part_form');
    const equipmentForm = $('#equipment_form');
    fillSelectOptions(bodyPartForm, getBodyPartListSettings());
    fillSelectOptions(equipmentForm, getEquipmentListSettings());


    workoutNameInput.on('input', () => {
        workoutName = workoutNameInput.text();
        localStorage.setItem(storageKeys.workoutName, workoutName);
    });

    // Event listener for the body part form
    searchBar.on('input', () => {
        const selectedBodyPart = bodyPartForm.find(':selected').text();
        const selectedEquipment = equipmentForm.find(':selected').text()
        const searchQuery = searchBar.val();
        exercisesWrapper.empty();
        showExercises(exercisesWrapper, getExercisesSettings(), selectedBodyPart, selectedEquipment, searchQuery);
        const exercises = $('.add_active');
        setAddEffect(exercises);
        exercises.slice(batchSize).hide();
        currentIndex = batchSize;
    });

    searchBar.on('keypress', (e) => {
        if (e.key === "Enter") {
            // Hide the keyboard
            e.target.blur();
        }
    });

    bodyPartForm.on('change', (e) => {
        const selectedBodyPart = $(e.target).find(':selected').text();
        const selectedEquipment = equipmentForm.find(':selected').text(); // Get selected equipment from the other form
        const searchQuery = searchBar.val();
        exercisesWrapper.empty();
        showExercises(exercisesWrapper, getExercisesSettings(), selectedBodyPart, selectedEquipment, searchQuery);
        const exercises = $('.add_active');
        setAddEffect(exercises);
        exercises.slice(batchSize).hide();
        currentIndex = batchSize;
    });

    // Event listener for the equipment form
    equipmentForm.on('change', (e) => {
        const selectedEquipment = $(e.target).find(':selected').text();
        const selectedBodyPart = bodyPartForm.find(':selected').text(); // Get selected body part from the other form
        const searchQuery = searchBar.val();
        exercisesWrapper.empty();
        showExercises(exercisesWrapper, getExercisesSettings(), selectedBodyPart, selectedEquipment, searchQuery);
        const exercises = $('.add_active');
        setAddEffect(exercises);
        exercises.slice(batchSize).hide();
        currentIndex = batchSize;
    });

    exportBtn.on('click', () => {
        const workoutName = $('#workout_name').text();
        const filename = `${workoutName}.csv`;
        const data = JSON.parse(localStorage.getItem(storageKeys.workoutExercises));
        if (data !== null && data.length > 0) {
            downloadCSV(data, filename);
        }
    });

    exportPng.on('click', () => {
    html2canvas(addedExercisesWrapper[0]).then(canvas => {
        Canvas2Image.saveAsPNG(canvas);
    }).catch(error => {
        console.error('Error in html2canvas:', error);
    });
});

    const loadMoreBtn = $('#load_more_btn');

    const exercises = $('.add_active');

    // Initially hide all exercises beyond the first batch
    exercises.slice(batchSize).hide();

    // Add click event listener to the "Show More" button
    loadMoreBtn.on('click', () => {
        loadMoreExercises(currentIndex, batchSize);
        currentIndex += batchSize;
    });

    setAddEffect(exercises);
    if (localStorage.getItem(storageKeys.googleToken)){
        $('.body_main').css('display', 'block');
        $('.btn_wrap').css('display', 'none');
        showUser();
    }
};

$(() => {
    init();
});

swup.hooks.on('page:view', () => init());