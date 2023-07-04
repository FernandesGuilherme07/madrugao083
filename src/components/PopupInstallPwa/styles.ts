import styled from 'styled-components'
import { XCircle } from '@styled-icons/bootstrap'
import { s } from 'theme'

export const Close = styled(XCircle)`
  width: 2.6rem;
  height: 2.6rem;
  color: ${s.light};
`

export const ContainerPopup = styled.div`
  display: flex;
  max-width: 40rem;
  width: 100%;
  right: 0;
  top: 0;
  position: fixed;
  z-index: 10;
  opacity: 0;
  animation: ${s.moveUp} 0.4s ease-in forwards;
  animation-delay: 4s;

  span {
    display: flex;
    width: 3rem;
    height: 3rem;
    background-color: ${s.error};
    position: absolute;
    border-radius: 50%;
    right: -0.6rem;
    top: -0.6rem;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 2.4rem #00000054;
    cursor: pointer;
  }

  & > div {
    position: relative;
    margin: 7rem 2rem;
    background-color: ${s.light};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 25rem;
    box-shadow: 0 0 2.4rem #00000054;
    padding: 2rem;
  }

  p {
    font-size: ${s.textSubtitleCard};
    margin: 1rem 0;
  }

  button {
    font-size: ${s.textBtnPwa};
    font-weight: 800;
    text-transform: uppercase;
    background-color: ${s.secondary};
    width: 100%;
    padding: 1.4rem 0;
    border-radius: 0.8rem;
    margin-top: auto;
    transition: background-color 0.2s linear;

    &:hover {
      background-color: ${s.secondaryHover};
    }
  }
`

export const ContainerImg = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  & > img {
    margin-right: 1rem;
    max-width: 72%;
    object-fit: contain;
  }
`
