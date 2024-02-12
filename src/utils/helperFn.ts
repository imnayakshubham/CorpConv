export const fromNow = (date: Date | string): string => {
    const inputDate = typeof date === 'string' ? new Date(date) : date;
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - inputDate.getTime();
    const seconds = Math.floor(timeDiff / 1000);

    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    if (seconds < minute) {
        return seconds + ' seconds ago';
    } else if (seconds < hour) {
        const minutes = Math.floor(seconds / minute);
        return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
    } else if (seconds < day) {
        const hours = Math.floor(seconds / hour);
        return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    } else if (seconds < month) {
        const days = Math.floor(seconds / day);
        return days + (days === 1 ? ' day ago' : ' days ago');
    } else if (seconds < year) {
        const months = Math.floor(seconds / month);
        return months + (months === 1 ? ' month ago' : ' months ago');
    } else {
        const years = Math.floor(seconds / year);
        return years + (years === 1 ? ' year ago' : ' years ago');
    }
}