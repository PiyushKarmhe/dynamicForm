const Postendpoint = "http://localhost:8080/event/registerParticipant";

const postData = async (data) => {
    await fetch(Postendpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(data)
    })
        .then(data => data.json())
        .then((log) => {
            console.log(log);
        })
        .catch((err) => console.log(err));
}

const getFormData = () => {
    var data = {
        name: Event,
        text: [],
        checkbox: [],
        radio: []
    };

    const submit = document.querySelector(".submit-button")

    const logData = () => {
        const textual = document.querySelectorAll(".textual");
        const textualValue = document.querySelectorAll(".name-field");

        for (let i = 0; i < textual.length; i++) {
            data.text.push({
                question: textual[i].innerHTML,
                ans: textualValue[i].value
            });
        }

        const checkbox = document.querySelectorAll(".checkboxQues");

        for (let i = 0; i < checkbox.length; i++) {
            const checkboxData = {
                question: checkbox[i].innerHTML,
                options: []
            }
            const checkboxOptions = document.getElementsByName(`checkbox${i}`);
            for (let j = 0; j < checkboxOptions.length; j++) {
                if (checkboxOptions[j].checked) {
                    checkboxData.options.push(checkboxOptions[j].value);
                }
            }
            data.checkbox.push(checkboxData);
        }

        const radio = document.querySelectorAll(".radioQues");

        for (let i = 0; i < radio.length; i++) {
            const radioData = {
                question: radio[i].innerHTML,
                ans: ""
            }
            const radioOptions = document.getElementsByName(`radio${i}`);
            var j = 0;
            for (; j < radioOptions.length; j++) {
                if (radioOptions[j].checked) {
                    radioData.ans = radioOptions[j].value;
                    break;
                }
            }
            data.radio.push(radioData);
        }

        console.log(data);
        postData(data);
        data = {
            name: Event,
            text: [],
            checkbox: [],
            radio: []
        };
        window.location.href = "../thankyou.html";
    };

    submit.addEventListener('click', logData);
};