const DrawCard = require('../../drawcard.js');

class TheSevenPointedStar extends DrawCard {
    setupCardAbilities(ability) {
        this.whileAttached({
            effect: [
                ability.effects.addTrait('The Seven')
            ]
        });
        this.action({
            title: 'Reduce The Seven character',
            phase: 'marshalling',
            cost: ability.costs.kneelParent(),
            handler: context => {
                this.untilEndOfPhase(ability => ({
                    targetType: 'player',
                    effect: ability.effects.reduceNextMarshalledCardCost(
                        2,
                        card => card.getType() === 'character' && card.hasTrait('The Seven')
                    )
                }));

                this.game.addMessage('{0} kneels {1} to reduce the next The Seven character they marshal this phase by 2',
                    context.player, this.parent);
            }
        });
    }
}

TheSevenPointedStar.code = '08119';

module.exports = TheSevenPointedStar;
