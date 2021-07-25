import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { signup, signin } from '../../actions/auth';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}
const Auth = () => {
    const classes = useStyles();
    const history = useHistory();
    const [formData, setFormdata] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
        
    };
    const handleChange = (e) => {
        setFormdata({...formData, [e.target.name]: e.target.value})
    };
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const switchModel = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };
    const dispatch = useDispatch( )
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type: 'AUTH', data: { result, token }});
            history.push('/')
        } catch (error) {
            console.log('Error', error);
        }
    };
    const googleFailure = (error) => {
        console.log('Login failed, please try again');
    };
    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignup && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                    </>
                                )
                            }
                            <Input name="email" label="Email" handleChange={handleChange} fullWidth type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} fullWidth type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {isSignup && (
                               <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} fullWidth type="password" /> 
                            )}
                            
                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                {isSignup ? "Sign Up" : "Sign In"}
                            </Button>
                           
                            <GoogleLogin
                                clientId="150207147049-fj0sk2lstfujpu54gbh0vh3gh01s4fq9.apps.googleusercontent.com"
                                render={(renderProps) => (
                                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                    Google Sign In
                                </Button>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy="single_host_origin"
                             />
                            <Grid container justifyContent="flex-end">
                                <Button onClick={switchModel} >
                                    {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default Auth
