import { Selector } from 'testcafe';
import { getButtonText, createBaseTestSetup } from '../helpers'

fixture`AdditionalFunctionalCases:`
    .page`http://localhost:8080/`
    .before(async t => { })
    .beforeEach(async t => {
        console.log('Before each test')
        await t.setTestSpeed(0.1)
        await t.setPageLoadTimeout(5000) // maximum value 0
    })
    .after(async t => { })
    .afterEach(async t => { })


test.skip('Visiter user clicks on Quit game', async t => {
    // currently , system terminates the session for all users if third user clicks on Quit Game button
})
test.skip('Main user clicks on Quit game', async t => {
    // currently , system terminates the session for all users if third user clicks on Quit Game button
})
test.skip('Opponent user clicks on Quit game', async t => {
    // currently , system terminates the session for all users if third user clicks on Quit Game button
})

test.skip('Main user Refresh the Live session', async t => {
    // currently , system terminates the session for all users if third user clicks on Quit Game button
})
test.skip('Opponent user : Refresh the live session', async t => {
    // currently , system terminates the session for all users if third user clicks on Quit Game button
})


test.skip('Verify when the MainUser user quits the session', async t => {
    // currently , system terminates the session for all users if third user clicks on Quit Game button
})

test.skip('Verify when the MainUser user quits the session', async t => {
    // currently , system terminates the session for all users if third user clicks on Quit Game button
})
test.skip('Verify casting: E1 to A1', async t => {
})

test.skip('Verify casting: E1 to H1', async t => {
})

test.skip('Verify casting: E8 to H8', async t => {
})
test.skip('Verify casting: E8 to H8', async t => {
})

test.skip('Verify casting: After A1 is already moved once', async t => {
})

test.skip('Verify casting: After H1 is already moved once', async t => {
})

test.skip('Verify casting: After E1 is already moved once', async t => {
})

test.skip('Verify casting: After A8 is already moved once', async t => {
})

test.skip('Verify casting: After H8 is already moved once', async t => {
})

test.skip('Verify casting: After E8 is already moved once', async t => {
})


test.skip('Verify casting: After E8 is has been checked once', async t => {
})

test.skip('Verify casting: After E1 is has been checked once', async t => {
})


test.skip('Verify move direction: Knight', async t => {
    // can be for black and white
})


test.skip('Verify player can not move opponet peices', async t => {
})

test.skip('Verify player can not move peices in wrong place', async t => {
    // This will include all peices and their direction 
    // we can re verify after dragging and dropping if it is moved or not
})


test.skip('Verify valid move direction : Knight', async t => {
    // can be for black and white

    // But I require certain modification in the xpath locator or on the board 
    // Undo MOVE for option for test env - otherwise need to recreate board again each time

    // peiceCanMoveFromTo(A2 ,C1) 
    // peiceCanMoveFromTo(A2 ,C3)


})



test.skip('Verify valid move direction : Rook', async t => {
    // can be for black and white
})

test.skip('Verify valid move direction : Bishop', async t => {
    // can be for black and white
})

test.skip('Verify valid move direction : King', async t => {
    // can be for black and white
})

test.skip('Verify valid move direction : Queen', async t => {
    // can be for black and white
})

test.skip('Verify valid move direction : Pawn', async t => {
    //  Also check its working correctly after opponent's turn
    // can be for black and white
    //   Single move forward 
    //   double move forward
    //   move forward is Stopped as there is piece in front of it
    //   move cross
    //    Also at the end of black line - PAWN can create the valid (QUEEN-ROOK-Bishop-Knight)
})

test.skip('Verify casting rules ', async t => {
    //     The castling must be kingside or queenside.
    // Neither the king nor the chosen rook has previously moved.
    // There are no pieces between the king and the chosen rook.
    // The king is not currently in check.
    // The king does not pass through a square that is attacked by an enemy piece.
    // The king does not end up in check. (True of any legal move.)

})


test.skip('Verify captures rules ', async t => {
    //  for each peice        
})


test.skip('White to black: Verify move : check', async t => {
    // can also check this condition with different peceis
    //  like check with pawn - queen ...
})

test.skip('Black to White: Verify move : check', async t => {
    // can also check this condition with different peceis 
})


test.skip('Black to White: Verify move : check mate', async t => {
    // can also check this condition with different peceis 
})

test.skip('White to black: Verify move : check mate', async t => {
    // can also check this condition with different peceis  
})

test.skip('White player quits game: on his turn', async t => {
})

test.skip('White player quits game: Not on his turn', async t => {
})


test.skip('White player turn: server connection lost', async t => {
})

test.skip('black player turn: server connection lost', async t => {
})

test.skip('White player quits game: connection lost from server', async t => {
})

test.skip('Black player quits game: connection lost from server', async t => {
})

test.skip('Black player quits game: on his turn', async t => {
})

test.skip('Black player quits game: Not on his turn', async t => {
})



test.skip('Verify time over for : White', async t => {
    // It is not applicable for this test suite
})
test.skip('Verify time over for : Black', async t => {
    // It is not applicable for this test suite
})


test.skip('Verify time over for : White', async t => {
    // It is not applicable for this test suite
})
test.skip('Verify time over for : Black', async t => {
    // It is not applicable for this test suite
})