function getTimeDiffInMins(time1, time2) {
    // Function to parse time strings into Date objects
    function parseTime(timeStr) {
        let [hours, minutes] = timeStr.split(':').map(Number);
        return new Date(1970, 0, 1, hours, minutes);
    }

    let date1 = parseTime(time1);
    let date2 = parseTime(time2);

    // Calculate the difference in milliseconds
    let diffInMs = Math.abs(date2 - date1);

    // Convert milliseconds to minutes
    let diffInMinutes = Math.floor(diffInMs / 1000 / 60);

    // Convert the difference into hours and minutes
    return `${Math.floor(diffInMinutes / 60)} h ${diffInMinutes % 60} mins`;
}

export default getTimeDiffInMins;
