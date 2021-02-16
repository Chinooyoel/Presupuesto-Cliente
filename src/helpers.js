
//le damos formato a la fecha dd-mm-yyyy
export const darFormatoFecha = fecha => {
    const date = new Date(fecha);

    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}`
}