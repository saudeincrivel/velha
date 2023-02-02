import styled from "styled-components"

function Cell(){
  return (
    <CellStyle></CellStyle>
  )
}

const CellStyle = styled.div`
  width: calc(80vh/3);
  height: calc(80vh/3);
  border: 4px solid #264653;
  border-radius: 24px;
  background: #e76f51;
`

export default Cell