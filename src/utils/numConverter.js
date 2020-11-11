export const convertNumbers = number => {
    let newNum;
    if(number < 1000) {
        return number;
    } 
    else if (number < 10000) {
        newNum = number.toString().substr(0, 1) + "," + number.toString().substring(1);
        return newNum;
    }
    else if (10000 <= number && number < 1000000) {
        newNum = Math.round(number / 1000) + "K";
        return newNum;
    }
    else if (number >= 1000000 && number < 10000000) {
        newNum = (number / 1000000).toString().substr(0, 3) + "M";
        return newNum;
    }
    else if (number >= 10000000 && number < 100000000) {
        newNum = Math.floor(number / 1000000) + "M";
        return newNum;
    }
    else if (number >= 100000000) {
        newNum = Math.floor(number / 100000000) + "B";
        return newNum;
    }
};

export const formatNumbers = number => {
    let newNum;
    if (number < 1000) {
        return number;
    }
    else if (1000 <= number && number < 10000) {
        newNum = number.toString().substr(0, 1) + "," + number.toString().substring(1);
        return newNum;
    } 
    else if (10000 <= number && number < 100000) {
        newNum = number.toString().substr(0, 2) + "," + number.toString().substring(2);
        return newNum;
    }
    else if (100000 <= number && number < 1000000) {
        newNum = number.toString().substr(0, 3) + "," + number.toString().substring(3);
        return newNum;
    }
    else if (1000000 <= number && number < 10000000) {
        newNum = number.toString().substr(0, 1) + "," + number.toString().substr(1, 3) + "," + number.toString().substring(4);
        return newNum;
    }
    else if (10000000 <= number && number < 100000000) {
        newNum = number.toString().substr(0, 2) + "," + number.toString().substr(2, 3) + "," + number.toString().substring(5);
        return newNum;
    }
    else if (100000000 <= number && number < 1000000000) {
        newNum = number.toString().substr(0, 3) + "," + number.toString().substr(3, 3) + "," + number.toString().substring(6);
        return newNum;
    }
    else if (1000000000 <= number && number < 10000000000) {
        newNum = number.toString().substr(0, 1) + "," + number.toString().substr(1, 3) + "," + number.toString().substr(4, 3) + "," + number.toString().substring(7);
        return newNum;
    }
}