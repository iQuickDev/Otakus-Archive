function CompareObjectsAlphabetically(firstObject, secondObject, parameter)
{
    return firstObject[parameter].toLowerCase() == secondObject[parameter].toLowerCase() ?
    0 : firstObject[parameter].toLowerCase() > secondObject[parameter].toLowerCase() ? 1 : -1
}

function CompareDates(firstDate, secondDate, sortMode)
{
    switch (sortMode)
    {
        case "newest":
            return new Date(firstDate).getTime() == new Date(secondDate).getTime() ?
            0 : new Date(firstDate).getTime() > new Date(secondDate).getTime() ? -1 : 1

        case "oldest":
            return new Date(firstDate).getTime() == new Date(secondDate).getTime() ?
            0 : new Date(firstDate).getTime() > new Date(secondDate).getTime() ? 1 : -1
    }
}

export function sleep(ms) { return new Promise((resolve) => {setTimeout(resolve, ms)}) }

export function AlphabeticalSort(array, parameter)
{
    return array.sort((first, second) => CompareObjectsAlphabetically(first, second, parameter))
}

export function SortByDate(array, sortMode)
{
    return array.sort((first, second) => CompareDates(first.date, second.date, sortMode))
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

//make transparency mode

