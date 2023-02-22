
import React from 'react';
import '../../css/popup.css';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


function popup(props){
    return (props.trigger) ? (
        <div>
            <Snackbar open={true} autoHideDuration={6000} onClose={() => props.setTrigger(false)}>
                <Alert severity="error" onClose={() => props.setTrigger(false)} sx={{ width: '100%' }}>
                 Please check your email/password!
                </Alert>
            </Snackbar>
            {props.children}
        </div>    
    ):"";
}
export default popup