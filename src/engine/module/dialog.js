import { delay } from '../util'

/**
 * I seem to have completely forgotten what this module is for
 * If I have to guess, it's for animated dialog sets:
 * "You stand up" -> delay 500ms ->
 * "You stretch your legs" -> delay 500ms ->
 * "You yawn as you make your way to the bathroom"
 * Unsure on how to implement this for now.
 */
export default class DialogModule {
    constructor() {
        window.dbg('DialogModule', 'Constructing')
        delay(() => window.dbg('DialogModule', 'Test call succesful'), 500)
    }
    /*
    startDialog(...dialogSet){

    }*/
}
