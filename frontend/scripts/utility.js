function CompareObjectsAlphabetically(firstObject, secondObject, parameter)
{
    return firstObject[parameter].toLowerCase() == secondObject[parameter].toLowerCase() ?
    0 : firstObject[parameter].toLowerCase() > secondObject[parameter].toLowerCase() ? 1 : -1
}

function CompareDates(firstDate, secondDate, sortMode, rangeStart = null, rangeEnd = null)
{
    switch (sortMode)
    {
        case "newest":
            return new Date(firstDate).getTime() == new Date(secondDate).getTime() ?
            0 : new Date(firstDate).getTime() > new Date(secondDate).getTime() ? -1 : 1

        case "range":
            if (firstDate >= rangeStart && firstDate <= rangeEnd)
            return new Date(firstDate).getTime() == new Date(secondDate).getTime() ?
            0 : new Date(firstDate).getTime() > new Date(secondDate).getTime() ? -1 : 1
            break

        case "oldest":
            return new Date(firstDate).getTime() == new Date(secondDate).getTime() ?
            0 : new Date(firstDate).getTime() > new Date(secondDate).getTime() ? 1 : -1
    }
}

function DateToUnixTimestamp(date)
{
    return new Date(date).getTime() / 1000;
}

export function sleep(ms) { return new Promise((resolve) => {setTimeout(resolve, ms)}) }

export function AlphabeticalSort(array, parameter)
{
    return array.sort((first, second) => CompareObjectsAlphabetically(first, second, parameter))
}

export function SortByDate(array, sortMode)
{    
    return array.sort((first, second) => CompareDates(first.date, second.date, sortMode, rangeStart, rangeEnd))
}

export function SortByTags(array)
{
    // todo
}

export function ClearTable()
{
    let table = document.querySelector("#contentlist")
    const tableRows = table.children[1].querySelectorAll("tr:not(.excluded)")

    for (let i = 0; i < tableRows.length ; i++)
    {
        tableRows[i].remove()
    }
}

//make popup menu when clicking on option, range of date (between date1 and date2), most recent, oldest
//make transparency mode

