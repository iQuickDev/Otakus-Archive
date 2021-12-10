import * as Utility from "./utility.js"
import * as Sync from "./sync.js"
import * as UI from "./ui.js"

window.Utility = Utility
window.Sync = Sync
window.UI = UI

document.querySelector("#themeicon").onclick = ToggleTheme
document.querySelector("#settingsbtn").onclick = UI.ToggleSettings
document.querySelector("#transparency").onclick = ToggleTransparency
document.querySelector("#bgimageinput").onchange = UI.ChangeBGImage
document.querySelector("#resetsettings").onclick = UI.ResetBGImage
document.querySelector("#firsttimeaddcontent").onclick = UI.AddContent
document.querySelector("#addcontent").onclick = UI.AddContent
document.querySelector("#removecontent").onclick = RemoveContent
document.querySelector("#submitnewcontent").onclick = SubmitNewContent
document.querySelector("#closemodal").onclick = UI.CloseNewContentModal
document.querySelector("#searchbtn").onclick = UI.ToggleSearchbar
document.querySelector("#sortcriteria").children[3].onclick = UI.ToggleDateModeModal // date sort menu
document.querySelector("#searchbarinput").onkeyup = Search
document.querySelector("#mobile-searchbarinput").onkeyup = Search
document.querySelector("#importdata").onclick = Import
document.querySelector("#exportdata").onclick = Export
document.querySelector("#purgedata").onclick = Purge

Initialize()

CheckIfListIsEmpty()

var sortCriteria = document.querySelector("#sortcriteria").children
for (let i = 0; i < sortCriteria.length; i++) sortCriteria[i].addEventListener("click", SortContent)
var sortDateMode = document.querySelector("#datemodemodal").querySelectorAll("h3")
for (let i = 0; i < sortDateMode.length; i++) sortDateMode[i].addEventListener("click", SwitchDateSortMode)

var themeMode = localStorage.getItem("themeMode")
var isRemoving = false

function Initialize()
{
    if (localStorage.getItem("initialized") === null)
    {
        localStorage.setItem("initialized", true)
        localStorage.setItem("themeMode", "dark")
        localStorage.setItem("isTransparent", false)
    }
    else
    {
        document.querySelector("#bgimageinput").value = localStorage.getItem("bgimage")
        let bgImage = localStorage.getItem("bgimage")
        document.querySelector("body").style.backgroundImage = `url(${bgImage})`
        UI.SetTheme(localStorage.getItem("themeMode"))
        UI.SetTransparency(localStorage.getItem("isTransparent"))
        Sync.ImportData(localStorage.getItem("tableData"))
    }
}

async function ToggleTheme()
{
    const themeIcon = document.querySelector("#themeicon")

    themeMode === "dark" ? themeMode = "light" : themeMode = "dark"
    localStorage.setItem("themeMode", themeMode)

    themeIcon.classList.add("rotateout")

    await Utility.sleep(500)

    themeIcon.classList.remove("rotateout")

    if (themeMode === "dark")
    {
        UI.SetTheme("dark")
    }
    else
    {
        UI.SetTheme("light")
    }
    
    themeIcon.classList.add("rotatein")

    await Utility.sleep(500)

    themeIcon.classList.remove("rotatein")
}

function ToggleTransparency()
{   
    let transparencyCheckbox = document.querySelector("#transparency")

    transparencyCheckbox.checked ? localStorage.setItem("isTransparent", true) : localStorage.setItem("isTransparent", false)

    UI.SetTransparency(transparencyCheckbox.checked)
}


function RemoveContent()
{
    const table = document.querySelector("#contentlist")
    const tableRows = table.children[1].querySelectorAll("tr:not(.excluded)")

    let removeBtn = document.querySelector("#removecontent")

    isRemoving = !isRemoving

    isRemoving ? removeBtn.classList.add("btn-active") : removeBtn.classList.remove("btn-active")

    for (let i = 0; i < tableRows.length; i++)
    {
        if (isRemoving)
        {
            tableRows[i].classList.add("remove-hover")
        }
        else
        {
            tableRows[i].classList.remove("remove-hover")
        }

        tableRows[i].addEventListener("click", () =>
        {
            if (isRemoving)
            {
                tableRows[i].remove()
                Sync.LocalSave(Sync.ParseData())
                CheckIfListIsEmpty()
            }
        })
    }
}

function SubmitNewContent()
{
    const table = document.querySelector("#contentlist")

    let title = document.querySelector("#contenttitle").value
    let author = document.querySelector("#contentauthor").value
    let type = document.querySelector("#contenttype").value
    let date = document.querySelector("#contentdate").value
    let tags = "test"
    let inputs = document.querySelectorAll("#newcontent input")

    if (title === "")
    {
        return
    }

    if (author === "")
    {
        author = "Unknown"
    }

    if (date === "")
    {
        date = "Unknown"
    }

    let newElements = [title, author, type, date, tags]

    let tableWrapper = document.querySelector("#contenttable")

    let tableBody = table.children[1]

    let newRow = document.createElement("tr")

    for (let i = 0; i < newElements.length; i++)
    {
        let newCell = document.createElement("td")
        newCell.innerText = newElements[i]
        newRow.appendChild(newCell)
    }

    tableBody.insertBefore(newRow, tableBody.firstChild)

    UI.CloseNewContentModal()

    tableWrapper.classList.remove("hidden")

    Sync.LocalSave(Sync.ParseData())

    CheckIfListIsEmpty()

    inputs.forEach(input => input.value = "")
}

function SortContent()
{
    let sortCriteria = document.querySelector("#sortcriteria").children

    if (this.innerText !== "Date" && UI.isDateModeModalToggled)
    UI.ToggleDateModeModal()

    for (let i = 0; i < sortCriteria.length; i++)
    sortCriteria[i].classList.remove("selector")

    this.classList.add("selector")

    SortTableBy(this.textContent.toLowerCase())
}

function SortTableBy(sortCriteria, sortMode)
{
    let tableObject = JSON.parse(localStorage.getItem("tableData"))

    var sortedTableObject = []

    switch (sortCriteria)
    {
        case "title":
            sortedTableObject = Utility.AlphabeticalSort(tableObject, sortCriteria)
            break

        case "author":
            sortedTableObject = Utility.AlphabeticalSort(tableObject, sortCriteria)
            break
   
        case "type":
            sortedTableObject = Utility.AlphabeticalSort(tableObject, sortCriteria)
            break

        case "date":
            sortedTableObject = Utility.SortByDate(tableObject, sortMode)
            break

        case "tags":
            return alert("Not yet implemented")
    }

    Sync.LocalSave(sortedTableObject)
    Sync.ImportData(JSON.stringify(sortedTableObject))
}

function SwitchDateSortMode()
{
    for (let i = 0; i < sortDateMode.length; i++)
    {
        sortDateMode[i].classList.remove("selector")
    }

    this.classList.add("selector")

    SortTableBy("date", this.innerText.toLowerCase())
}

async function CheckIfListIsEmpty()
{
    const table = document.querySelector("#contentlist")
    const tableRows = table.children[1].querySelectorAll("tr:not(.excluded)")
    
    let tableWrapper = document.querySelector("#contenttable")

    let buttonsPanel = document.querySelector("#buttonspanel")

    if (tableRows.length > 0)
    {
        document.querySelector("#firsttime").classList.add("hidden")
        tableWrapper.classList.remove("hidden")
        buttonsPanel.classList.remove("hidden")
    }
    else
    {
        document.querySelector("#firsttime").classList.remove("hidden")
        tableWrapper.classList.add("hidden")
        buttonsPanel.classList.add("hidden")
    }
}

function Search()
{
    const table = document.querySelector("#contentlist")
    const tableRows = table.children[1].querySelectorAll("tr:not(.excluded)")

    let filter = this.value.toLowerCase()
    let hiddenCount = 0

    if (filter != " ")
    {
        let noResults = document.querySelector("#noresults").parentElement

        for (let i = 0; i < tableRows.length; i++)
        {
            let row = tableRows[i]
            let title = row.children[0].textContent.toLowerCase()
            let author = row.children[1].textContent.toLowerCase()

            if (title.includes(filter) || author.includes(filter))
                row.classList.remove("hidden")
            else
            {
                row.classList.add("hidden")
                hiddenCount++
            }

            if (hiddenCount == tableRows.length)
            {
                noResults.classList.remove("hidden")
            }
            else
                noResults.classList.add("hidden")
        }
    }
}

function Import()
{
    let uploader = document.querySelector("#uploader")
    let newData = []

    uploader.click()
    uploader.onchange = async () =>
    {
        newData = uploader.files[0]
        let content = await newData.text()
        localStorage.setItem("tableData", content)
        location.reload()
    }
}

function Export()
{
    Sync.ExportData(localStorage.getItem("tableData"))
}

function Purge()
{
    Sync.PurgeData()
    location.reload()
}