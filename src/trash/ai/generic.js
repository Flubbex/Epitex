const genericAi = (game, ent) => {
    if (Math.random() < 0.05)
        game.print(ent.name + ' ' + (ent.idleMessage || 'scratches his butt'))
}

export default genericAi
