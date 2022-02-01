function createStartPosition() {
  let pieces = 'RNBQKBNR'
  let pawns = 'PPPPPPPP'
  let empty = '        '
  let board = [
    pieces,
    pawns,
    empty,
    empty,
    empty,
    empty,
    pawns.toLowerCase(),
    pieces.toLowerCase()
  ]
  return board
}

function moves( board, moves ) {
  moves.split( ' ' ).forEach( (move) => {
    moveBy( board, move )
  });
}

function move( board, m ) {
  let move = parseMove( board, m )
  // do the moving
}

/*
class Move {
  capture = false
  check = false
  mate = false
  shortCastle = false
  longCastle = false
  promotionPiece = null
  constructor( piece, start, end, capture, check, mate ) {
    this.piece = piece
    this.start = start
    this.end = end
  }
}

function parseMove( board, moveString ) {
  let pieceChar = moveString[ 0 ]
  let move = new Move()
  if( 'abcdefgh'.indexOf( pieceChar ) != -1 ) {
    // pawn
    move.piece = 'P'
  }
  else if( pieceChar == 'P' ) {
    // pawn
    move.piece = 'P'
    moveString = moveString.slice( 1 )
  }
  else {
    // piece
    move.piece = pieceChar
    moveString = moveString.slice( 1 )
  }
  move.start = moveString.slice( 0, 2 )
  moveString = moveString.slice( 2 )
  if( moveString.length == 0 ) {
    move.end = move.start
    move.start = null
  }
  else {
    if( moveString[ 0 ] == 'x' ) {
      move.capture = true
      moveString = moveString.slice( 1 )
    }
    move.end = moveString.slice( 0, 2 )
    moveString = moveString.slice( 2 )  
  }
  return move
}
*/

function createBoardTable( containerId, board, white ) {
  let c = document.getElementById( containerId )
  let table = document.createElement( 'table' )
  table.setAttribute( 'border', '0' )
  table.setAttribute( 'cellspacing', '0' )
  //table.setAttribute( 'style', 'border-collapse: collapse; border-width: 0px; border-spacing: 0px; margin: 0px;')
  c.appendChild( table )
  let row = white ? 8 : 1
  for( r = 0; r < 8; r++ ) {
    let tr = document.createElement( 'tr' )
    table.appendChild( tr )
    let column = white ? 'a' : 'h'
    for( c = 0; c < 8; c++ ) {
      let dark = isDark( r, c )
      let td = document.createElement( 'td' )
      tr.appendChild( td )
      let img = document.createElement( 'img' )
      //img.setAttribute( 'height', '50px' )
      let piece = getPiece( board, column, row )
      let darkPiece = ''
      if( piece != ' ' ) {
        darkPiece = isDarkPiece( piece ) ? 'd' : 'l'
      }
      else {
        piece = ''
      }
      img.src = 'svg/Chess_' + piece.toLowerCase().trim() + darkPiece + ( dark ? 'd' : 'l' ) + '45.svg'
      td.appendChild( img )
      //let span = document.createElement( 'span' )
      //span.innerHTML = 'svg/Chess_' + piece + ( dark ? 'd' : 'l' ) + darkPiece + '45.svg'
      //td.appendChild( span )
      column = charAdd( column, white ? 1 : -1 )
    }
    row += white ? -1 : 1
  }
}

function getPiece( board, column, row ) {
  return board[ row - 1 ][ column.charCodeAt() - 'a'.charCodeAt() ]
}

function charAdd( c, diff ) {
  return String.fromCharCode( c[ 0 ].charCodeAt() + diff )
}

function isDarkPiece( piece ) {
  return piece == piece.toLowerCase()
}

function isDark( r, c ) {
  return ( r * 9 + c ) % 2 != 0 
}