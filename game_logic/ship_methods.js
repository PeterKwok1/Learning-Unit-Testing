export function checkForShip(player, coordinates) {
    let shipPresent, ship

    for (let i = 0; i < player.ships.length; i++) {
        ship = player.ships[i]

        shipPresent = ship.location.filter((actualCoordinate) => {
            return (actualCoordinate[0] === coordinates[0]) && (actualCoordinate[1] === coordinates[1])
        })[0]

        if (shipPresent) {
            return ship
        }
    }

    return false
}

export function damageShip(ship, coordinates) {
    ship.damage.push(coordinates)
}

export function fire(player, coordinates) {
    const ship = checkForShip(player, coordinates)

    if (ship) {
        damageShip(ship, coordinates)
    }
}