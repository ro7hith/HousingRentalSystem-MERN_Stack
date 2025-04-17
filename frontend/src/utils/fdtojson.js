// The api accepts json only. This function is used to 
// convert form data to json so it can be sent to the api

export default function fdtojson (form) {
    let form_ = new FormData(form);
    let data = [...form_];
    let formData = {};
    data.forEach(val => {
        formData[val[0]] = val[1];
    });
    return formData;

}