import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup, login } from '../../actions/userActions'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import Loader from '../Loader'
import { Card, Typography, TextField, Button } from '@material-ui/core'
import { useStyles } from './styles'

const AuthCard = ({ cardType, history }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, loading: loginLoading, error: loginError } = userLogin

  const userSignup = useSelector((state) => state.userSignup)
  const { loading, error } = userSignup

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const loginSubmitHandler = () => {
    dispatch(login(email, password))
  }

  const signupSubmitHandler = () => {
    dispatch(signup(firstName, lastName, email, password))
  }

  useEffect(() => {
    if (error) {
      alert(error)
    }

    if (loginError) {
      alert(loginError)
    }

    if (userInfo) {
      history.push('/')
    }
  }, [userInfo, dispatch, error, loginError, history])

  return (
    <Card className={classes.card} variant="outlined">
      <Typography variant="h4">
        {cardType === 'login' ? 'Please Log In' : 'Please Sign Up'}
      </Typography>
      <form className={classes.form} noValidate autoComplete="off">
        {cardType === 'login' && (
          <>
            <TextField
              type="email"
              id="filled-full-width"
              label="Email"
              fullWidth
              variant="outlined"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <TextField
              type="password"
              id="outlined-basic"
              label="Password"
              fullWidth
              variant="outlined"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />

            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={loginSubmitHandler}
            >
              Login
            </Button>
          </>
        )}
        {cardType === 'signup' && (
          <>
            <div className={classes.inputGroup}>
              <TextField
                type="test"
                id="filled-full-width"
                label="First name"
                fullWidth
                variant="outlined"
                onChange={(e) => setFirstName(e.currentTarget.value)}
              />
              <TextField
                type="test"
                id="outlined-basic"
                label="Last name"
                fullWidth
                variant="outlined"
                onChange={(e) => setLastName(e.currentTarget.value)}
              />
            </div>
            <TextField
              type="email"
              id="filled-full-width"
              label="Email"
              fullWidth
              variant="outlined"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <TextField
              type="password"
              id="outlined-basic"
              label="Password"
              fullWidth
              variant="outlined"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />

            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={signupSubmitHandler}
            >
              Sign up
            </Button>
          </>
        )}
      </form>
      {cardType === 'login' ? (
        <p>
          Dont have account yet? <Link to="/signup">Sign up.</Link>{' '}
        </p>
      ) : (
        <p>
          Already have an account? <Link to="/login">Log in.</Link>{' '}
        </p>
      )}
      {/* <Title>{cardType === 'login' ? 'Please Log In' : 'Please Sign Up'}</Title>
      {cardType === 'login' && (
        <>
          <Input
            required
            type="email"
            placeholder="Enter email..."
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Input
            required
            type="password"
            placeholder="Enter password..."
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <CardButton onClick={loginSubmitHandler}>
            {loginLoading ? (
              <Loader color="#fff" loading={loginLoading} />
            ) : (
              'Submit'
            )}
          </CardButton>
          <p>
            Dont have account yet? <Link to="/signup">Sign up.</Link>{' '}
          </p>
        </>
      )}
      {cardType === 'signup' && (
        <>
          <InputContainer>
            <Input
              required
              type="text"
              placeholder="Enter first name..."
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
            <Input
              required
              type="text"
              placeholder="Enter last name..."
              onChange={(e) => setLastName(e.currentTarget.value)}
            />
          </InputContainer>
          <Input
            required
            type="email"
            placeholder="Enter email..."
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Input
            required
            type="password"
            placeholder="Enter password..."
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <CardButton onClick={signupSubmitHandler}>
            {loading ? <Loader color="#fff" loading={loading} /> : 'Submit'}
          </CardButton>
          <p>
            Already have an account? <Link to="/login">Log in.</Link>{' '}
          </p>
        </>
      )} */}
    </Card>
  )
}

export default withRouter(AuthCard)
