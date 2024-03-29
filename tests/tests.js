import { expect } from 'chai'
import { checkForShip, damageShip, fire } from '../game_logic/ship_methods.js'

// Mocha --reporter flag changes the reporter style. --reporter min abbreviates the passing tests and shows the failing ones. --reporter markdown gives you markdown which you can use as documentation. 

// omitting the callback from describe or it makes it a pending test, tests which have not been written yet, useful for outlining your tests. 

// mocha --watch does not currently support es module test files. 

// stubs allow you to test components even if other components aren't funcitonal. They replace another component during testing. for instance, you may not know how a player will input params, but you know what you will recieve and wish to test the function. 
// for instance, declaring a function which returns a set value and a state beforeEach() test. 

// passing and executing done() will signal to mocha that this is an asynchronous test. otherwise, the tests will be evaluated synchronously. 

// Test suite
describe('Mocha', () => {
    // Test spec (unit test)
    it('should run our tests using npm', () => {
        expect(true).to.be.ok
    })
})

describe('checkForShip', () => {
    let player // Setup phase, before
    before(() => {
        player = {
            ships: [
                {
                    location: [[0, 0], [0, 1]],
                },
                {
                    location: [[1, 0], [1, 1]]
                },
                {
                    location: [[2, 0], [2, 1], [2, 2], [2, 3]]
                }
            ]
        }
    })

    it('should correctly report no ship at a given player\'s coorindates', () => {
        expect(checkForShip(player, [9, 9])).to.be.false
    })

    it('should correctly report a ship at a given player\'s coorindates', () => {
        expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0])
    })

    it('should handle ships at more than one coorindate', () => {
        expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0])
        expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0])
        expect(checkForShip(player, [9, 9])).to.be.false
    })

    it('should handle multiple ships', () => {
        expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0])
        expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0])
        expect(checkForShip(player, [1, 0])).to.deep.equal(player.ships[1])
        expect(checkForShip(player, [1, 1])).to.deep.equal(player.ships[1])
        expect(checkForShip(player, [2, 3])).to.deep.equal(player.ships[2])
        expect(checkForShip(player, [9, 9])).to.be.false
    })
})

describe('damageShip', () => {
    it('should register damage on a given ship at a given location', () => {
        const ship = {
            location: [[0, 0]],
            damage: []
        }
        damageShip(ship, [0, 0])

        expect(ship.damage).to.not.be.empty
        expect(ship.damage[0]).to.deep.equal([0, 0]) // js arrays are distinct objects and not equal even if they have the same values. 
    })
})

describe('fire', () => {
    let player
    beforeEach(() => { // because fire() mutates state, running it repeatedly will invalidate further tests. so, we reset state before each test. 
        player = {
            ships: [
                {
                    location: [[0, 0]],
                    damage: []
                }
            ]
        }
    })

    after(() => { // setup phase, after (teardown). remove databases, etc. after tests to prevent pollution
        console.log('entire test suite completed')
    })

    afterEach(() => {
        console.log('one unit test completed')
    })

    it('should record damage on the given players ship at a given coorindate', () => {
        fire(player, [0, 0])

        expect(player.ships[0].damage[0]).to.deep.equal([0, 0])
    })

    it('should not record damage if there is no ship at my coordinates', () => {
        const player = {
            ships: [
                {
                    location: [[0, 0]],
                    damage: []
                }
            ]
        }

        fire(player, [0, 9])

        expect(player.ships[0].damage).to.be.empty
    })
})

