// import styled from 'styled-components'

// export const Container = styled.main`
//   padding: 2em;
//   padding-top: 8em;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '90px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100%',
  },
}))
