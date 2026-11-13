/**Represents a container for any active battle.
 * @constructor
 * @param {any} state - The current state of the battle container
 */
class BattleModel {
    target = null

    constructor(state = {}) {
        this.target = state.target ?? this.target
    }
}

export default BattleModel
