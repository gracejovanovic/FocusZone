let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
let clockTabContent = document.querySelector(".tabContent#Clock");
let browserTabContent = document.querySelector(".tabContent#Browser");
let customUrl = document.getElementById("custom-url");
let clockTab = document.getElementById("clockTab");
let browserTab = document.getElementById("browserTab");
let tabLinks = document.getElementsByClassName("tabLinks");
let addUrlBtn = document.getElementById("addUrlBtn");

let timerInterval;
let timerActive = false;
let remainingTime = 0;
let inputTime;

function openTab(event, tabName) {
    var i, tabContent, tabLinks;

    //hide tab content
    tabContent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    //remove active class 
    tabLinks = document.getElementsByClassName("tabLinks");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace("active", "");
    }

    //show clicked tab & add active class
    if (tabName === "clockTab") {
        clockTabContent.style.display = "flex";
    } else if (tabName === "browserTab") {
        browserTabContent.style.display = "block";
    }
    event.currentTarget.className += "active";

    console.log("Active tab: " + tabName);
}
//Add active class to clockTab
function displayTabs () {
    clockTabContent.style.display = "flex";
    browserTabContent.style.display = "none";
}
// Start Timer based on clicking start button
startBtn.addEventListener("click", function () {
    inputTime = document.getElementById("study-time").value;
    if (inputTime) {
        remainingTime = inputTime * 60;
        timerActive = true;
        startTimer();
    }
});
// Add circle animation to timer
function startTimer() {
    let circle = document.querySelector("circle");
    let timeDisplay = document.getElementById("time");

    timerInterval = setInterval(function () {
        remainingTime--;
        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;
        let timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(1, "0")}`;
        timeDisplay.innerHTML = timeString;
        circle.style.strokeDasharray = `${(remainingTime / (inputTime * 60)) * 314} 314`;
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerActive = false;
            timeDisplay.innerHTML = "00:00";
            circle.classList.remove("active");
            // let popup = window.open("", "Popup", "width=400,height=200")
            if (confirm("Congratulations, your Study Timer is finished! Click OK to add 15 more minutes")) {
                remainingTime += 900;
                startTimer();
            } else {
                remainingTime += 0;
                timeDisplay.innerHTML = "00:00";
            }
        }
    }, 1000);
}
// stop timer if the stop button is clicked
stopBtn.addEventListener("click", function () {
    clearInterval(timerInterval);
    timerActive = false;
    let timeDisplay = document.getElementById("time");
    timeDisplay.innerHTML = "00:00";
    let circle = document.querySelector("circle");
    circle.style.strokeDasharray = "314 314";
    circle.classList.remove("active");
});

//Have items removed from list based on clicked red x
const removeIcons = document.querySelectorAll('.fa-xmark');

removeIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const button = icon.parentNode;
        const listItem = button.parentNode;
        listItem.parentNode.removeChild(listItem);
    });
});

// Add a new Custom Url to the list
addUrlBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var urlList = document.getElementById("urlList");
    var newUrl = document.getElementById("custom-url").value;
    var siteName = document.getElementById("siteName").value;
    var numUrls = urlList.getElementsByTagName("li").length;
    var newBlockedSite = document.createElement("li");
    newBlockedSite.innerHTML = '<input id="urlCheckbox' + (numUrls + 1) + '" type="url" name="site" value="' + newUrl + '"><button for="urlCheckbox' + (numUrls + 1) + '">' + siteName + '</button>';
    urlList.appendChild(newBlockedSite);
})
//allow a custom url to be added based on enter key
addUrlBtn.addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
        event.preventDefault();
        var urlList = document.getElementById("urlList");
        var newUrl = document.getElementById("custom-url").value;
        var siteName = document.getElementById("siteName").value;
        var numUrls = urlList.getElementsByTagName("li").length;
        var newBlockedSite = document.createElement("li");
        newBlockedSite.innerHTML = '<input id="urlCheckbox' + (numUrls + 1) + '" type="url" name="site" value="' + newUrl + '"><button for="urlCheckbox' + (numUrls + 1) + '">' + siteName + '</button>';
        urlList.appendChild(newBlockedSite);
    }
});

// Sort the sites into Alphabetical order
function sortBlockedSites() {
    let urlList = document.getElementById("urlList");
    let site = urlList.getElementsByTagName("input");
    let regexToMatchTLD = /\..+/;
    let sortedUrls = [];
    for (var i = 0; i < urlList.length; i++) {
        sortedUrls.push(site[i]);
    }
    sortedUrls.sort(function (a, b) {
        return a.value.localeCompare(b.value);
    });
    while (urlList.firstChild) {
        urlList.removeChild(urlList.firstChild);
    }
//Block URL when checkbox is clicked
    window.addEventListener('DOMContentLoaded', function() {
        document.body.addEventListener('click', function(event) {
            if(event.target.tagName === 'A' && event.target.getAttribute('target') === '_blank') {
                const newUrl = event.target.getAttribute('href');
                if (sortBlockedSites.includes(newUrl)) {
                    event.preventDefault();
                    window.open('warning.html?url=' + encodedURIComponent(newUrl), '_blank');
                }
            }
        });
    })
    // for (var i = 0; i < sortedUrls.length; i++) {
    //     sortedUrls[i].addEventListener("click", function () {
    //         if (this.checked && window.location.href.startsWith(this.value)) {
    //             window.location.replace(regexToMatchTLD, '');
    //             document.body.innerHTML = `
    //                 <div style="direction: ltr; position: fixed; top: 0; z-index: 999999; display: block; width: 100%; height: 100%; background: red">
    //                   <p style="position: relative; top: 40%; display: block; font-size: 66px; font-weight: bold; color: #fff; margin: 0 auto; text-align: center">
    //                     You're in Focus Mode. The website ${domain} is currently blocked !
    //                   </p>
    //                 </div>
    //           `;
    //         }
    //     });
    // }
}
sortBlockedSites();
document.addEventListener('DOMContentLoaded', displayTabs);
//add event listener for tabLinks
for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].addEventListener("click", function (event) {
        openTab(event, this.id);
    });
}
