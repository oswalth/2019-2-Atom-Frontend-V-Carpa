export default function findMe(callbackSucces, callbackError = null) {
    if ('geolocation' in navigator){
        const getOptions = {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        };

        navigator.geolocation.getCurrentPosition(
            callbackSucces,
            callbackError,
            getOptions
        );
    } else if  (callbackError) { callbackError('Permission denied');}
}