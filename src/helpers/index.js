export const OrdenarArregloObj = (array, atributo) => {
    array.sort((a, b) => {
        if (a[atributo] < b[atributo]) {
            return -1;
        }
        if (a[atributo] > b[atributo]) {
            return 1;
        }
        return 0;
    });
    return array;
};