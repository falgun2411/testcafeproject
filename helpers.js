import { t, Selector } from 'testcafe';
const axios = require('axios');

export async function getButtonText(window) {
    await t.switchToWindow(window);
    const text = await Selector('button').innerText;
    return text
}

export async function getSessionDetails() {
    const response = await axios.get('http://localhost:3000/api/lastsession');
    return response
}

export async function verifyValueAndType(actual, expected) {

    await t.expect(actual).eql(expected)
    // console.log('expected value' + expected + 'type of:' + typeof expected + ' -- actual value:' + actual + 'type of:' + typeof actual)
    // await t.expect(actual).notTypeOf('undefined', 'In Rest API response: value is stored with typeOf undefined ')
    // await t.expect(expected).notTypeOf('undefined', 'In Database: value is stored with typeOf undefined ')
    await t.expect(actual).notEql('undefined')
    await t.expect(actual).notEql('null')
    await t.expect(actual).notEql('')

}


export async function performDragAndDrop(fromLocation, toLocation) {
    const fromLocationArray = fromLocation.split('');
    const toLocationArray = toLocation.split('');
    var fromLocationCol = fromLocationArray[0].toLowerCase();
    var fromLocationRow = fromLocationArray[1]
    var toLocationCol = toLocationArray[0].toLowerCase();
    var toLocationRow = toLocationArray[1]
    var xpathSource = "div[data-col='" + fromLocationCol + "'][data-row='" + fromLocationRow + "']"
    var xpathTarget = "div[data-col='" + toLocationCol + "'][data-row='" + toLocationRow + "']"
    const sourceLocation = Selector(xpathSource);
    const targetLocation = Selector(xpathTarget);
    var flag = true
    await t.dragToElement(sourceLocation, targetLocation, { speed: 0.01 })

}

export async function verifyPiecesExistInRow(row) {
    var position = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    for (let i = 0; i < position.length; i++) {
        var xpath = "div[data-col='" + position[i] + "'][data-row='" + row + "']"
        var peiceExist = await Selector(xpath).exists
        await t.expect(peiceExist).ok()
    }
    console.log('All peices are existing in row number:' + row)
}

export async function verifyPiecesNotExistInRow(row) {
    var position = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    for (let i = 0; i < position.length; i++) {
        var xpath = "div[data-col='" + position[i] + "'][data-row='" + row + "']"
        var peiceExist = await Selector(xpath).exists
        await t.expect(peiceExist).notOk()
    }
    console.log('NO peices are existing in row number:' + row)
}

export async function peiceCanMoveFromTo(fromPosition, toProsition) {
    var PeiceCanMove = false
    await t.dragToElement(fromPosition, toProsition, { speed: 0.01 })
    await t.wait(1000)
    var peiceIsAtPreviosPosition = await fromPosition.exists;
    if (peiceIsAtPreviosPosition) {
        PeiceCanMove = true
    } else {
        PeiceCanMove = false
    }
    return PeiceCanMove
}

export async function getLocator(rowName, coloumnName, draggable) {
    var locator = "div[data-col='" + rowName + "'][data-row='" + coloumnName + "'][draggable='" + draggable + "']"
    return locator
}