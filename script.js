// Listen for when a user submits the form  
const Form = document.getElementById("myform");

Form.addEventListener("submit", handleFormSubmit);

var FD = {};
async function handleFormSubmit(event) {
    event.preventDefault();

    const data = event.currentTarget;
    const url = data.action;

debugger
    try {
        const form = new FormData(data);
        for(var pair of form.entries()){
            FD[pair[0]] = pair[1]
        }
        console.log(FD)
        const responseData = await postFormDataAsJson({ url, FD });
        console.log({ responseData });
    } catch (error) {
        console.error(error);
    }
}



async function postFormDataAsJson({ url, FD }) {
    // const plainFormData = Object.fromEntries(form.entries());
    const formDataJsonString = JSON.stringify(FD);

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

