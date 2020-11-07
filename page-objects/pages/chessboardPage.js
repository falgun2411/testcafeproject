import { Selector, t } from 'testcafe';
import locators from '../components/locators';
import { verifyValueAndType } from '../../helpers'
import { getQueryData } from '../components/mongoconnect';
import { getSessionDetails } from '../../helpers'


const getLocator = new locators()

class chessBoardPage {

    constructor() {

    }

    async setUpEnv() {
        var buttonText = await getLocator.button.innerText;
        if (buttonText != 'Start new game') {
            await t.click(getLocator.button())
        }
        await t.wait(1000)
        await this.clickButton_start_new_game()
        await this.verifyMessage('Wait for opponent to join.')
        await this.verifyButton_Quit_game()
    }

    async clickButton_start_new_game() {
        var buttonText = await getLocator.button.innerText;
        await t.expect(buttonText).eql('Start new game')
        await t.click(getLocator.button())
        console.log('button clicked : Start new game')
    }

    async clickButton_join_a_game() {
        var buttonText = await getLocator.button.innerText;
        await t.expect(buttonText).eql('Join a game')
        await t.click(getLocator.button())
        console.log('button clicked : Join a game')
    }

    async verifyMessage1(messageText) {
        var expectedMessage = await getLocator.message1.innerText;
        await t.expect(expectedMessage).eql(messageText)

    }
    async verifyButton_Quit_game() {
        var buttonText = await getLocator.button.innerText;
        await t.expect(buttonText).eql('Quit game')

    }
    async verifyMessage(messageText) {
        var expectedMessage = await getLocator.message.innerText;
        await t.expect(expectedMessage).eql(messageText)

    }
    async verifyMessage2(messageText) {
        var expectedMessage = await getLocator.message2.innerText;
        await t.expect(expectedMessage).eql(messageText)
    }

    async performDragAndDropEvent(from, to) {
        await t.dragToElement(from, to, { speed: 0.01 })
        await this.verifyMoveExists(to)
        await this.verifyMoveDoesNotExists(from)
    }


    async verifyPlayerDetails(playerNumber, isPlayerTurn) {

        switch (playerNumber) {
            case 1:
                if (isPlayerTurn) {
                    await this.verifyButton_Quit_game()
                    await this.verifyMessage1("It's is your turn.")
                    await this.verifyMessage2("You play the white pieces.")
                } else {
                    await this.verifyButton_Quit_game()
                    await this.verifyMessage1("It is your opponent's turn.")
                    await this.verifyMessage2("You play the white pieces.")
                }

                break;
            case 2:
                if (isPlayerTurn) {
                    await this.verifyButton_Quit_game()
                    await this.verifyMessage1("It's is your turn.")
                    await this.verifyMessage2("You play the black pieces.")
                } else {
                    await this.verifyButton_Quit_game()
                    await this.verifyMessage1("It is your opponent's turn.")
                    await this.verifyMessage2("You play the black pieces.")
                }
                break;
            case 3:
                await this.verifyButton_Quit_game()
                await this.verifyMessage("The game has already started.")
                break;
        }
    }

    async verifyMoveExists(path) {
        await t.expect(path.exists).ok()
    }
    async verifyMoveDoesNotExists(path) {
        await t.expect(path.exists).notOk()
    }

    async verifyValuesInAPIandDatabase() {

        const response = await getSessionDetails()
        var sessionId = response.data._id
        let DatabseQuery = { _id: sessionId }
        var queryResponse = await getQueryData(DatabseQuery)
        await this.verifyRestAPIresponseWithDatabase(queryResponse, response.data)
    }

    async verifyRestAPIresponseWithDatabase(actual, expected) {
        var actualData = actual
        var expectedData = expected

        if (expectedData != '' && actualData != '') {
            if (expectedData._id != '' && actualData != '') {
                await verifyValueAndType(actualData._id, actualData._id)
            }
            if (expectedData.pending != '' && actualData.pending != '') {
                await verifyValueAndType(actualData._id, actualData._id)
            }
            if (expectedData.updated_at != '' && actualData.updated_at != '') {
                await verifyValueAndType(actualData._id, actualData._id)
            }
            if (expectedData.started != '' && actualData.started != '') {
                await verifyValueAndType(actualData._id, actualData._id)
            }
            if (expectedData.started_at != '' && actualData.started_at != '') {
                await verifyValueAndType(actualData._id, actualData._id)
            }

            if (actualData.players.length == expectedData.players.length && expectedData.players.length > 0) {
                for (var i = 0; i < actualData.players.length; i++) {
                    var player = actualData.players[i]
                    var playerdb = expectedData.players[i]
                    var timestamp = player.timestamp
                    var timestampdb = playerdb.timestamp
                    await verifyValueAndType(playerdb._player_id, player._player_id)
                    await verifyValueAndType(timestampdb, timestamp)
                    await verifyValueAndType(playerdb.color, player.color)
                }
            }

            if (actualData.moves.length == expectedData.moves.length && actualData.moves.length > 0) {
                for (var i = 0; i < actualData.moves.length; i++) {
                    var movesData = actualData.moves[i]
                    var movesDataDB = expectedData.moves[i]
                    var timestamp = movesData.timestamp
                    var timestampdb = movesDataDB.timestamp

                    await verifyValueAndType(movesDataDB._player_id, movesData._player_id)
                    await verifyValueAndType(timestampdb, timestamp)
                    await verifyValueAndType(movesDataDB.from, movesData.from)
                    await verifyValueAndType(movesDataDB.to, movesData.to)
                }
            }
        }
    }
}

export default chessBoardPage