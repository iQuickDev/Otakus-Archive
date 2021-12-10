var isSettingsPanelToggled = false
var isSearchbarToggled = false
export var isDateModeModalToggled = false

export async function ToggleSettings()
{
    const settingsPanel = document.querySelector("#settingspanel")

    if (!isSettingsPanelToggled)
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

    isSettingsPanelToggled = !isSettingsPanelToggled
}

export function SetTheme(mode)
{
    const themeIcon = document.querySelector("#themeicon")
    const root = document.documentElement

    if (mode === "dark")
    {
        themeIcon.src = "frontend/media/darkmode.png"
        themeIcon.classList.add("themeicon-dark")
        themeIcon.classList.remove("themeicon-light")
        root.style.setProperty("--background-color", "#333")
        root.style.setProperty("--window-color", "#444")
        root.style.setProperty("--text-color", "#FFF")
    }
    else
    {
        themeIcon.src = "frontend/media/lightmode.png"
        themeIcon.classList.remove("themeicon-dark")
        themeIcon.classList.add("themeicon-light")
        root.style.setProperty("--background-color", "#FFF")
        root.style.setProperty("--window-color", "#CCC")
        root.style.setProperty("--text-color", "#000")
    }

    document.querySelector("#transparency").checked = false
}

export function SetTransparency(isTransparent)
{   
    const root = document.documentElement
    
    if (isTransparent)
    {
        root.style.setProperty("--background-color", "#3336")
        root.style.setProperty("--window-color", "#4446")
    }
    else
        SetTheme(localStorage.getItem("themeMode"))
}

export async function AddContent()
{
    const backgroundDarkener = document.querySelector(".darken-background")
    const newContentPanel = document.querySelector("#newcontent")
    const body = document.querySelector("body") 

    backgroundDarkener.classList.remove("hidden")

    body.classList.add("no-overflow")

    newContentPanel.classList.remove("hidden")
    newContentPanel.classList.add("shownewcontentmodal")

    await Utility.sleep(500)

    body.classList.remove("no-overflow")
}

export async function CloseNewContentModal()
{
    const backgroundDarkener = document.querySelector(".darken-background")
    const newContentPanel = document.querySelector("#newcontent")
    const body = document.querySelector("body")

    body.classList.add("no-overflow")

    newContentPanel.classList.remove("shownewcontentmodal")
    newContentPanel.classList.add("hidenewcontentmodal")

    await Utility.sleep(500)

    newContentPanel.classList.add("hidden")
    newContentPanel.classList.remove("hidenewcontentmodal")
    backgroundDarkener.classList.add("hidden")
    body.classList.remove("no-overflow")
}

export function ChangeBGImage()
{
    const bgImageInput = document.querySelector("#bgimageinput")
    localStorage.setItem("bgimage", bgImageInput.value)

    let bgImage = localStorage.getItem("bgimage")
    document.querySelector("body").style.backgroundImage = `url(${bgImage})`
}

export function ResetBGImage()
{
    const bgImageInput = document.querySelector("#bgimageinput")

    bgImageInput.value = ""

    localStorage.setItem("bgimage", "")

    document.querySelector("body").style.background = bgImageInput.value
}

export async function ToggleSearchbar()
{
    const searchBarInput = document.querySelector("#searchbarinput")
    const sortBar = document.querySelector("#sortbar")
    const sortBy = document.querySelector("#sortby")

    if (isSearchbarToggled)
    {
        if (isDateModeModalToggled)
        ToggleDateModeModal()

        searchBarInput.classList.add("searchbarhide")
        sortBar.classList.add("sortbarhide")
        sortBy.classList.add("sortbyhide")

        await Utility.sleep(500)

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

        await Utility.sleep(250)

        sortBy.classList.remove("hidden")
        sortBy.classList.add("sortbyshow")

        await Utility.sleep(250)

        searchBarInput.classList.remove("searchbarshow")
        sortBar.classList.remove("sortbarshow")
        sortBy.classList.remove("sortbyshow")
    }

    isSearchbarToggled = !isSearchbarToggled
}

export async function ToggleDateModeModal()
{
    const dateModeModal = document.querySelector("#datemodemodal")
    const body = document.querySelector("body")

    body.classList.add("no-overflow")

    if (isDateModeModalToggled)
    {
        dateModeModal.classList.add("sortdatemodehide")

        await Utility.sleep(500)

        dateModeModal.classList.add("hidden")
        dateModeModal.classList.remove("sortdatemodehide")
    }
    else
    {
        dateModeModal.classList.remove("hidden")
        dateModeModal.classList.add("sortdatemodeshow")

        await Utility.sleep(500)

        dateModeModal.classList.remove("sortdatemodeshow")
    }

    body.classList.remove("no-overflow")

    isDateModeModalToggled = !isDateModeModalToggled
}
