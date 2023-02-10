const Event = window.location.href.split("/").pop();
const endpoint = `http://localhost:8080/event/registeredEvent/${Event}`;

console.log(Event);

const buildForm = (textual, checkbox, radio) => {

    const form = document.querySelector(".event-form");

    for (let i = 0; i < textual.length; i++) {
        form.innerHTML += `
            <label class="textual" >${textual[i]}</label>
            <input type="text" name="name${i}" class="name-field" placeholder="Enter your Answerer">
        `;
    }

    for (let i = 0; i < checkbox.length; i++) {
        form.innerHTML += `
            <label class="checkboxQues" >${checkbox[i].question}:</label>
        `;

        const ul = document.createElement("ul");
        ul.classList.add("choices");
        for (let j = 0; j < checkbox[i].options.length; j++) {
            ul.innerHTML += `
                <li>
                    <input type="checkbox" name="checkbox${i}" class="checkbox" value="${checkbox[i].options[j]}" > <span>${checkbox[i].options[j]}</span>
                </li>
            `;
        }
        form.appendChild(ul);
    }

    for (let i = 0; i < radio.length; i++) {
        form.innerHTML += `
            <label class="radioQues" >${radio[i].question}:</label>
        `;

        const ul = document.createElement("ul");
        ul.classList.add("choices");
        for (let j = 0; j < radio[i].options.length; j++) {
            ul.innerHTML += `
                <li>
                    <input type="radio" name="radio${i}" class="radio-button" value="${radio[i].options[j]}" > <span>${radio[i].options[j]}</span>
                </li>
            `;
        }
        form.appendChild(ul);
    }

    form.innerHTML += ` 
        <div class="submit-button">
        <input type="submit" value="Submit">
        </div>
    `;
};

const getEvent = async () => {
    await fetch(endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
        .then(data => data.json())
        .then((log) => {
            console.log(log);
            const textual = log[0]['text']
            const checkbox = log[0]['checkbox']
            const radio = log[0]['radio']
            // console.log(textual);
            // console.log(checkbox);
            // console.log(radio);
            buildForm(textual, checkbox, radio);
        })
        .catch((err) => console.log(err));

    getFormData();
};

getEvent();