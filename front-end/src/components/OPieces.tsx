import styled from "styled-components"

function OPiece(){
  return (
    <OPieceStyle></OPieceStyle>
  )
}

const OPieceStyle = styled.div`
  width: 15vh;
  height: 15vh;
  
  border: 4px solid #264653;
  border-radius: 24px;
  background: #e76f51;
`

export default OPiece