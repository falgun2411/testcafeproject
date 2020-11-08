import { Selector } from 'testcafe';
import { verifyPiecesExistInRow, verifyPiecesNotExistInRow } from '../helpers'
import chessboardPage from '../page-objects/pages/chessboardPage';
import configData from "../configuration.json";
import global from '../global'
import gloabal from '../global';

const GLOABAL = new gloabal()
const ChessBoardPage = new chessboardPage()

fixture`Check the intial board`
    .page`http://localhost:8080/`
    .before(async t => {
        console.log('Before ALL')
    })
    .beforeEach(async t => {
        console.log('Before each test')
        await t.setTestSpeed(0.1)
        await t.setPageLoadTimeout(5000) // maximum value 0
    })
    .after(async t => {
        console.log('After ALL')
    })
    .afterEach(async t => {
        console.log('After each test')
        console.log('===================================================')
    })

test('Check chess board peices are set up correctly on match start', async t => {
    const button = Selector('button')
    const message = Selector("span")
    const message1 = Selector("span:nth-child(1)")
    const message2 = Selector("span:nth-child(2)")
    const baseUrl = GLOABAL.BASE_URL

    const initialWindow = await t.getCurrentWindow();
    await t.maximizeWindow()
    const window2 = await t.openWindow(baseUrl);
    const window3 = await t.openWindow(baseUrl);

    console.log('Focus on window: User 1')
    await t.switchToWindow(initialWindow);
    var buttonText = await button.innerText;
    if (buttonText != 'Start new game') {
        console.log('clicking button:' + buttonText)
        await t.click(button())
    }
    await t.wait(1000)
    buttonText = await button.innerText;
    await t.expect(buttonText).eql('Start new game')
    await t.click(button())
    console.log('button  clicked: Start new game')
    var expectedMessage = await message.innerText;
    await t.expect(expectedMessage).eql('Wait for opponent to join.')
    buttonText = await button.innerText;
    await t.expect(buttonText).eql('Quit game')

    console.log('Focus on window: User 2')
    await t.switchToWindow(window2);
    buttonText = await button.innerText;
    await t.expect(buttonText).eql('Join a game')
    await t.click(button())
    console.log('button clicked : Join a game')
    await ChessBoardPage.verifyPlayerDetails(2, false)

    console.log('Focus on window: User 3')
    await t.switchToWindow(window3);
    await ChessBoardPage.verifyPlayerDetails(3, false)


    console.log('Focus on window: User 1')
    await t.switchToWindow(initialWindow);
    await ChessBoardPage.verifyPlayerDetails(1, true)

    // checking pices are located correctly
    // User 1 verification
    await verifyPiecesExistInRow('1')
    await verifyPiecesExistInRow('2')
    await verifyPiecesExistInRow('7')
    await verifyPiecesExistInRow('8')
    await verifyPiecesNotExistInRow('3')
    await verifyPiecesNotExistInRow('4')
    await verifyPiecesNotExistInRow('5')
    await verifyPiecesNotExistInRow('6')

    //  user 2 verification
    console.log('Focus on window: User 2')
    await t.switchToWindow(window2);
    await ChessBoardPage.verifyPlayerDetails(2, false)
    await verifyPiecesExistInRow('1')
    await verifyPiecesExistInRow('2')
    await verifyPiecesExistInRow('7')
    await verifyPiecesExistInRow('8')
    await verifyPiecesNotExistInRow('3')
    await verifyPiecesNotExistInRow('4')
    await verifyPiecesNotExistInRow('5')
    await verifyPiecesNotExistInRow('6')

    //  user 3 verification
    console.log('Focus on window: User 3')
    await t.switchToWindow(window3);
    await ChessBoardPage.verifyPlayerDetails(3, false)
    await verifyPiecesExistInRow('1')
    await verifyPiecesExistInRow('2')
    await verifyPiecesExistInRow('7')
    await verifyPiecesExistInRow('8')
    await verifyPiecesNotExistInRow('3')
    await verifyPiecesNotExistInRow('4')
    await verifyPiecesNotExistInRow('5')
    await verifyPiecesNotExistInRow('6')
});
