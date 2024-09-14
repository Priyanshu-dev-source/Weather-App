let typingTimer;
var api_url = `YOUR API KEY`
var search_url = `YOUR API KEY`
var dataGet
let searchData

function onTypingFinished() {
    // const location = searchInput.value
    getApi(`YOUR API KEY`)
}

// function onKeyUpEvent() {
//     clearTimeout(typingTimer);
//     typingTimer = setTimeout(onTypingFinished, 1000);
// }

let searchInput = document.getElementById("searchbar")
// searchInput.addEventListener("keyup", onKeyUpEvent);



var timeoutTimeout
searchInput.addEventListener("keyup", () => {
    clearTimeout(timeoutTimeout)
    // searchItems(searchData)
    timeoutTimeout = setTimeout(() => {
        let search = searchInput.value
        console.log(search)
        getSearch(`YOUR API KEY`)
    }, 300);
    // console.log(search)
})


async function getApi(url) {
    try {
        const response = await fetch(url);
        var data = await response.json();
        // console.log(data);
        if (response.ok) {
            // console.log(response)
            updateData(data)
            alertPopUp("Data received", "lightgreen")
        } else {
            alertPopUp("Enter location", "lightgreen")
        }
        
    }
    catch (error) {
        console.log(error)
        // alertPopUp("Data received", "lightgreen")
        alertPopUp("ERROR Fectching", "red")
    }

}


let searchDataLength
async function getSearch(searchUrl) {
    if (searchUrl.length >=1 ) {
    try {
            console.log({searchUrl})
            const response = await fetch(searchUrl);
            searchData = await response.json();
            searchDataLength = searchData.length
            // console.log(searchData);
            // console.log(searchDataLength)
            console.log({searchData})
            if (response.ok) {
                searchItems(searchData)
                // updateData(searchData)
                alertPopUp("Data received", "lightgreen")
            } else {
                alertPopUp("Enter location", "lightgreen")
            }
        }
        
        catch (error) {
            console.log(error)
            alertPopUp("ERROR Fectching", "red")
        }
        
    }else{
        // alertPopUp("3 letter required","orange")
    }
    
}
// console.log(searchData);
// console.log(searchDataLength)


function updateData(data) {
    document.getElementById("weather-place-name").textContent = data.location.name
    document.getElementById("humidity").textContent = "Humidity : " + data.current.humidity + "%"
    document.getElementById("degree-counter").innerHTML = Math.round(data.current.temp_c) + ` &deg;C`
    document.getElementById("weather-image").src = data.current.condition.icon.replace("64x64", "128x128")

    var timeArray = [6, 9, 12, 15, 18, 21]

    for (let i = 0; i <= 5; i++) {
        var arrayIndex = timeArray[i]
        document.getElementsByClassName("time-specific-weather-photo")[i].src = data.forecast.forecastday[0].hour[arrayIndex].condition.icon
        document.getElementsByClassName("current-time-weather-degree")[i].innerHTML = Math.floor(data.forecast.forecastday[0].hour[arrayIndex].temp_c) + "&deg;"

    }



    document.getElementById("air-condition-real-feel").innerHTML = Math.floor(data.current.feelslike_c) + `&deg;C`
    document.getElementById("air-condition-wind-speed").innerHTML = data.current.wind_kph + " Km/h"
    document.getElementById("air-condition-chance-rain").innerHTML = data.forecast.forecastday[0].day.daily_chance_of_rain + "%"
    document.getElementById("air-condition-uv-index").innerHTML = data.forecast.forecastday[0].day.uv
    document.getElementById("air-condition-uv-index").innerHTML = data.current.uv
    document.getElementById("air-condition-sunrise").innerHTML = data.forecast.forecastday[0].astro.sunrise
    document.getElementById("air-condition-visibility").innerHTML = data.current.vis_km + " km"
    document.getElementById("air-condition-sunset").innerHTML = data.forecast.forecastday[0].astro.sunset
    document.getElementById("air-condition-pressure").innerHTML = data.current.pressure_in + " in"

    const monthObject = {
        "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "09": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"
    }

    for (let i = 0; i < 7; i++) {
        if (i === 0) {
            document.getElementsByClassName("week-days-name")[i].innerHTML = "Today"
        }
        else {
            var dateArray = data.forecast.forecastday[i].date.split("-")
            var dateInfo = dateArray[2] + " " + monthObject[dateArray[1]]
            document.getElementsByClassName("week-days-name")[i].textContent = dateInfo
        }
        document.getElementsByClassName("week-days-weather-photo")[i].src = data.forecast.forecastday[i].day.condition.icon
        document.getElementsByClassName("week-days-weather-type")[i].textContent = data.forecast.forecastday[i].day.condition.text
        document.getElementsByClassName("week-days-temp")[i].innerHTML =
            `<div>Max - ${Math.floor(data.forecast.forecastday[i].day.maxtemp_c)}&deg;</div>
         <div>Min - ${Math.floor(data.forecast.forecastday[i].day.mintemp_c)}&deg;</div>`
    }
    document.getElementById("cities-weather-place-name").textContent = data.location.name
    document.getElementById("cities-humidity").textContent = "Humidity : " + data.current.humidity + "%"
    document.getElementById("cities-degree-counter").innerHTML = Math.round(data.current.temp_c) + ` &deg;C`
    document.getElementById("cities-weather-image").src = data.current.condition.icon.replace("64x64", "128x128")


    var timeForecast = [6, 12, 21]
    var index = 0
    timeForecast.forEach((time) => {
        document.getElementsByClassName("cities-time-specific-weather-photo")[index].src = data.forecast.forecastday[0].hour[time].condition.icon
        document.getElementsByClassName("cities-current-time-weather-degree")[index].innerHTML = Math.floor(data.forecast.forecastday[0].hour[time].temp_c) + `&deg;`
        index += 1

    })

    for (let i = 0; i < 3; i++) {
        if (i === 0) {
            document.getElementsByClassName("cities-week-days-name")[i].innerHTML = "Today"
        }
        else {
            var dateArray = data.forecast.forecastday[i].date.split("-")
            var dateInfo = dateArray[2] + " " + monthObject[dateArray[1]]
            document.getElementsByClassName("cities-week-days-name")[i].textContent = dateInfo
        }
        document.getElementsByClassName("cities-week-days-weather-photo")[i].src = data.forecast.forecastday[i].day.condition.icon
        document.getElementsByClassName("cities-week-days-weather-type")[i].textContent = data.forecast.forecastday[i].day.condition.text
        document.getElementsByClassName("cities-week-days-temp")[i].innerHTML =
            `<span>${Math.floor(data.forecast.forecastday[i].day.maxtemp_c)}<span style="color: rgb(147, 147, 147);">/${Math.floor(data.forecast.forecastday[i].day.mintemp_c)}</span></span>`
    }

    document.getElementById("air-condition-pressure").innerHTML = data.current.pressure_in + " in"
    document.getElementById("air-condition-visibility").innerHTML = data.current.vis_km + " km"
    document.getElementById("air-condition-sunset").innerHTML = data.forecast.forecastday[0].astro.sunset

    for (let i = 0; i < 7; i++) {
        if (i === 0) {
            document.getElementsByClassName("settings-week-days-name")[i].innerHTML = "Today"
        }
        else {
            var dateArray = data.forecast.forecastday[i].date.split("-")
            var dateInfo = dateArray[2] + " " + monthObject[dateArray[1]]
            document.getElementsByClassName("settings-week-days-name")[i].textContent = dateInfo
        }
        document.getElementsByClassName("settings-week-days-weather-photo")[i].src = data.forecast.forecastday[i].day.condition.icon
        document.getElementsByClassName("settings-week-days-weather-type")[i].textContent = data.forecast.forecastday[i].day.condition.text
        document.getElementsByClassName("settings-week-days-temp")[i].innerHTML =
            `<div>Max - ${Math.floor(data.forecast.forecastday[i].day.maxtemp_c)}&deg;</div>
         <div>Min - ${Math.floor(data.forecast.forecastday[i].day.mintemp_c)}&deg;</div>`
    }

}


getApi(api_url)



var screens = ["main", "cities", "map", "settings"]

function openScreen(screen) {
    if (screens.includes(screen)) {

        screens.forEach((screenToClose) => {
            if (screenToClose !== screen) {
                closeScreen(screenToClose)
            }

        })

        if (screen == "main") {
            document.getElementsByClassName("weather")[0].getElementsByTagName("svg")[0].style.fill = "white"
            document.getElementsByClassName("weather")[0].getElementsByClassName("navbar-items-heading")[0].style.color = "white"

            setTimeout(() => {
                document.getElementsByClassName("main-container")[0].style.display = "flex"
                setTimeout(() => {
                    document.getElementsByClassName("main-middle-items-contentbox")[0].style.transform = "translateY(0)"
                    document.getElementsByClassName("main-third-items-box")[0].style.transform = "translateX(0)"
                }, 10);
            }, 300);
        }
        else if (screen == "cities") {
            document.getElementsByClassName("cities")[0].getElementsByTagName("svg")[0].style.fill = "white"
            document.getElementsByClassName("cities")[0].getElementsByClassName("navbar-items-heading")[0].style.color = "white"
            setTimeout(() => {
                document.getElementsByClassName("cities-container")[0].style.display = "flex"
                setTimeout(() => {
                    document.getElementsByClassName("cities-middle-items-contentbox")[0].style.transform = "translateY(0)"
                    document.getElementsByClassName("cities-third-items-box")[0].style.transform = "translateX(0)"
                }, 10);
            }, 300);
        }
        else if (screen == "map") {
            document.getElementsByClassName("map")[0].getElementsByTagName("svg")[0].style.fill = "white"
            document.getElementsByClassName("map")[0].getElementsByClassName("navbar-items-heading")[0].style.color = "white"
            document.getElementsByClassName("map-container")[0].style.display = "flex"
        }
        else if (screen == "settings") {
            document.getElementsByClassName("settings")[0].getElementsByTagName("svg")[0].style.fill = "white"
            document.getElementsByClassName("settings")[0].getElementsByClassName("navbar-items-heading")[0].style.color = "white"
            document.getElementsByClassName("settings-container")[0].style.display = "flex"

            document.getElementsByClassName("settings")[0].getElementsByTagName("svg")[0].style.fill = "white"
            document.getElementsByClassName("settings")[0].getElementsByClassName("navbar-items-heading")[0].style.color = "white"
            setTimeout(() => {
                document.getElementsByClassName("settings-container")[0].style.display = "flex"
                setTimeout(() => {
                    document.getElementsByClassName("settings-middle-items-contentbox")[0].style.transform = "translateY(0)"
                    document.getElementsByClassName("settings-third-items-box")[0].style.transform = "translateX(0)"
                }, 10);
            }, 300);

        }
    }
}

function closeScreen(screen) {
    if (screens.includes(screen)) {
        if (screen == "main") {
            document.getElementsByClassName("weather")[0].getElementsByTagName("svg")[0].style.fill = "rgba(181, 176, 176, 0.695)"
            document.getElementsByClassName("weather")[0].getElementsByClassName("navbar-items-heading")[0].style.color = "rgba(181, 176, 176, 0.695)"
            document.getElementsByClassName("navbar-items-heading")[0].style.color = "rgba(181, 176, 176, 0.695)"
            document.getElementsByClassName("main-middle-items-contentbox")[0].style.transform = "translateY(200%)"
            document.getElementsByClassName("main-third-items-box")[0].style.transform = "translateX(200%)"
            setTimeout(() => {
                document.getElementsByClassName("main-container")[0].style.display = "none"
            }, 300);

        }
        else if (screen == "cities") {
            document.getElementsByClassName("cities")[0].getElementsByTagName("svg")[0].style.fill = "rgba(181, 176, 176, 0.695)"
            document.getElementsByClassName("cities")[0].getElementsByClassName("navbar-items-heading")[0].style.color = "rgba(181, 176, 176, 0.695)"
            document.getElementsByClassName("cities-middle-items-contentbox")[0].style.transform = "translateY(200%)"
            document.getElementsByClassName("cities-third-items-box")[0].style.transform = "translateX(200%)"
            setTimeout(() => {
                document.getElementsByClassName("cities-container")[0].style.display = "none"
            }, 300);
        }
        else if (screen == "map") {
            document.getElementsByClassName("map")[0].getElementsByTagName("svg")[0].style.fill = "rgba(181, 176, 176, 0.695)"
            document.getElementsByClassName("map")[0].getElementsByClassName("navbar-items-heading")[0].style.color = "rgba(181, 176, 176, 0.695)"
            document.getElementsByClassName("map-container")[0].style.display = "none"
        }
        else if (screen == "settings") {
            document.getElementsByClassName("settings")[0].getElementsByTagName("svg")[0].style.fill = "rgba(181, 176, 176, 0.695)"
            document.getElementsByClassName("settings")[0].getElementsByClassName("navbar-items-heading")[0].style.color = "rgba(181, 176, 176, 0.695)"
            document.getElementsByClassName("settings-middle-items-contentbox")[0].style.transform = "translateY(200%)"
            document.getElementsByClassName("settings-third-items-box")[0].style.transform = "translateX(200%)"
            setTimeout(() => {
                document.getElementsByClassName("settings-container")[0].style.display = "none"
            }, 300);
        }
    }
}

document.getElementsByClassName("weather")[0].addEventListener("click", () => {
    openScreen("main")

})
document.getElementsByClassName("cities")[0].addEventListener("click", () => {
    openScreen("cities")
})
document.getElementsByClassName("map")[0].addEventListener("click", () => {
    openScreen("map")
})
document.getElementsByClassName("settings")[0].addEventListener("click", () => {
    openScreen("settings")
})

openScreen("main")

var seeMoreToggle = false

document.getElementById("see-more-button").addEventListener("click", () => {
    if (!seeMoreToggle) {
        document.getElementById("see-more-button").textContent = "See Less"
        document.getElementsByClassName("today-forecast-current-weather-place")[0].style.transition = ".6s height, .1s opacity"
        document.getElementsByClassName("today-forecast-current-weather-place")[0].style.height = "0"
        document.getElementsByClassName("today-forecast-current-weather-place")[0].style.opacity = "0"
        setTimeout(() => {
            document.getElementsByClassName("today-forecast-current-weather-place")[0].style.display = "none"

        }, 600);


        document.getElementsByClassName("air-condition-forecast")[0].style.height = "65%"

        for (let index = 0; index < 4; index++) {
            document.getElementsByClassName("air-condition-forecast-items")[index].style.height = "20%"
        }
        seeMoreToggle = true
    }
    else {
        document.getElementById("see-more-button").textContent = "See More"
        document.getElementsByClassName("today-forecast-current-weather-place")[0].style.display = "flex"
        document.getElementsByClassName("today-forecast-current-weather-place")[0].style.transition = ".6s height, .6s opacity"
        setTimeout(() => {
            document.getElementsByClassName("today-forecast-current-weather-place")[0].style.opacity = "1"
            document.getElementsByClassName("today-forecast-current-weather-place")[0].style.height = "30%"
        }, 100);


        document.getElementsByClassName("air-condition-forecast")[0].style.height = "35%"

        for (let index = 0; index < 4; index++) {
            document.getElementsByClassName("air-condition-forecast-items")[index].style.height = "50%"
        }
        seeMoreToggle = false
    }
})

function createAccountBtn() {
    document.getElementsByClassName("side-navbar")[0].style.transform = "translateX(-100%)"
    document.getElementsByClassName("middle-items-container")[0].style.transform = "translateX(200%)"
    document.getElementsByClassName("login-signup-form")[0].style.display = "flex"
    setTimeout(() => {
        document.getElementsByClassName("login-signup-form")[0].style.transform = "translateY(0)"
    }, 10);

    document.getElementsByClassName("head-container")[0].style.display = "none"
}

document.getElementById("back-btn").addEventListener("click", () => {
    document.getElementsByClassName("login-signup-form")[0].style.transform = "translateY(100%)"
    setTimeout(() => {
        document.getElementsByClassName("login-signup-form")[0].style.display = "none"
        document.getElementsByClassName("head-container")[0].style.display = "flex"
        setTimeout(() => {
            document.getElementsByClassName("side-navbar")[0].style.transform = "translateX(0)"
            document.getElementsByClassName("middle-items-container")[0].style.transform = "translateX(0%)"
            openScreen("main")
        }, 100);
    }, 300);

})
document.getElementById("create-account-btn").addEventListener("click", () => {
    createAccountBtn()
})
document.getElementById("goToSignup").addEventListener("click", () => {
    document.getElementsByClassName("login-form")[0].style.transform = "rotateY(90deg)"
    setTimeout(() => {
        document.getElementsByClassName("login-form")[0].style.display = "none"
        document.getElementsByClassName("signup-form")[0].style.display = "flex"
        setTimeout(() => {
            document.getElementsByClassName("signup-form")[0].style.transform = "rotateY(0)"
        }, 10);
    }, 400);
})
document.getElementById("goToLogin").addEventListener("click", () => {
    document.getElementsByClassName("signup-form")[0].style.transform = "rotateY(90deg)"
    setTimeout(() => {
        document.getElementsByClassName("login-form")[0].style.display = "flex"
        document.getElementsByClassName("signup-form")[0].style.display = "none"
        setTimeout(() => {
            document.getElementsByClassName("login-form")[0].style.transform = "rotateY(0)"
        }, 10);
    }, 400);
})
document.getElementById("goToForgotPassword").addEventListener("click", () => {
    document.getElementsByClassName("login-form")[0].style.transform = "rotateY(90deg)"
    setTimeout(() => {
        document.getElementsByClassName("forgot-form")[0].style.display = "flex"
        document.getElementsByClassName("login-form")[0].style.display = "none"
        setTimeout(() => {
            document.getElementsByClassName("forgot-form")[0].style.transform = "rotateY(0)"
        }, 10);
    }, 400);
})




var popupIndex = 0
var timeoutTimeout
function alertPopUp(message, color) {
    clearTimeout(timeoutTimeout)
    var popupElement = document.getElementsByClassName("popup-alert")[0]
    document.getElementsByClassName("popup-alert")[0].style.display = "flex"

    var template = `<div class="popup-message" style="background-color:${color};">
        ${message}
    </div>`

    popupElement.innerHTML += template
    popupIndex++
    // console.log(document.getElementsByClassName("popup-message"));
    if (popupIndex > 1) {
        setTimeout(() => {
            document.getElementsByClassName("popup-message")[0].style.opacity = "0"
            // setTimeout(() => {
            //     document.getElementsByClassName("popup-message")[0].remove()
            // }, 500);
        }, 1000);
    }

    timeoutTimeout = setTimeout(() => {
        for (let index = 0; index < document.getElementsByClassName("popup-message").length; index++) {
            setTimeout(() => {
                if (document.getElementsByClassName("popup-message").length > 0) {
                    setTimeout(() => {
                        document.getElementsByClassName("popup-message")[0].style.opacity = "0"
                        setTimeout(() => {
                            document.getElementsByClassName("popup-message")[0].remove()
                        }, 300);
                    }, 1);
                }
            }, 1000 * index);
        }
    }, 1000);



}
var itemsGet
var listItems = document.getElementById("search-items")
function searchItems(searchData){
    console.log({searchData})
    document.getElementById("search-items").style.display="flex"
        listItems.innerHTML = ""
        for(let i=0;i<searchDataLength;i++){
            itemsGet = `<li class="searched-items-get" data-index="${i}"> ${searchData[i].name} , ${searchData[i].region} , ${searchData[i].country}  </li>`
            listItems.innerHTML += itemsGet
            
        }
}

// searchInput.addEventListener("keyup", ()=>{
//      document.getElementById("search-items").style.display="flex"
//     searchItems(searchData)
//     console.log("kaam krr rha hai")
// })


listItems.addEventListener("click", (event) => {
    if (event.target.classList.contains("searched-items-get")) {
        const dataIndex = event.target.getAttribute("data-index");
        dataGet = searchData[dataIndex].name
        onTypingFinished()
        // document.getElementById("search-items").style.opacity="0"
        setTimeout(() => {
            document.getElementById("search-items").style.display="none"
        }, 800);
        searchInput.value=dataGet
    } 
    // searchItems(searchData)
});


export { alertPopUp, openScreen };

