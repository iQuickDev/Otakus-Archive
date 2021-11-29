import * as Utility from "./utility.js"

document.querySelector("#themeicon").onclick = ToggleTheme
document.querySelector("#settingsbtn").onclick = ToggleSettings
document.querySelector("#bgimage").onchange = ChangeBGImage
document.querySelector("#resetsettings").onclick = ResetSettings
document.querySelector("#addcontent").onclick = AddContent
document.querySelector("#closemodal").onclick = CloseNewContentModal
document.querySelector("#searchbtn").onclick = ToggleSearchbar

var sortCriteria = document.querySelector("#sortcriteria").children
for (let i = 0; i < sortCriteria.length; i++) sortCriteria[i].addEventListener("click", SortContent)

Initialize()

var themeMode = localStorage.getItem("themeMode")
var settingsPanelToggled = false
var isSearchbarToggled = false

function Initialize()
{
    if (localStorage.getItem("initialized") === null)
    {
        localStorage.setItem("initialized", true)
        localStorage.setItem("themeMode", "dark")
    }
    else
    {
        document.querySelector("#bgimage").value = localStorage.getItem("bgimage")
        let bgImage = localStorage.getItem("bgimage")
        document.querySelector("body").style.backgroundImage = "url(" + bgImage + ")"
    }
}

async function ToggleTheme()
{
    const themeIcon = document.querySelector("#themeicon")
    const root = document.documentElement

    themeMode === "dark" ? themeMode = "light" : themeMode = "dark"

    themeIcon.classList.add("rotateout")

    await Utility.sleep(500)

    themeIcon.classList.remove("rotateout")

    if (themeMode === "dark")
    {
        themeIcon.src= "frontend/media/darkmode.png"
        themeIcon.classList.add("themeicon-dark")
        themeIcon.classList.remove("themeicon-light")
        root.style.setProperty("--background-color", "#303030")
        root.style.setProperty("--window-color", "#404040")
        root.style.setProperty("--text-color", "#FFF")
    }
    else
    {
        themeIcon.src= "frontend/media/lightmode.png"
        themeIcon.classList.remove("themeicon-dark")
        themeIcon.classList.add("themeicon-light")
        root.style.setProperty("--background-color", "#FFF")
        root.style.setProperty("--window-color", "#CCC")
        root.style.setProperty("--text-color", "#000")
    }

    themeIcon.classList.add("rotatein")

    await Utility.sleep(500)

    themeIcon.classList.remove("rotatein")
}

async function ToggleSettings()
{
    const settingsPanel = document.querySelector("#settingspanel")
    
    if (!settingsPanelToggled)
    {
        settingsPanel.classList.add("slidedown")
        settingsPanel.classList.remove("hidden")
    }
    else
    {
        settingsPanel.classList.remove("slidedown")
        settingsPanel.classList.add("slideup")

        await Utility.sleep(500)

        settingsPanel.classList.add("hidden")
        settingsPanel.classList.remove("slideup")
    }

    settingsPanelToggled = !settingsPanelToggled
}

function ChangeBGImage()
{
    const bgImageInput = document.querySelector("#bgimage")
    localStorage.setItem("bgimage", bgImageInput.value)

    let bgImage = localStorage.getItem("bgimage")
    document.querySelector("body").style.backgroundImage = "url(" + bgImage + ")"
}

function ResetSettings()
{
    const bgImageInput = document.querySelector("#bgimage")

    bgImageInput.value = ""

    localStorage.setItem("bgimage", "")

    document.querySelector("body").style.background = bgImageInput.value
}

async function AddContent()
{
    const newContentPanel = document.querySelector("#newcontent")
    const firstTimePanel = document.querySelector("#firsttime")
    const body = document.querySelector("body")

    body.classList.add("no-overflow")

    firstTimePanel.classList.add("hidden")
    newContentPanel.classList.remove("hidden")
    newContentPanel.classList.add("shownewcontentmodal")

    await Utility.sleep(500)
    
    body.classList.remove("no-overflow")
}

async function CloseNewContentModal()
{
    const newContentPanel = document.querySelector("#newcontent")
    const body = document.querySelector("body")

    body.classList.add("no-overflow")

    newContentPanel.classList.remove("shownewcontentmodal")
    newContentPanel.classList.add("hidenewcontentmodal")

    await Utility.sleep(500)

    newContentPanel.classList.add("hidden")
    newContentPanel.classList.remove("hidenewcontentmodal")
    body.classList.remove("no-overflow")
}

async function ToggleSearchbar()
{
    const searchBtn = document.querySelector("#searchbtn")
    const searchBarInput = document.querySelector("#searchbarinput")
    const sortBar = document.querySelector("#sortbar")
    const sortBy = document.querySelector("#sortby")

    if (isSearchbarToggled)
    {
        searchBarInput.classList.add("searchbarhide")
        sortBar.classList.add("sortbarhide")
        sortBy.classList.add("sortbyhide")

        await Utility.sleep(1000)

        searchBarInput.classList.remove("searchbarhide")
        sortBar.classList.remove("sortbarhide")
        sortBy.classList.remove("sortbyhide")

        searchBarInput.classList.add("hidden")
        sortBar.classList.add("hidden")
        sortBy.classList.add("hidden")
    }
    else
    {
        searchBarInput.classList.remove("hidden")
        sortBar.classList.remove("hidden")

        searchBarInput.classList.add("searchbarshow")
        sortBar.classList.add("sortbarshow")

        await Utility.sleep(500)

        sortBy.classList.remove("hidden")
        sortBy.classList.add("sortbyshow")

        await Utility.sleep(500)

        searchBarInput.classList.remove("searchbarshow")
        sortBar.classList.remove("sortbarshow")
        sortBy.classList.remove("sortbyshow")
    }

    isSearchbarToggled = !isSearchbarToggled
}

function SortContent()
{
    switch (this.innerHTML)
    {
        case "Name":
            break

        case "Author":
            break
        
        case "Type":
            break

        case "Date":
            break

        case "Tags":
            break
    }
}