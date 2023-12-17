import mongoose from "mongoose";

export function isIsoDateString(value) {
    // Regex to check ISO date format: YYYY-MM-DD
    const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
    return isoDatePattern.test(value);
}

export function isObjectId(value) {
    return mongoose.isValidObjectId(value);
}

export function createMongooseQuery(filters) {
    let query = {};
    filters.forEach(filter => {
        let value = filter.value;

        // Check if the value is an ISO date string and convert to Date if needed
        if (isIsoDateString(value)) {
            value = new Date(value);
        }

        // Check if the value is an ObjectId and convert to ObjectId if needed
        if (isObjectId(value)) {
            value = new mongoose.Types.ObjectId(value);
        }

        // Handling based on the operator
        switch (filter.operator) {
            case '=': // Equal
                query[filter.name] = value;
                break;
            case '!': // Not equal
                query[filter.name] = { $ne: value };
                break;
            case '>': // Greater than
                query[filter.name] = { $gt: value };
                break;
            case '<': // Less than
                query[filter.name] = { $lt: value };
                break;
            case '>=': // Greater than or equal
                query[filter.name] = { $gte: value };
                break;
            case '<=': // Less than or equal
                query[filter.name] = { $lte: value };
                break;
            // Add other cases as needed for different operators
        }
    });
    return query;
}

export function createMongooseSortObject(sortDefinitions) {
    let sortObject = {};
    sortDefinitions.forEach(sortDef => {
        sortObject[sortDef.sort_by] = sortDef.order === 'desc' ? -1 : 1;
    });
    return sortObject;
}
