/**
 * fromat the passed db errors in array or string for easy rendering
 * @param error errors occured during database query
 * @returns formated errors in array of string or string only
 */
const dbErrorHandler = (error: any): Array<string> | string => {
    if(error.code){
        return "Record already exist.";
    }
    let errors: Array<string> = []; 
    const keys = Object.keys(error.errors);
    keys.forEach(key => {
        errors.push(error.errors[key].properties.message);
    })
    return errors;
}

export default dbErrorHandler;