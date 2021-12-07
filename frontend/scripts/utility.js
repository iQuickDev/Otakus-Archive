function compareObjects(firstObject, secondObject, parameter)
{
    return firstObject[parameter].toLowerCase() == secondObject[parameter].toLowerCase() ?
    0 : firstObject[parameter].toLowerCase() > secondObject[parameter].toLowerCase() ? 1 : -1
}

export function sleep(ms) { return new Promise((resolve) => {setTimeout(resolve, ms)}) }

export function AlphabeticalSort(array, parameter)
{
    return array.sort((first, second) => compareObjects(first, second, parameter))
}

export function SortByDate(array)
{
    // todo
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

