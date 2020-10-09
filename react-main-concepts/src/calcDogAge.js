export default function calcDogAge(years) {
    return Number.isInteger(years) ? (years + 4)* 4 : null;
}