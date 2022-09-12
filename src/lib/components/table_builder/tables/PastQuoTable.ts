import type {ITable} from '..';

export let pastquoTable: ITable = {
    id: "PastquoTB",
    columns: [
        { name: 'No' },
        { name: 'Year' },
        { name: 'Exams Type' },
        { name: 'Semester' },
        { name: 'Course Title' }
    ],
    rowSchema: {
        cellSchema: [
            { type: "text", text: "title", class: " truncate" },
            { type: "numeric", text: "duration", class: "text-center" }
        ]
    },
}

