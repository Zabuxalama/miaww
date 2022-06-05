const rows = [
    {
        title: 'Title',
        description: 'Desc',
        rowId: 'rowId'
    },
    {
        title: 'Title',
        description: 'Desc',
        rowId: 'rowId'
    }
]
const sections = [
{ title: "sections", rows: rows }
]
const button = {
    footerText: "Footer",
    buttonText: "Click Here!",
    description: "Hwhe",
    sections: sections,
    listType: 1
}
fadly.sendMessage(from, button, MessageType.listMessage)