import { Selector, RequestLogger } from 'testcafe';
import locators from '../page-objects/components/locators';
import chessboardPage from '../page-objects/pages/chessboardPage';
import { getSessionDetails } from '../helpers'
import { getQueryData } from '../page-objects/components/mongoconnect'
import gloabal from '../global';

const GLOBAL = new gloabal()
const getLocator = new locators()
const ChessBoardPage = new chessboardPage()
var initialWindow, window2, window3 = null

fixture`Check if invlaid player can access board`
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

test('Player 1(WHITE) can not access BLACK peices on Player 2 turn', async t => {
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

    console.log('Focus on window: User 1')
    await t.switchToWindow(initialWindow);
    await ChessBoardPage.verifyPlayerDetails(1, false)
    console.log('User 1: perfroms drag and drop event ')
    await t.dragToElement(getLocator.whiteMovesBlackSource(), getLocator.whiteMovesBlackTarget(), { speed: 0.01 })
    await ChessBoardPage.verifyPlayerDetails(1, false)
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.blackNewTargetPosition())

    const response = await getSessionDetails();
    await t.expect(response.data.players.length).eql(2)
    await t.expect(response.data.moves.length).eql(1)
    var sessionId = response.data._id
    let DatabseQuery = { _id: sessionId }
    var queryResponse = await getQueryData(DatabseQuery)
    await t.expect(queryResponse.players.length).eql(2)
    await t.expect(queryResponse.moves.length).eql(1)
})

test('Player 1(WHITE) can not access BLACK peices on his turn', async t => {
    // player 1: C1 to D3
    console.log('User 1: perfroms drag and drop event ')
    await t.dragToElement(getLocator.whiteMovesBlackSource(), getLocator.whiteMovesBlackTarget(), { speed: 0.01 })
    await ChessBoardPage.verifyPlayerDetails(1, true)
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.blackNewTargetPosition())

    const response = await getSessionDetails();
    await t.expect(response.data.players.length).eql(2)
    await t.expect(response.data.moves.length).eql(0)
    var sessionId = response.data._id
    let DatabseQuery = { _id: sessionId }
    var queryResponse = await getQueryData(DatabseQuery)
    await t.expect(queryResponse.players.length).eql(2)
    await t.expect(queryResponse.moves.length).eql(0)
});


test.skip('Player 2 can access board on his turn', async t => {

})
test.skip('Player 3 can not access board on live game', async t => {

})

test.skip('Player 2 can not access board upon Player 1 Turn', async t => {

})
test.skip('Player 2 can not access board upon Player 1 Turn', async t => {

})

