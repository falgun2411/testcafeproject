import { Selector, RequestLogger } from 'testcafe';
import locators from '../page-objects/components/locators';
import chessboardPage from '../page-objects/pages/chessboardPage';
import https from 'https';
import { getSessionDetails } from '../helpers'
import { getQueryData } from '../page-objects/components/mongoconnect'
import gloabal from '../global';
const axios = require('axios');

const GLOBAL = new gloabal()
const getLocator = new locators()
const ChessBoardPage = new chessboardPage()

var initialWindow, window2, window3 = null

fixture`Check valid moves`
    .page`http://localhost:8080/`
    .before(async t => {
        console.log('Before ALL')
    })
    .beforeEach(async t => {
        console.log('Setting up game session for Player 1,2,3')
        await t.setTestSpeed(0.1)
        await t.setPageLoadTimeout(5000)

        const baseUrl = GLOBAL.BASE_URL
        initialWindow = await t.getCurrentWindow();
        await t.maximizeWindow()
        window2 = await t.openWindow(baseUrl);
        window3 = await t.openWindow(baseUrl);

        await t.switchToWindow(initialWindow);
        await ChessBoardPage.setUpEnv()

        await t.switchToWindow(window2);
        await ChessBoardPage.clickButton_join_a_game()
        await ChessBoardPage.verifyPlayerDetails(2, false)

        await t.switchToWindow(window3);
        await ChessBoardPage.verifyPlayerDetails(3, false)

        console.log('Focus on window: User 1')
        await t.switchToWindow(initialWindow);
        await ChessBoardPage.verifyPlayerDetails(1, true)

    })
    .after(async t => {
        console.log('After ALL')
    })
    .afterEach(async t => {
        console.log('After each test')
        initialWindow, window2, window3 = null
        console.log('===================================================')
    })

test('No Player can make 2 or more consecutive moves', async t => {

    // player 1: C1 to D3
    console.log('User 1: perfroms drag and drop event ')
    await ChessBoardPage.performDragAndDropEvent(getLocator.whiteSourcePosition(), getLocator.whiteTargetPosition())
    console.log('User 1: Drag and drop event  is verified')
    await ChessBoardPage.verifyValuesInAPIandDatabase()

    await t.dragToElement(getLocator.white_continueAttempt_souce(), getLocator.white_continueAttempt_target(), { speed: 0.01 })
    await t.wait(1000)
    await ChessBoardPage.verifyMoveExists(getLocator.white_continueAttempt_souce())
    const response = await getSessionDetails();
    await t.expect(response.data.players.length).eql(2)
    await t.expect(response.data.moves.length).eql(1)
    var sessionId = response.data._id
    let DatabseQuery = { _id: sessionId }
    var queryResponse = await getQueryData(DatabseQuery)
    await t.expect(queryResponse.players.length).eql(2)
    await t.expect(queryResponse.moves.length).eql(1)

    console.log('Focus on window: User 2')
    await t.switchToWindow(window2);
    await ChessBoardPage.verifyPlayerDetails(2, true)
    await ChessBoardPage.verifyMoveExists(getLocator.whiteTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.whiteSourcePosition())
    console.log('User 2: screen details and messages are correct')
    console.log('User 2: chess board is updated')

    console.log('Focus on window: User 3')
    await t.switchToWindow(window3);
    await ChessBoardPage.verifyPlayerDetails(3, false)
    await ChessBoardPage.verifyMoveExists(getLocator.WhiteNewTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.whiteSourcePosition())
    console.log('User 3: screen details and messages are correct')
    console.log('User 3: chess board is updated')

    // player 2: G8 to E6
    console.log('Focus on window: User 2')
    await t.switchToWindow(window2);
    console.log('User 2: performs drag and drop')
    await ChessBoardPage.verifyPlayerDetails(2, true)
    await ChessBoardPage.performDragAndDropEvent(getLocator.blackSourcePosition(), getLocator.blackTargetPosition())
    await t.wait(1000)
    await ChessBoardPage.verifyMoveExists(getLocator.blackNewTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.blackSourcePosition())
    await ChessBoardPage.verifyPlayerDetails(2, false)
    console.log('User 2: screen details and messages are correct')
    console.log('User 2: chess board is updated')
    await ChessBoardPage.verifyValuesInAPIandDatabase()
    await t.dragToElement(getLocator.black_continueAttempt_souce(), getLocator.black_continueAttempt_target(), { speed: 0.01 })
    await t.wait(1000)
    await ChessBoardPage.verifyMoveExists(getLocator.black_continueAttempt_souce())
    const response2 = await getSessionDetails();
    await t.expect(response2.data.players.length).eql(2)
    await t.expect(response2.data.moves.length).eql(2)
    sessionId = response2.data._id
    DatabseQuery = { _id: sessionId }
    queryResponse = await getQueryData(DatabseQuery)
    await t.expect(queryResponse.players.length).eql(2)
    await t.expect(queryResponse.moves.length).eql(2)
})

test('Piece is not allowed to move: Out of board', async t => {

    // player 1: C1 to B8
    console.log('User 1: perfroms drag and drop event ')
    await t.dragToElement(getLocator.whiteSourcePosition(), getLocator.button(), { speed: 0.01 })
    console.log('User 1: Drag and drop event  is verified')
    const response = await getSessionDetails();
    await t.expect(response.data.players.length).eql(2)
    await t.expect(response.data.moves.length).eql(0)
    var sessionId = response.data._id
    let DatabseQuery = { _id: sessionId }
    var queryResponse = await getQueryData(DatabseQuery)
    await t.expect(queryResponse.players.length).eql(2)
    await t.expect(queryResponse.moves.length).eql(0)
    await ChessBoardPage.verifyMoveExists(getLocator.whiteSourcePosition())

})

test('Piece is allowed to move: to a square where opponent’s piece is placed', async t => {

    // player 1: C1 to B8
    console.log('User 1: perfroms drag and drop event ')
    await ChessBoardPage.performDragAndDropEvent(getLocator.whiteSourcePosition(), getLocator.white_target_opponentKnight())
    console.log('User 1: Drag and drop event  is verified')

    const response = await getSessionDetails();
    await t.expect(response.data.players.length).eql(2)
    await t.expect(response.data.moves.length).eql(1)
    var sessionId = response.data._id
    let DatabseQuery = { _id: sessionId }
    var queryResponse = await getQueryData(DatabseQuery)
    await t.expect(queryResponse.players.length).eql(2)
    await t.expect(queryResponse.moves.length).eql(1)

    // player 2: G8 to E6
    console.log('Focus on window: User 2')
    await t.switchToWindow(window2);
    await ChessBoardPage.verifyPlayerDetails(2, true)
    console.log('User 2: performs drag and drop')
    await ChessBoardPage.performDragAndDropEvent(getLocator.blackSourcePosition(), getLocator.blackTargetPosition())
    await t.wait(1000)
    await ChessBoardPage.verifyMoveExists(getLocator.blackNewTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.blackSourcePosition())
    await ChessBoardPage.verifyPlayerDetails(2, false)
    console.log('User 2: screen details and messages are correct')
    console.log('User 2: chess board is updated')
    await ChessBoardPage.verifyValuesInAPIandDatabase()

    console.log('Focus on window: User 1')
    await t.switchToWindow(initialWindow);
    await t.wait(1000)
    await ChessBoardPage.verifyMoveExists(getLocator.white_target_Verify())
    await ChessBoardPage.verifyValuesInAPIandDatabase()

})

test('Piece is not allowed to move: to a square where a king is placed', async t => {

    // player 1: C1 to D3
    console.log('User 1: perfroms drag and drop event ')
    await ChessBoardPage.performDragAndDropEvent(getLocator.whiteSourcePosition(), getLocator.whiteTargetPosition())
    console.log('User 1: Drag and drop event  is verified')
    await ChessBoardPage.verifyValuesInAPIandDatabase()

    console.log('Focus on window: User 2')
    await t.switchToWindow(window2);
    await ChessBoardPage.verifyPlayerDetails(2, true)
    await ChessBoardPage.verifyMoveExists(getLocator.whiteTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.whiteSourcePosition())
    console.log('User 2: screen details and messages are correct')
    console.log('User 2: chess board is updated')

    console.log('Focus on window: User 3')
    await t.switchToWindow(window3);
    await ChessBoardPage.verifyPlayerDetails(3, false)
    await ChessBoardPage.verifyMoveExists(getLocator.WhiteNewTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.whiteSourcePosition())
    console.log('User 3: screen details and messages are correct')
    console.log('User 3: chess board is updated')

    // player 2: G8 to E6
    console.log('Focus on window: User 2')
    await t.switchToWindow(window2);
    console.log('User 2: performs drag and drop')
    await ChessBoardPage.performDragAndDropEvent(getLocator.blackSourcePosition(), getLocator.blackTargetPosition())
    await t.wait(1000)
    await ChessBoardPage.verifyMoveExists(getLocator.blackNewTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.blackSourcePosition())
    await ChessBoardPage.verifyMessage1("It is your opponent's turn.")
    await ChessBoardPage.verifyMessage2("You play the black pieces.")
    console.log('User 2: screen details and messages are correct')
    console.log('User 2: chess board is updated')
    await ChessBoardPage.verifyValuesInAPIandDatabase()

    // player 1: D3 to D1
    console.log('Focus on window: User 1')
    await t.switchToWindow(initialWindow);
    await t.wait(1000)
    await ChessBoardPage.verifyPlayerDetails(1, true)
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.whiteSourcePosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.WhiteNewTargetPosition())
    await ChessBoardPage.verifyMoveExists(getLocator.blackNewTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.blackSourcePosition())
    await ChessBoardPage.verifyMoveExists(getLocator.WhiteNewTargetPosition2ndAttempt())
    console.log('User 1: screen details and messages are correct')
    console.log('User 1: chess board is updated')
    await t.dragToElement(getLocator.white_OldPeice_souce(), getLocator.white_OldPeice_target_King(), { speed: 0.01 })
    await t.wait(1000)
    await ChessBoardPage.verifyMoveExists(getLocator.white_OldPeice_souce())

    const response = await getSessionDetails();
    await t.expect(response.data.players.length).eql(2)
    await t.expect(response.data.moves.length).eql(2)
    var sessionId = response.data._id
    let DatabseQuery = { _id: sessionId }
    var queryResponse = await getQueryData(DatabseQuery)
    await t.expect(queryResponse.players.length).eql(2)
    await t.expect(queryResponse.moves.length).eql(2)
})

test('Piece is not allowed to move: to a square where own piece is placed', async t => {

    // player 1: C1 to D3
    console.log('User 1: perfroms drag and drop event ')
    await ChessBoardPage.performDragAndDropEvent(getLocator.whiteSourcePosition(), getLocator.whiteTargetPosition())
    console.log('User 1: Drag and drop event  is verified')
    await ChessBoardPage.verifyValuesInAPIandDatabase()

    console.log('Focus on window: User 2')
    await t.switchToWindow(window2);
    await ChessBoardPage.verifyPlayerDetails(2, true)
    await ChessBoardPage.verifyMoveExists(getLocator.whiteTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.whiteSourcePosition())
    console.log('User 2: screen details and messages are correct')
    console.log('User 2: chess board is updated')

    console.log('Focus on window: User 3')
    await t.switchToWindow(window3);
    await ChessBoardPage.verifyPlayerDetails(3, false)
    await ChessBoardPage.verifyMoveExists(getLocator.WhiteNewTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.whiteSourcePosition())
    console.log('User 3: screen details and messages are correct')
    console.log('User 3: chess board is updated')

    // player 2: G8 to E6
    console.log('Focus on window: User 2')
    await t.switchToWindow(window2);
    console.log('User 2: performs drag and drop')
    await ChessBoardPage.performDragAndDropEvent(getLocator.blackSourcePosition(), getLocator.blackTargetPosition())
    await t.wait(1000)
    await ChessBoardPage.verifyMoveExists(getLocator.blackNewTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.blackSourcePosition())
    await ChessBoardPage.verifyMessage1("It is your opponent's turn.")
    await ChessBoardPage.verifyMessage2("You play the black pieces.")
    console.log('User 2: screen details and messages are correct')
    console.log('User 2: chess board is updated')
    await ChessBoardPage.verifyValuesInAPIandDatabase()

    // player 1: D2 to D3
    console.log('Focus on window: User 1')
    await t.switchToWindow(initialWindow);
    await t.wait(1000)
    await ChessBoardPage.verifyPlayerDetails(1, true)
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.whiteSourcePosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.WhiteNewTargetPosition())
    await ChessBoardPage.verifyMoveExists(getLocator.blackNewTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.blackSourcePosition())
    await ChessBoardPage.verifyMoveExists(getLocator.WhiteNewTargetPosition2ndAttempt())
    console.log('User 1: screen details and messages are correct')
    console.log('User 1: chess board is updated')
    await t.dragToElement(getLocator.white_newPeice_souce(), getLocator.white_newPeice_target_existingPeice(), { speed: 0.01 })
    await t.wait(1000)
    await ChessBoardPage.verifyMoveExists(getLocator.white_newPeice_souce())

    const response = await getSessionDetails();
    await t.expect(response.data.players.length).eql(2)
    await t.expect(response.data.moves.length).eql(2)
    var sessionId = response.data._id
    let DatabseQuery = { _id: sessionId }
    var queryResponse = await getQueryData(DatabseQuery)
    await t.expect(queryResponse.players.length).eql(2)
    await t.expect(queryResponse.moves.length).eql(2)
})
