import styled from "styled-components"
import Cell from "./components/Cell"
import Header from "./components/Header"

function App() {
  return (
    <Container>
      <Header>Velha</Header>
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
    </Container>
  )
}

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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #264653;
`

export default App
