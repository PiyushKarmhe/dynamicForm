const endpoint = `http://localhost:8080/event/allEvents`;
const endpointResponse = "http://localhost:8080/event/getParticipants/";
var EventsData;

const buildRow = (data)=>{
    const table = document.querySelector("table");
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><input type="submit" value="Save"></td>`;

    for(let i=0; i<data.text.length; i++){
        tr.innerHTML += `
        <td><input type="text" value="${data.text[i].ans}"></td>
        `;
    }

    for(let i=0; i<data.checkbox.length; i++){
        tr.innerHTML += `
        <td><input type="text" value="${data.checkbox[i].options}"></td>
        `;
    }

    for(let i=0; i<data.radio.length; i++){
        tr.innerHTML += `
        <td><input type="text" value="${data.radio[i].ans}"></td>
        `;
    }

    table.appendChild(tr);

}

const buildTable = (data)=>{
    for(let i=0; i<data.length; i++){
        buildRow(data[i]);
    }
}

const getTable = async (eventName)=>{
    const finalEndpoint = endpointResponse + eventName;
    console.log(finalEndpoint);

    await fetch(finalEndpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
        .then(data => data.json())
        .then((log) => {
            console.log(log);
            ParticipantsData = log;
            buildTable(log);
        })
        .catch((err) => console.log(err));
};

const getEventData = (e)=>{
    const toggleEventStatus = async ()=>{
        updateEndpoint = "http://localhost:8080/event/toggleEventStatus"; 
        const statusBtn = document.querySelector(".status-btn");
        var statusdata = 
        {
            name:statusBtn.classList[2],
            active:true
        };
        if (statusBtn.classList[1] == "off"){
            statusBtn.classList.remove("off");
            statusBtn.classList.add("on");
            statusBtn.innerHTML = "ON";
            statusdata.active = false;
        }else{
            statusBtn.classList.remove("on");
            statusBtn.classList.add("off");
            statusBtn.innerHTML = "OFF";
            statusdata.active = true;
        }
        console.log("Event Status",statusdata);
        await fetch(updateEndpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(statusdata)
        })
            .then(data => data.json())
            .then((log) => {
                console.log(log);
            })
            .catch((err) => console.log(err,data));
    };
    console.log(e.target.name);
    console.log(EventsData.find(ele=>ele.name==e.target.name));
    const event = EventsData.find(ele=>ele.name==e.target.name);
    const table = document.querySelector("table");
    table.innerHTML = `
        <tr class="table-heading">
        </tr>
    `;

    const Table_heading = document.querySelector(".table-heading");
    if (event.active){
        Table_heading.innerHTML = `<th class="status-btn off ${e.target.name}" >OFF</th>`;
    }else{
        Table_heading.innerHTML = `<th class="status-btn on ${e.target.name}" >ON</th>`;
    }

    const statusBtn = document.querySelector(".status-btn");
    statusBtn.addEventListener("click",toggleEventStatus);

    for(let i=0; i<event.text.length; i++){
        const th = document.createElement("th");
        th.innerHTML = event.text[i];
        Table_heading.appendChild(th);
    }

    for(let i=0; i<event.checkbox.length; i++){
        const th = document.createElement("th");
        th.innerHTML = event.checkbox[i].question;
        Table_heading.appendChild(th);
    }

    for(let i=0; i<event.radio.length; i++){
        const th = document.createElement("th");
        th.innerHTML = event.radio[i].question;
        Table_heading.appendChild(th);
    }

    getTable(e.target.name);
};

const buildEvents =(data)=>{
    const eventPanel = document.querySelector(".events-area");
    console.log(eventPanel);

    for(let i=0; i<data.length; i++){
        console.log(data[i].name);
        const button = document.createElement("button");
        button.classList.add("event-card");
        button.name = data[i].name;
        const h1 = document.createElement("h1");
        h1.innerHTML = data[i].name;
        h1.name = data[i].name;
        button.appendChild(h1);
        button.addEventListener('click',getEventData);
        eventPanel.appendChild(button);
    }
};

const getallEvents = async () => {
    await fetch(endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    })
        .then(data => data.json())
        .then((log) => {
            console.log(log);
            EventsData = log;
            buildEvents(log);
        })
        .catch((err) => console.log(err));
};

getallEvents();