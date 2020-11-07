import { Selector, t } from 'testcafe';

class locators {

    constructor() {
        this.button = Selector('button')
        this.TestSourcePosition = Selector("div[data-col='c'][data-row='1'][draggable='true']");
        this.TestTargetPosition = Selector("div[data-col='d'][data-row='3']");

        this.whiteSourcePosition = Selector("div[data-col='c'][data-row='1'][draggable='true'] img:nth-child(1)");
        this.whiteTargetPosition = Selector("div.chessboard-field:nth-child(44)");
        this.WhiteNewTargetPosition = Selector("div[data-col='d'][data-row='3'][draggable='false']")
        this.WhiteNewTargetPosition2ndAttempt = Selector("div[data-col='d'][data-row='3']")

        this.whiteSourcePosition2 = Selector("div[data-col='g'][data-row='1'][draggable='true'] img:nth-child(1)");
        this.whiteTargetPosition2 = Selector("div.chessboard-field:nth-child(46)");
        this.WhiteNewTargetPosition2 = Selector("div[data-col='f'][data-row='3'][draggable='false']")
        this.WhiteNewTargetPosition2ndAttempt2 = Selector("div[data-col='f'][data-row='3']")

        this.blackSourcePosition = Selector("div[data-col='g'][data-row='8'][draggable='true']");
        this.blackTargetPosition = Selector("div.chessboard-field:nth-child(21)");
        this.blackNewTargetPosition = Selector("div[data-col='e'][data-row='6']")

        this.blackSourcePosition2 = Selector("div[data-col='b'][data-row='8'][draggable='true']");
        this.blackTargetPosition2 = Selector("div.chessboard-field:nth-child(19)");
        this.blackNewTargetPosition2 = Selector("div[data-col='c'][data-row='6']")

        this.message = Selector("span")
        this.message1 = Selector("span:nth-child(1)")
        this.message2 = Selector("span:nth-child(2)")

        this.whiteMovesBlackSource = Selector("div[data-col='g'][data-row='8']");
        this.whiteMovesBlackTarget = Selector("div.chessboard-field:nth-child(21)");

        this.white_newPeice_souce = Selector("div[data-col='d'][data-row='2'][draggable='true'] img:nth-child(1)");
        this.white_newPeice_target_existingPeice = Selector("div[data-col='d'][data-row='3']")
        this.white_OldPeice_souce = Selector("div[data-col='d'][data-row='3'][draggable='true'] img:nth-child(1)");
        this.white_OldPeice_target_King = Selector("div[data-col='d'][data-row='1']")

        this.white_target_opponentKnight = Selector("div[data-col='b'][data-row='8']");
        this.white_target_Verify = Selector("div[data-col='b'][data-row='8'][draggable='true'] img:nth-child(1)");

        this.white_continueAttempt_souce = Selector("div[data-col='g'][data-row='1'] img:nth-child(1)");
        this.white_continueAttempt_target = Selector("div.chessboard-field:nth-child(46)");

        this.black_continueAttempt_souce = Selector("div[data-col='b'][data-row='8'] img:nth-child(1)");
        this.black_continueAttempt_target = Selector("div.chessboard-field:nth-child(19)");
    }
}

export default locators