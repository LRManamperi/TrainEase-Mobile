function getTimeDiffInMins(time1, time2) {
    // Function to parse time strings into Date objects
    function parseTime(timeStr) {
        if (typeof timeStr !== 'string') {
            console.error("Invalid time string:", timeStr);
            return null;
        }

        // Convert time to 24-hour format if needed
        let [time, period] = timeStr.split(' ');
        if (period) {
            period = period.toLowerCase();
            if (period !== 'am' && period !== 'pm') {
                console.error("Invalid period:", period);
                return null;
            }

            let [hours, minutes] = time.split(':').map(Number);
            if (period === 'pm' && hours !== 12) hours += 12;
            if (period === 'am' && hours === 12) hours = 0;
            return new Date(1970, 0, 1, hours, minutes);
        } else {
            // Handle 24-hour format
            let [hours, minutes] = timeStr.split(':').map(Number);
            return new Date(1970, 0, 1, hours, minutes);
        }
    }

    let date1 = parseTime(time1);
    let date2 = parseTime(time2);

    if (!date1 || !date2) {
        return "Invalid time format";
    }

    // Calculate the difference in milliseconds
    let diffInMs = Math.abs(date2 - date1);

    // Convert milliseconds to minutes
    let diffInMinutes = Math.floor(diffInMs / 1000 / 60);

    // Convert the difference into hours and minutes
    return `${Math.floor(diffInMinutes / 60)} h ${diffInMinutes % 60} mins`;
}

export default getTimeDiffInMins;
