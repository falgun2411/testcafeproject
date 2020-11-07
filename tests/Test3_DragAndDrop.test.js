import { Selector, RequestLogger } from 'testcafe';
import locators from '../page-objects/components/locators';
import chessboardPage from '../page-objects/pages/chessboardPage';
import https from 'https';
import global from '../global'
import gloabal from '../global';

const GLOBAL = new gloabal()
const getLocator = new locators()
const ChessBoardPage = new chessboardPage()
var initialWindow, window2, window3 = null

fixture`Check drag and drop`
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


test('Valid peices are accisable as per turn', async t => {

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
    await ChessBoardPage.verifyPlayerDetails(2, true)
    await ChessBoardPage.performDragAndDropEvent(getLocator.blackSourcePosition(), getLocator.blackTargetPosition())
    await t.wait(1000)
    await ChessBoardPage.verifyMoveExists(getLocator.blackNewTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.blackSourcePosition())
    await ChessBoardPage.verifyPlayerDetails(2, false)
    console.log('User 2: screen details and messages are correct')
    console.log('User 2: chess board is updated')
    await ChessBoardPage.verifyValuesInAPIandDatabase()

    console.log('Focus on window: User 3')
    await t.switchToWindow(window3);
    await ChessBoardPage.verifyPlayerDetails(3, false)
    await ChessBoardPage.verifyMoveExists(getLocator.WhiteNewTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.whiteSourcePosition())
    await ChessBoardPage.verifyMoveExists(getLocator.blackNewTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.blackSourcePosition())
    console.log('User 3: screen details and messages are correct')
    console.log('User 3: chess board is updated')

    // player1: G1 to F3
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
    await ChessBoardPage.performDragAndDropEvent(getLocator.whiteSourcePosition2(), getLocator.whiteTargetPosition2())
    await t.wait(1000)
    await ChessBoardPage.verifyPlayerDetails(1, false)
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.whiteSourcePosition2())
    await ChessBoardPage.verifyValuesInAPIandDatabase()

    // Player 2: B8 to C6 
    console.log('Focus on window: User 2')
    await t.switchToWindow(window2);
    console.log('User 2: performs drag and drop')
    await ChessBoardPage.verifyPlayerDetails(2, true)
    await ChessBoardPage.performDragAndDropEvent(getLocator.blackSourcePosition2(), getLocator.blackTargetPosition2())
    await t.wait(1000)
    await ChessBoardPage.verifyMoveExists(getLocator.blackNewTargetPosition2())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.blackSourcePosition2())
    await ChessBoardPage.verifyPlayerDetails(2, false)
    console.log('User 2: screen details and messages are correct')
    console.log('User 2: chess board is updated')
    await ChessBoardPage.verifyValuesInAPIandDatabase()


    console.log('Focus on window: User 3')
    await t.switchToWindow(window3);
    await ChessBoardPage.verifyPlayerDetails(3, false)
    await ChessBoardPage.verifyMoveExists(getLocator.blackNewTargetPosition2())
    await ChessBoardPage.verifyMoveExists(getLocator.blackNewTargetPosition())
    await ChessBoardPage.verifyMoveExists(getLocator.WhiteNewTargetPosition2ndAttempt())
    await ChessBoardPage.verifyMoveExists(getLocator.WhiteNewTargetPosition2ndAttempt2())

    console.log('Focus on window: User 1')
    await t.switchToWindow(initialWindow);
    await t.wait(1000)
    await ChessBoardPage.verifyPlayerDetails(1, true)
    await ChessBoardPage.verifyMoveExists(getLocator.blackNewTargetPosition2())
    await ChessBoardPage.verifyMoveExists(getLocator.blackNewTargetPosition())
    await ChessBoardPage.verifyMoveExists(getLocator.WhiteNewTargetPosition2ndAttempt())
    await ChessBoardPage.verifyMoveExists(getLocator.WhiteNewTargetPosition2ndAttempt2())


});

