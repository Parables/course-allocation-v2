import type {ITable} from '..';

export let programmesTable: ITable = {
    id: "AllProgrammes",
    columns: [
        { name: 'Title' },
        { name: "Duration", class: "text-center" }
    ],
    rowSchema: {
        cellSchema: [
            { type: "text", text: "title", class: " truncate" },
            { type: "numeric", text: "duration", class: "text-center" }
        ]
    },
}

