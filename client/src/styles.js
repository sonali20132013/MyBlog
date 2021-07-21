import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '20px auto 20px',
    maxWidth: '1184px',
    display: 'flex',
    minHeight: '360px',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundRepeat: 'no-repeat',
  },
  heading: {
    color: '#f50057',
  },
  image: {
    marginLeft: '15px',
  },
}));