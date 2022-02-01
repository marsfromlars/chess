/**
 * Parser and formatter for algebraic chess notation
 * 
 * @see https://en.wikipedia.org/wiki/Algebraic_notation_(chess)
 * 
 */
class Notation {

  REGEX = new RegExp( '(([RNBQKP])?([a-h][1-8])?(x)?([a-h][1-8])|(O-O-O)|(O-O))([+#])?' )

  counter = 1

  FROM_TO = this.counter++
  PIECE = this.counter++
  POS1 = this.counter++
  CAPTURE = this.counter++
  POS2 = this.counter++
  LONG_CASTLE = this.counter++
  SHORT_CASTLE = this.counter++
  CHECK_MATE = this.counter++

  parseMove( notation ) {
    let parsed = notation.match( this.REGEX )
    if( parsed == null ) {
      throw 'Invalid move "' + notation + '"'
    }
    else {
      let move = new Move()
      
      if( parsed[ this.PIECE ] ) {
        move.piece = parsed[ this.PIECE ]
      }
      else {
        move.piece = 'P'
      }
      if( parsed[ this.POS1 ] ) {
        move.from = parsed[ this.POS1 ]
      }
      if( parsed[ this.POS2 ] ) {
        move.to = parsed[ this.POS2 ]
      }
      if( parsed[ this.CAPTURE ] ) {
        move.capture = true
      }
      if( parsed[ this.LONG_CASTLE ] ) {
        move.longCastle = true
        delete move.piece
      }
      if( parsed[ this.SHORT_CASTLE ] ) {
        move.shortCastle = true
        delete move.piece
      }
      
      if( parsed[ this.CHECK_MATE ] == '+' ) {
        move.check = true
      }
      if( parsed[ this.CHECK_MATE ] == '#' ) {
        move.mate = true
      }

      return move

    }

  }

  formatMove( move ) {

  }

}

class Move {

  piece
  from 
  to
  capture = false
  check = false
  mate = false
  longCastle = false
  shortCastle = false
  promoteToPiece

}

