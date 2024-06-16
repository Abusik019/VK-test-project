export const ratingConvertor = (ratingValue) => {
    const ratingRange = {
        ratingFrom: 1,
        ratingTo: 10
    }

    switch (ratingValue){
        case 1:
            ratingRange.ratingFrom = 1;
            ratingRange.ratingTo = 2.8;
            break
        case 2:
            ratingRange.ratingFrom = 2.8;
            ratingRange.ratingTo = 4.6;
            break
        case 3:
            ratingRange.ratingFrom = 4.6;
            ratingRange.ratingTo = 6.4;
            break
        case 4:
            ratingRange.ratingFrom = 6.4;
            ratingRange.ratingTo = 8.2;
            break
        case 5:
            ratingRange.ratingFrom = 8.2;
            ratingRange.ratingTo = 10;
            break
        default:
            console.log(ratingRange);    
    }

    return ratingRange;
}