const getCurrentDateTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = twoDigits(date.getMonth() + 1);
    const day = twoDigits(date.getDate());
    const hours = twoDigits(date.getHours());
    const minutes = twoDigits(date.getMinutes());
    const seconds = twoDigits(date.getSeconds());

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;

    return formattedDate;
};

const twoDigits = value => {
    return value < 10 ? `0${value}` : `${value}`;
};

module.exports = getCurrentDateTime;
