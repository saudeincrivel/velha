import styled from "styled-components"

interface PieceProps {
  pieceType: string
}

function XPiece({pieceType}: PieceProps){
  return (
    <XPieceStyle>{pieceType}</XPieceStyle>
  )
}

const XPieceStyle = styled.h1`
  width: 15vh;
  height: 15vh;

  color: #e76f51;
  font-size: 40px;
`

export default XPiece