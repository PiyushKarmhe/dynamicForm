var submit = document.querySelector(".submit-button");
const form = document.querySelector(".event-form");
const addtext = document.querySelector(".textbox-btn");
const addcheck = document.querySelector(".checkbox-btn");
const addradio = document.querySelector(".radio-btn");
const endpoint = "http://localhost:8080/event/registerEvent";

var textboxCount = 0;
var checkboxCount = 0;
var radioCount = 0;
var eventdata = {
    name:"",
    description:"",
    multipleResponse:false,
    poster:"",
    date:"",
    time:"",
    venue:"",
    text:[],
    checkbox:[],
    radio:[]
}

const googleDtoSource = (str) =>{
    str = str.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
    str = str.replace("/view?usp=share_link", "");
    return str;
};

const scrape = ()=>{
    console.clear();
    var title = document.querySelector(".title");
    title = title.value;
    console.log("Event Title : ",title);

    var description = document.querySelector(".description");
    description = description.value;
    console.log("Event Description : ",description);

    var poster = document.querySelector(".poster");
    poster = poster.value;
    poster = googleDtoSource(poster);
    console.log("Event Poster : ",poster);

    var date = document.querySelector(".date");
    date = date.value;
    console.log("Event Date : ",date);

    var time = document.querySelector(".time");
    time = time.value;
    console.log("Event Time : ",time);

    var venue = document.querySelector(".venue");
    venue = venue.value;
    console.log("Event Venue : ",venue);

    var text = document.querySelectorAll(".name-field");
    text = [...text].map((e)=>e.value);
    console.log("All Text : ",text);

    var checkboxes = []
    for(let i=0; i<checkboxCount; i++){
        var data = {
            "question":"",
            "options":[]
        }
        try {
            data["question"] = document.querySelector(`.checkboxQues${i}`).value;
            var options = document.querySelectorAll(`input.checkbox${i}`);
            options = [...options].map((e)=>e.value);
            data["options"] = options;
            checkboxes.push(data);
        } catch (error) {
            console.log(error);
            continue;
        }
        
    }
    console.log("All Checkboxes : ",checkboxes);

    var radio = []
    for(let i=0; i<radioCount; i++){
        var data = {
            "question":"",
            "options":[]
        }
        try {
            data["question"] = document.querySelector(`.radioQues${i}`).value;
            var options = document.querySelectorAll(`input.radio${i}`);
            options = [...options].map((e)=>e.value);
            data["options"] = options;
            radio.push(data);
        } catch (error) {
            console.log(error);
            continue;
        }
    }
    console.log("All Radio : ",radio);

    var multiRespo = document.querySelector(".switch input");
    multiRespo = multiRespo.checked;
    console.log(multiRespo);

    eventdata.name = title;
    eventdata.description = description;
    eventdata.multipleResponse = multiRespo;
    eventdata.poster = poster;
    eventdata.date = date;
    eventdata.time = time;
    eventdata.venue = venue;
    eventdata.text = text;
    eventdata.checkbox = checkboxes;
    eventdata.radio = radio;
    console.log("Event data : ",eventdata);
    postData(eventdata);
};
const addText = ()=>{
    var currentCount = textboxCount;
    const sub = ()=>{
        var textbox = document.querySelector(`.name-field${currentCount}`);
        textbox = textbox.parentElement;
        textbox.remove();
    };
    const textele = document.createElement("input");
    textele.type = "text";
    textele.classList.add("name-field")
    textele.classList.add(`name-field${textboxCount}`)
    textele.placeholder = "Enter your Question";

    const subbtn = document.createElement("div");
    subbtn.classList.add("sub-btn");
    subbtn.innerHTML = "-";
    subbtn.addEventListener("click",sub);

    const row = document.createElement("div");
    row.classList.add("row");
    row.appendChild(textele);
    row.appendChild(subbtn);

    form.appendChild(row);
    ++textboxCount;
};
const addCheck = ()=>{
    var currentCount = checkboxCount;
    const add = ()=>{
        const ul = document.querySelector(`.checkchoices${currentCount}`);
        const li = document.createElement("li");
        const checkbutton = document.createElement("input");
        checkbutton.type = "checkbox";
        checkbutton.name = `checkbox${currentCount}`;
        checkbutton.classList.add(`checkbox`);
        const checkoption = document.createElement("input");
        checkoption.type = "text";
        checkoption.placeholder = `Option`;
        checkoption.classList.add(`checkbox${currentCount}`);
        li.appendChild(checkbutton);
        li.appendChild(checkoption);
        ul.appendChild(li);
    };
    const sub = ()=>{
        const ul = document.querySelector(`.checkchoices${currentCount}`);
        try {
            ul.removeChild(ul.lastElementChild);
        } catch (error) {
            console.log(error);
        }
    };
    const subQues = ()=>{
        var ques = document.querySelector(`.checkboxQues${currentCount}`)
        ques = ques.parentElement;
        ques.remove();
        const ul = document.querySelector(`.checkchoices${currentCount}`);
        ul.remove();
        const buttons = document.querySelector(`.checkbox-btns${currentCount}`);
        buttons.remove();
    };
    const ques = document.createElement("input");
    ques.type = "text";
    ques.placeholder = "Enter your Question for Checkbox";
    ques.classList.add(`checkboxQues${checkboxCount}`)

    const subques = document.createElement("div");
    subques.classList.add("sub-btn");
    subques.innerHTML = "-";
    subques.addEventListener("click",subQues);

    const row = document.createElement("div");
    row.classList.add("row");
    row.appendChild(ques);
    row.appendChild(subques);

    form.appendChild(row);
    
    const ul = document.createElement("ul");
    ul.classList.add(`checkchoices${checkboxCount}`);
    ul.classList.add(`choices`);
    const li = document.createElement("li");
    const checkbutton = document.createElement("input");
    checkbutton.type = "checkbox";
    checkbutton.name = `checkbox${checkboxCount}`;
    checkbutton.classList.add(`checkbox`);
    const checkoption = document.createElement("input");
    checkoption.type = "text";
    checkoption.placeholder = `Option`;
    checkoption.classList.add(`checkbox${checkboxCount}`);
    li.appendChild(checkbutton);
    li.appendChild(checkoption);
    ul.appendChild(li);
    form.appendChild(ul);

    const addbtn = document.createElement("div");
    addbtn.classList.add("add-btn");
    addbtn.innerHTML = "+";
    addbtn.addEventListener("click",add);

    const subbtn = document.createElement("div");
    subbtn.classList.add("sub-btn");
    subbtn.innerHTML = "-";
    subbtn.addEventListener("click",sub);

    const buttons = document.createElement("div")
    buttons.classList.add("buttons");
    buttons.classList.add(`checkbox-btns${checkboxCount}`);
    buttons.appendChild(addbtn);
    buttons.appendChild(subbtn);

    form.appendChild(buttons);
    ++checkboxCount;
};
const addRadio = ()=>{
    var currentCount = radioCount;
    const add = ()=>{
        const ul = document.querySelector(`.radiochoices${currentCount}`);
        const li = document.createElement("li");
        const radiobutton = document.createElement("input");
        radiobutton.type = "radio";
        radiobutton.name = `radio${currentCount}`;
        radiobutton.classList.add(`radio-button`);
        const radiooption = document.createElement("input");
        radiooption.type = "text";
        radiooption.placeholder = `Option`;
        radiooption.classList.add(`radio${currentCount}`);
        li.appendChild(radiobutton);
        li.appendChild(radiooption);
        ul.appendChild(li);
    }
    const sub = ()=>{
        const ul = document.querySelector(`.radiochoices${currentCount}`);
        try {
            ul.removeChild(ul.lastElementChild);
        } catch (error) {
            console.log(error);
        }
    };
    const subQues = ()=>{
        var ques = document.querySelector(`.radioQues${currentCount}`)
        ques = ques.parentElement;
        ques.remove();
        const ul = document.querySelector(`.radiochoices${currentCount}`);
        ul.remove();
        const buttons = document.querySelector(`.radio-btns${currentCount}`);
        buttons.remove();
    };
    const ques = document.createElement("input");
    ques.type = "text";
    ques.placeholder = "Enter your Question for Radio";
    ques.classList.add(`radioQues${radioCount}`)

    const subques = document.createElement("div");
    subques.classList.add("sub-btn");
    subques.innerHTML = "-";
    subques.addEventListener("click",subQues);

    const row = document.createElement("div");
    row.classList.add("row");
    row.appendChild(ques);
    row.appendChild(subques);

    form.appendChild(row);
    
    const ul = document.createElement("ul");
    ul.classList.add(`radiochoices${radioCount}`);
    ul.classList.add(`choices`);
    const li = document.createElement("li");
    const radiobutton = document.createElement("input");
    radiobutton.type = "radio";
    radiobutton.name = `radio${radioCount}`;
    radiobutton.classList.add(`radio-button`);
    const radiooption = document.createElement("input");
    radiooption.type = "text";
    radiooption.placeholder = `Option`;
    radiooption.classList.add(`radio${radioCount}`);
    li.appendChild(radiobutton);
    li.appendChild(radiooption);
    ul.appendChild(li);
    form.appendChild(ul);

    const addbtn = document.createElement("div");
    addbtn.classList.add("add-btn");
    addbtn.innerHTML = "+";
    addbtn.addEventListener("click",add);

    const subbtn = document.createElement("div");
    subbtn.classList.add("sub-btn");
    subbtn.innerHTML = "-";
    subbtn.addEventListener("click",sub);

    const buttons = document.createElement("div")
    buttons.classList.add("buttons");
    buttons.classList.add(`radio-btns${radioCount}`);
    buttons.appendChild(addbtn);
    buttons.appendChild(subbtn);

    form.appendChild(buttons);
    ++radioCount;
};

const postData = async (data) => {
    await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(data)
    })
        .then(data => data.json())
        .then((log) => {
            console.log(log);
        })
        .catch((err) => console.log(err,data));
}

addtext.addEventListener("click",addText);
addcheck.addEventListener("click",addCheck);
addradio.addEventListener("click",addRadio);
submit.addEventListener("click",scrape);

// console.log(googleDtoSource("https://drive.google.com/file/d/1U6ZTKZqI99TWluxevwmqQUKadkZJbYG3/view?usp=share_link"))

const data = 
{
    "name": "Funevent",
    "description": "It is going to be fun",
    "multipleResponse": true,
    "poster": "https://drive.google.com/uc?export=view&id=1U6ZTKZqI99TWluxevwmqQUKadkZJbYG3",
    "date": "12/23/2023",
    "time": "12:00 pm",
    "venue": "ghar pe",
    "text": [
      "What is your name?"
    ],
    "checkbox": [
      {
        "question": "What topics do you like?",
        "options": [
          "AI/ML",
          "Cloud",
          "Web Dev",
          "App Dev"
        ]
      }
    ],
    "radio": [
      {
        "question": "What is your gender?",
        "options": [
          "Male",
          "Female",
          "Others",
          "Prefer not to say"
        ]
      }
    ]
  };
  
// const tostring = async (data) =>{
//     await console.log(data);
//     await console.log("Stringified : ",JSON.stringify(data));
// }

// tostring(data);