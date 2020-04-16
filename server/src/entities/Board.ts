import { Board as IBoard } from '@fastpoker/core'
import { Card } from './Card'

export const DEFAULT_BIG_BLIND = 100
export const BLIND_INCREASE_TIME = 300 * 1000 // => 5 min

export class Board implements IBoard {
  cards: Card[] = []
  pot = 0
  turnPlayerId = ''
  dealerPlayerId = ''
  bigBlind = DEFAULT_BIG_BLIND
  anti = 0
  showDown = false

  private blindIncreasedAt = Date.now()

  openCard() {
    this.cards.push(new Card())
    const now = Date.now()
    if (this.blindIncreasedAt + BLIND_INCREASE_TIME < now) {
      this.bigBlind += this.bigBlind
      this.blindIncreasedAt = now
    }
  }

  serialize() {
    const { pot, turnPlayerId, dealerPlayerId, bigBlind, anti, showDown } = this
    return {
      pot,
      turnPlayerId,
      dealerPlayerId,
      bigBlind,
      anti,
      showDown,
      cards: this.cards.map(c => c.serialize()),
    }
  }
}
