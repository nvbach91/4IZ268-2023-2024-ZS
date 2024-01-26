
window.addEventListener('load', async function () {
    try {
        const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
        const data = await response.json();
        console.log(data.text);
    } catch (error) {
        console.error('Error fetching random fact:', error);
    }
});

