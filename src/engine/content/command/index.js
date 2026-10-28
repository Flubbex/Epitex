import baseCommandConstructor from './base'
import playerCommandConstructor from './player'
import buildCommandConstructor from './building'
import debugCommandConstructor from './debug'
import garbageCommandConstructor from './garbage'

const commandConstructor = (API) => {
    return {
        ...baseCommandConstructor(API),
        ...playerCommandConstructor(API),
        ...buildCommandConstructor(API),
        ...debugCommandConstructor(API),
        ...garbageCommandConstructor(API),
    }
}

export default commandConstructor
