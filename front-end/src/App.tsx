import styled from "styled-components"
import Cell from "./components/Cell"
import Header from "./components/Header"
import OPiece from "./components/OPieces"
import XPiece from "./components/XPieces"

function App() {
  return (
    <>
    <Header>Velha</Header>
    <Container>
      <PlayerPiecesHolder color="#e63946">
        <XPiece pieceType="X"/>
        <XPiece pieceType="X"/>
        <XPiece pieceType="X"/>
        <XPiece pieceType="X"/>
        <XPiece pieceType="X"/>
        <XPiece pieceType="X"/>
      </PlayerPiecesHolder>
      <Board>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
      </Board>
      <PlayerPiecesHolder color="#1d3557">
        <OPiece/>
        <OPiece/>
        <OPiece/>
        <OPiece/>
        <OPiece/>
        <OPiece/>
      </PlayerPiecesHolder>
    </Container>
    </>
  )
}

const PlayerPiecesHolder = styled.div`
  width: 40vh;
  height: 80vh;

  padding: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap:wrap;
  gap: 16px;

  border-radius: 24px;
  border: 4px solid #264653;

  background: ${props => props.color}
`

const Board = styled.div`
  width: 80vh;
  height: 80vh;

  display: flex;
  flex-wrap: wrap;
`

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #264653;
`

export default App
