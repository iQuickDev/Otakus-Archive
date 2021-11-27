import * as Utility from "./utility.js"

document.querySelector("#themeicon").onclick = ToggleTheme
document.querySelector("#settingsbtn").onclick = ToggleSettings
document.querySelector("#bgimage").onchange = ChangeBGImage
document.querySelector("#resetsettings").onclick = ResetSettings

Initialize()

var themeMode = localStorage.getItem("themeMode")
var settingsPanelToggled = false

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

    themeMode === "dark" ? themeMode = "light" : themeMode = "dark"

    themeIcon.classList.add("rotateout")

    await Utility.sleep(500)

    themeIcon.classList.remove("rotateout")

    themeMode === "dark" ? themeIcon.src= "frontend/media/lightmode.png" : themeIcon.src= "frontend/media/darkmode.png"

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