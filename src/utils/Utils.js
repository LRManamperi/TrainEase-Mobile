export const PRIMARY_COLOR='#1c2938'
export function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Month is zero-indexed
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Pad single digits with leading zero if needed
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
  
    // Return formatted date string
    return `${formattedMonth}/${formattedDay}/${year}`;
  }