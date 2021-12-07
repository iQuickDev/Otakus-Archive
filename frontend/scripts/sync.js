import * as Utility from "./utility.js"

export function ParseData()
{
    let data = []

    const table = document.querySelector("#contentlist")
    const tableRows = table.children[1].querySelectorAll("tr:not(.excluded)")

    for (let i = 0; i < tableRows.length ; i++)
    {
        data.unshift({
            title: tableRows[i].children[0].innerText,
            author: tableRows[i].children[1].innerText,
            type: tableRows[i].children[2].innerText,
            date: tableRows[i].children[3].innerText,
            tags: tableRows[i].children[4].innerText,
        })
    }

    return data
}

export function LocalSave(data)
{
    localStorage.setItem("tableData", JSON.stringify(data))
}

export function ImportData(data)
{
    let parsedData = JSON.parse(data)

    if (parsedData != null)
    {
        let tableWrapper = document.querySelector("#contenttable")
        let tableBody = document.querySelector("#contentlist").children[1]
        const parametersCount = 5
        
        Utility.ClearTable()

        for (let i = 0; i < parsedData.length; i++)
        {
            for (let j = 0; j < parametersCount; j++)
            {
                var newRow = document.createElement("tr")
                newRow.innerHTML =
                `<td>${parsedData[i].title}</td>
                <td>${parsedData[i].author}</td>
                <td>${parsedData[i].type}</td>
                <td>${parsedData[i].date}</td>
                <td>${parsedData[i].tags}</td>`
            }
            tableBody.appendChild(newRow)
        }

        tableWrapper.classList.remove("hidden")
    }
}

export function ExportData(data)
{
    let parsedData = JSON.parse(data)
    let downloader = document.querySelector("#downloader")
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(parsedData));

    downloader.setAttribute("href", dataStr)
    downloader.setAttribute("download", "archive.json")
    downloader.click()
}

export function PurgeData()
{
    localStorage.removeItem("tableData")
}

// todo: server sync
