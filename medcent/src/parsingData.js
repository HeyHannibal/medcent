export function latestVersion(array) {
    let latest = array[0];
    array.forEach(element => {
        if(element.effective_time > latest.effective_time) latest = element 
    });
    return latest
}