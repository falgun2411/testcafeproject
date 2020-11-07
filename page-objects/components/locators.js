import { Selector, t } from 'testcafe';

class locators {

    constructor() {
        this.button = Selector('button')
        this.TestSourcePosition = Selector("div[data-col='c'][data-row='1'][draggable='true']");
        this.TestTargetPosition = Selector("div[data-col='d'][data-row='3']");

        this.whiteSourcePosition = Selector("div[data-col='c'][data-row='1'][draggable='true'] img:nth-child(1)");
        this.whiteTargetPosition = Selector("div.chessboard-field:nth-child(44)");
        this.WhiteNewTargetPosition = Selector("div[data-col='d'][data-row='3'][draggable='false']")
        this.WhiteNewTargetPosition2ndAttempt = Selector("div[data-col='d'][data-row='3'][draggable='true']")

        this.whiteSourcePosition2 = Selector("div[data-col='g'][data-row='1'][draggable='true'] img:nth-child(1)");
        this.whiteTargetPosition2 = Selector("div.chessboard-field:nth-child(46)");
        this.WhiteNewTargetPosition2 = Selector("div[data-col='f'][data-row='3'][draggable='false']")
        this.WhiteNewTargetPosition2ndAttempt2 = Selector("div[data-col='f'][data-row='3'][draggable='true']")

        this.blackSourcePosition = Selector("div[data-col='g'][data-row='8'][draggable='true']");
        this.blackTargetPosition = Selector("div.chessboard-field:nth-child(21)");
        this.blackNewTargetPosition = Selector("div[data-col='e'][data-row='6'][draggable='false']")

        this.blackSourcePosition2 = Selector("div[data-col='b'][data-row='8'][draggable='true']");
        this.blackTargetPosition2 = Selector("div.chessboard-field:nth-child(19)");
        this.blackNewTargetPosition2 = Selector("div[data-col='c'][data-row='6'][draggable='false']")

        this.message = Selector("span")
        this.message1 = Selector("span:nth-child(1)")
        this.message2 = Selector("span:nth-child(2)")
    }
}

export default locators