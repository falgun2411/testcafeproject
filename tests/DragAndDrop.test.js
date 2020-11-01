import { Selector } from 'testcafe';
import { getButtonText, createBaseTestSetup, verifyPiecesNotExistInRow } from '../helpers'

fixture`Check drag and drop`
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
    })


// Case summary:
// 1. Open windows for Main user - opponent - visitor
// 2. Check page details for Main user - opponent - visitor
// 3. Main User starts the game 
// 4. opponent user joins the game
// 5. Check page details for Main user - opponent - visitor
// 6. Main user makes valid move 
// 7. Check chess board is updated Main user - opponent - visitor
// 8. opponent user makes valid move 
// 9. Check chess board is updated Main user - opponent - visitor


test('Valid peices are accisable as per turn', async t => {
    const button = Selector('button')
    const whiteSourcePosition = Selector("div[data-col='c'][data-row='1'][draggable='true']");
    const whiteTargetPosition = Selector("div.chessboard-field:nth-child(44)");
    const WhiteNewTargetPosition = Selector("div[data-col='d'][data-row='3'][draggable='false']")
    const WhiteNewTargetPosition2ndAttempt = Selector("div[data-col='d'][data-row='3'][draggable='true']")
    const blackSourcePosition = Selector("div[data-col='g'][data-row='8'][draggable='true']");
    const blackTargetPosition = Selector("div.chessboard-field:nth-child(21)");
    const blackNewTargetPosition = Selector("div[data-col='e'][data-row='6'][draggable='false']")

    const message = Selector("span")
    const message1 = Selector("span:nth-child(1)")
    const message2 = Selector("span:nth-child(2)")

    const baseUrl = 'http://localhost:8080/'

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
    expectedMessage = await message1.innerText;
    await t.expect(expectedMessage).eql("It is your opponent's turn.")
    expectedMessage = await message2.innerText;
    await t.expect(expectedMessage).eql("You play the black pieces.")

    console.log('Focus on window: User 3')
    await t.switchToWindow(window3);
    buttonText = await button.innerText;
    await t.expect(buttonText).eql('Quit game')
    expectedMessage = await message1.innerText;
    await t.expect(expectedMessage).eql("The game has already started.")


    //  actual case starts
    console.log('Focus on window: User 1')
    await t.switchToWindow(initialWindow);
    buttonText = await button.innerText;
    await t.expect(buttonText).eql('Quit game')
    expectedMessage = await message1.innerText;
    await t.expect(expectedMessage).eql("It's is your turn.")
    expectedMessage = await message2.innerText;
    await t.expect(expectedMessage).eql("You play the white pieces.")
    console.log('User 1: Page details are verified')
    // User 1 plays white Knight to D3
    console.log('User 1: perfroms drag and drop event ')
    await t.dragToElement(whiteSourcePosition, whiteTargetPosition, { speed: 0.01 })
        .expect(whiteTargetPosition.getStyleProperty('background-color')).eql('rgb(254, 206, 158)');

    // User 1 verification
    var verifyTheMove = await WhiteNewTargetPosition.exists;
    await t.expect(verifyTheMove).ok()
    await t.expect(whiteSourcePosition.exists).notOk()
    console.log('User 1: Drag and drop event  is verified')

    //  user 2 verification
    console.log('Focus on window: User 2')
    await t.switchToWindow(window2);
    buttonText = await button.innerText;
    await t.expect(buttonText).eql('Quit game')
    expectedMessage = await message1.innerText;
    await t.expect(expectedMessage).eql("It's is your turn.")
    expectedMessage = await message2.innerText;
    await t.expect(expectedMessage).eql("You play the black pieces.")
    verifyTheMove = await WhiteNewTargetPosition.exists;
    await t.expect(verifyTheMove).ok()
    await t.expect(whiteSourcePosition.exists).notOk()
    console.log('User 2: screen details and messages are correct')
    console.log('User 2: chess board is updated')

    //  user 3 verification
    console.log('Focus on window: User 3')
    await t.switchToWindow(window3);
    buttonText = await button.innerText;
    // await t.expect(buttonText5).eql('Quit game')  System should not allow to quit game option for this user
    expectedMessage = await message.innerText;
    await t.expect(expectedMessage).eql("The game has already started.")
    verifyTheMove = await WhiteNewTargetPosition.exists;
    await t.expect(verifyTheMove).ok()
    await t.expect(whiteSourcePosition.exists).notOk()
    console.log('User 3: screen details and messages are correct')
    console.log('User 3: chess board is updated')

    // focus on User 2 
    // User 2 plays white Knight to E6
    console.log('Focus on window: User 2')
    await t.switchToWindow(window2);
    console.log('User 2: performs drag and drop')
    await t.dragToElement(blackSourcePosition, blackTargetPosition, { speed: 0.01 })
        .expect(blackTargetPosition.getStyleProperty('background-color')).eql('rgb(254, 206, 158)');
    await t.wait(1000)
    verifyTheMove = await blackNewTargetPosition.exists;
    await t.expect(verifyTheMove).ok()
    await t.expect(blackSourcePosition.exists).notOk()
    expectedMessage = await message1.innerText;
    await t.expect(expectedMessage).eql("It is your opponent's turn.")
    expectedMessage = await message2.innerText;
    await t.expect(expectedMessage).eql("You play the black pieces.")
    console.log('User 2: screen details and messages are correct')
    console.log('User 2: chess board is updated')

    //  user 3 verification
    console.log('Focus on window: User 3')
    await t.switchToWindow(window3);
    buttonText = await button.innerText;
    // await t.expect(buttonText5).eql('Quit game')  System should not allow to quit game option for this user
    expectedMessage = await message.innerText;
    await t.expect(expectedMessage).eql("The game has already started.")
    verifyTheMove = await WhiteNewTargetPosition.exists;
    await t.expect(verifyTheMove).ok()
    await t.expect(whiteSourcePosition.exists).notOk()
    verifyTheMove = await blackNewTargetPosition.exists;
    await t.expect(verifyTheMove).ok()
    await t.expect(blackSourcePosition.exists).notOk()
    console.log('User 3: screen details and messages are correct')
    console.log('User 3: chess board is updated')


    //  user 1 verification
    console.log('Focus on window: User 1')
    await t.switchToWindow(initialWindow);
    await t.wait(1000)
    expectedMessage = await message1.innerText;
    await t.expect(expectedMessage).eql("It's is your turn.")
    expectedMessage = await message2.innerText;
    await t.expect(expectedMessage).eql("You play the white pieces.")
    verifyTheMove = await blackNewTargetPosition.exists;
    await t.expect(verifyTheMove).ok()
    await t.expect(blackSourcePosition.exists).notOk()
    verifyTheMove = await WhiteNewTargetPosition.exists;
    // verifying now upon white players peices is not dragaable
    await t.expect(verifyTheMove).notOk()
    await t.expect(whiteSourcePosition.exists).notOk()
    // verifying now upon white players turn he can move the peace
    verifyTheMove = await WhiteNewTargetPosition2ndAttempt.exists;
    await t.expect(verifyTheMove).ok()
    console.log('User 1: screen details and messages are correct')
    console.log('User 1: chess board is updated')
    // further we can also make a play for white and then again same for black  

});

