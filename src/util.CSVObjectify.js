import { v4 as uuidv4 } from "uuid";

/* Converts an array of arrays into a normalized object structure
 * assumes all rows are of equal length and that the first row
 * contains headers
 */
const CSVObjectify = (CSVRows) => {
    const mutableRows = [...CSVRows];
    let err, result;
    try {
        const headers = mutableRows.shift();
        result = { order: [], data: {} };

        mutableRows.forEach((r) => {
            const id = uuidv4();
            result.order.push(id);
            const rowObj = {};
            r.forEach((v, i) => {
                rowObj[headers[i]] = v;
            });
            result.data[id] = rowObj;
        });
    } catch (error) {
        /* MPR, 2022/7/10: Opting not to clear the result as it may be
         * useful in debugging */
        err = error;
    }

    return [err, result];
};

export default CSVObjectify;
