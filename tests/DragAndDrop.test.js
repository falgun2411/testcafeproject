import { Selector, RequestLogger } from 'testcafe';
import locators from '../page-objects/components/locators';
import chessboardPage from '../page-objects/pages/chessboardPage';
import https from 'https';

const getLocator = new locators()
const ChessBoardPage = new chessboardPage()


// const executeRequest = () => {
//     return new Promise(resolve => {
//         const options = {
//             hostname: ' http://localhost:3000/api/lastsession',
//             path: '/',
//             method: 'GET'
//         };

//         const req = https.request(options, res => {
//             console.log('statusCode:', res.statusCode);
//             console.log('headers:', res.headers);

//             resolve();
//         });

//         req.on('error', e => {
//             console.error(e);
//         });

//         req.end();
//     });
// };

fixture`Check drag and drop`
    .page`http://localhost:8080/`
    .before(async t => {
        console.log('Before ALL')
    })
    .beforeEach(async t => {
        console.log('Before each test')
        await t.setTestSpeed(0.1)
        await t.setPageLoadTimeout(5000)
    })
    .after(async t => {
        console.log('After ALL')
    })
    .afterEach(async t => {
        console.log('After each test')
    })


test('Valid peices are accisable as per turn', async t => {
    const baseUrl = 'http://localhost:8080/'
    const initialWindow = await t.getCurrentWindow();
    await t.maximizeWindow()
    const window2 = await t.openWindow(baseUrl);
    const window3 = await t.openWindow(baseUrl);

    console.log('Focus on window: User 1')
    await t.switchToWindow(initialWindow);
    await ChessBoardPage.setUpEnv()

    console.log('Focus on window: User 2')
    await t.switchToWindow(window2);
    await ChessBoardPage.clickButton_join_a_game()
    await ChessBoardPage.verifyMessage1("It is your opponent's turn.")
    await ChessBoardPage.verifyMessage2("You play the black pieces.")

    console.log('Focus on window: User 3')
    await t.switchToWindow(window3);
    await ChessBoardPage.verifyButton_Quit_game()
    await ChessBoardPage.verifyMessage("The game has already started.")

    console.log('Focus on window: User 1')
    await t.switchToWindow(initialWindow);
    await ChessBoardPage.verifyButton_Quit_game()
    await ChessBoardPage.verifyMessage1("It's is your turn.")
    await ChessBoardPage.verifyMessage2("You play the white pieces.")

    // player 1: C1 to D3
    console.log('User 1: perfroms drag and drop event ')
    await ChessBoardPage.performDragAndDropEvent(getLocator.whiteSourcePosition(), getLocator.whiteTargetPosition())
    console.log('User 1: Drag and drop event  is verified')
    await ChessBoardPage.verifyValuesInAPIandDatabase()

    console.log('Focus on window: User 2')
    await t.switchToWindow(window2);
    await ChessBoardPage.verifyButton_Quit_game()
    await ChessBoardPage.verifyMessage1("It's is your turn.")
    await ChessBoardPage.verifyMessage2("You play the black pieces.")
    await ChessBoardPage.verifyMoveExists(getLocator.whiteTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.whiteSourcePosition())
    console.log('User 2: screen details and messages are correct')
    console.log('User 2: chess board is updated')

    console.log('Focus on window: User 3')
    await t.switchToWindow(window3);
    await ChessBoardPage.verifyButton_Quit_game()
    await ChessBoardPage.verifyMessage("The game has already started.")
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

    console.log('Focus on window: User 3')
    await t.switchToWindow(window3);
    await ChessBoardPage.verifyButton_Quit_game()
    await ChessBoardPage.verifyMessage("The game has already started.")
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
    await ChessBoardPage.verifyMessage1("It's is your turn.")
    await ChessBoardPage.verifyMessage2("You play the white pieces.")
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.whiteSourcePosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.WhiteNewTargetPosition())
    await ChessBoardPage.verifyMoveExists(getLocator.blackNewTargetPosition())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.blackSourcePosition())
    await ChessBoardPage.verifyMoveExists(getLocator.WhiteNewTargetPosition2ndAttempt())
    console.log('User 1: screen details and messages are correct')
    console.log('User 1: chess board is updated')
    await ChessBoardPage.performDragAndDropEvent(getLocator.whiteSourcePosition2(), getLocator.whiteTargetPosition2())
    await t.wait(1000)
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.whiteSourcePosition2())
    await ChessBoardPage.verifyValuesInAPIandDatabase()

    // Player 2: B8 to C6 
    console.log('Focus on window: User 2')
    await t.switchToWindow(window2);
    console.log('User 2: performs drag and drop')
    await ChessBoardPage.performDragAndDropEvent(getLocator.blackSourcePosition2(), getLocator.blackTargetPosition2())
    await t.wait(1000)
    await ChessBoardPage.verifyMoveExists(getLocator.blackNewTargetPosition2())
    await ChessBoardPage.verifyMoveDoesNotExists(getLocator.blackSourcePosition2())
    await ChessBoardPage.verifyMessage1("It is your opponent's turn.")
    await ChessBoardPage.verifyMessage2("You play the black pieces.")
    console.log('User 2: screen details and messages are correct')
    console.log('User 2: chess board is updated')
    await ChessBoardPage.verifyValuesInAPIandDatabase()

});

