import type { ITable } from '../index';

export let recentBooks: ITable = {
    id: "FeePayments",
    columns: [
        { name: 'Title & Book Code' },
        { name: "Date Modified", class: "text-center" },
        { name: "Quantity", class: "text-center" },
        { name: "Status" },
    ],
    rowSchema: {
        cellSchema: [
            { type: "avartar-mainText-subText", text: 'name', subText: "examsID", avartar: "avartar" },
            { type: "text", text: "paymentDate", class: "text-center" },
            { type: "numeric", text: "amountPaid", class: "text-center" },
            { type: "chip", text: "status" },
        ]
    },

}

export let feesData = [
    {
        "name": "Erich Gosney",
        "examsID": 1,
        "paymentDate": "16/6/2020",
        "amountPaid": "$2032.76",
        "status": "PART",
        "avartar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
    }, {
        "name": "Rhody McTerry",
        "examsID": 2,
        "paymentDate": "29/3/2020",
        "amountPaid": "$3520.14",
        "status": "PAID",
        "avartar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
    }, {
        "name": "Winona Devonald",
        "examsID": 3,
        "paymentDate": "15/2/2020",
        "amountPaid": "$6324.21",
        "status": "PART",
        "avartar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
    }, {
        "name": "Oran Swidenbank",
        "examsID": 4,
        "paymentDate": "7/5/2020",
        "amountPaid": "$3535.21",
        "status": "PART",
        "avartar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
    }, {
        "name": "Stefa Goldes",
        "examsID": 5,
        "paymentDate": "24/6/2020",
        "amountPaid": "$2885.89",
        "status": "PART",
        "avartar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
    }, {
        "name": "Ewell Plews",
        "examsID": 6,
        "paymentDate": "9/6/2020",
        "amountPaid": "$1436.58",
        "status": "PART",
        "avartar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
    }, {
        "name": "Dione Breewood",
        "examsID": 7,
        "paymentDate": "7/1/2020",
        "amountPaid": "$2986.71",
        "status": "PAID",
        "avartar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
    }, {
        "name": "Jaquelin Pittem",
        "examsID": 8,
        "paymentDate": "10/4/2020",
        "amountPaid": "$6424.62",
        "status": "PAID",
        "avartar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
    }, {
        "name": "Peggy Perrycost",
        "examsID": 9,
        "paymentDate": "17/2/2020",
        "amountPaid": "$2164.92",
        "status": "PART",
        "avartar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
    }, {
        "name": "Carr Flanigan",
        "examsID": 10,
        "paymentDate": "10/7/2020",
        "amountPaid": "$3852.20",
        "status": "PART",
        "avartar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
    }]