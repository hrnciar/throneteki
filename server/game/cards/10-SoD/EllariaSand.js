const DrawCard = require('../../drawcard.js');

class EllariaSand extends DrawCard {
    setupCardAbilities() {
        this.reaction({
            when: {
                onAttackersDeclared: event => event.challenge.isAttacking(this)
            },
            target: {
                mode: 'upTo',
                numCards: 3,
                cardCondition: card => card.location === 'play area' && card.getType() === 'character' &&
                                       card.controller === this.game.currentChallenge.defendingPlayer
            },
            handler: context => {
                this.untilEndOfChallenge(ability => ({
                    match: card => context.target.includes(card),
                    targetController: 'any',
                    effect: ability.effects.mustBeDeclaredAsDefender()
                }));

                this.game.addMessage('{0} uses {1} to force {2} to be declared as a defender this challenge, if able',
                    context.player, this, context.target);
            }
        });
    }
}

EllariaSand.code = '10002';

module.exports = EllariaSand;
