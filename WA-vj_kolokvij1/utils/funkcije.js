export function izracunajDane(start, end){
    const startDate = new Date(start);
    const endDate = new Date(end);

    return (endDate - startDate) / (1000 *60 *60 *24);
}