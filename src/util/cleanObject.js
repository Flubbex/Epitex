function cleanObject(o) {
    // Check if it's an array or an object and clean recursively
    if (Array.isArray(o)) {
        return o
            .map(cleanObject) // Recursively clean elements
            .filter(item => item !== undefined); // Remove undefined entries (empty ones)
    } else if (typeof o === 'object' && o !== null) {
        const cleanedObj = {};
        for (const key in o) {
            const value = cleanObject(o[key]); // Recursively clean the value
            if (value !== undefined && !(Array.isArray(value) && value.length === 0) && 
                !(typeof value === 'object' && Object.keys(value).length === 0)) {
                cleanedObj[key] = value; // Only add non-empty values
            }
        }
        return Object.keys(cleanedObj).length === 0 ? undefined : cleanedObj; // Remove empty objects
    } else {
        return o !== null ? o : undefined; // Remove null values
    }
}

export default cleanObject