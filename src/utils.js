export const removeDuplicatesFromArray = (array) => {
    return Array.from(new Set(array));
}

export const transformTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    return `${month} ${day}`
}