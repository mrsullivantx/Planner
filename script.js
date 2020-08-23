let pRow = $("#row");
let pCurrentDay = $("#currentDay")
let pContainer = $("#entireContainer");
let pInfoContainer = $("infoContainer");
let pHour = $("#hour");
let pMiddle = $("#mid");
let pSaveBtn = $("#saveBtn");
const date = moment();
const time = moment().format('LLLL');


function start() {
    getLocalStorage();
    //fillTemplates();
    dateAndTime();
}

function dateAndTime() {
    $(pCurrentDay).text(date.format("LLLL"));
    console.log(dateAndTime);
}


function getLocalStorage(key, value) {

    if (localStorage.getItem(key)) {
        return localStorage.getItem(key);
    } else {
        localStorage.setItem(key, value || "");
        return localStorage.getItem(key);
    }
}

function fillTemplates() {
    let m = moment();
    m.hour(0);
    for (let i = 0; i < 24; i++) {
        var newRow = pContainer.clone();
        var newHour = "newHour" + i;
        newRow.removeAttr("id");
        newRow.attr("id", newHour);
        newRow.find("input").attr("value", getLocalStorage(newHour));
        var hourEl = newRow.find(".hour");
        hourEl.text(dateAndTime(i));
        pContainer.append(newRow);
    }
    pInfoContainer.remove();
}

function updateTheHour() {
    var infoBlocks = $("#infoContainer");
    m = moment();

    for (let i = 0; i < 24; i++) {
        infoBlocks.get(i).classList.remove("past");
        infoBlocks.get(i).classList.remove("present");
        infoBlocks.get(i).classList.remove("future");

        if (i < m.hour()) {

            infoBlocks.get(i).classList.add("past");
        } else if (i === m.hour()) {

            infoBlocks.get(i).classList.add("present");
        } else {

            infoBlocks.get(i).classList.add("future");
        }
    }
    hideOrShowPastTasks();
}

function saveTimeBlockToLocalStorage() {
    var thisTimeBlock = $(this).parents("#infoContainer")[0];
    var thisTimeBlockID = $(thisTimeBlock).attr("id");
    var input = $(thisTimeBlock).find("input").val();
    localStorage.setItem(thisTimeBlockID, input);
}

$(document).on("click", ".saveBtn i", saveTimeBlockToLocalStorage);

start();