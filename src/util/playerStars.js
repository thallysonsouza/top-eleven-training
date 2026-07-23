export function getPlayerStars(overall){

    if(overall < 20) return 1;

    if(overall < 40) return 2;

    if(overall < 60) return 3;

    if(overall < 80) return 4;

    if(overall < 100) return 5;

    if(overall < 120) return 6;

    if(overall < 140) return 7;

    if(overall < 160) return 8;

    return 9;

}

export function getStarsText(overall){

    return "⭐".repeat(

        getPlayerStars(overall)

    );

}

export function getStarsArray(overall){

    const stars = getPlayerStars(overall);

    return Array.from({ length: 9 }, (_, index) => index < stars);

}