
import React from 'react';
import '../../css/popup.css';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


function popup(props){
    if(props.msg=="successreg"){
        return (props.trigger) ? (
            <div>
                <Snackbar open={true} autoHideDuration={6000} onClose={() => props.setTrigger(false)}>
                    <Alert severity="success" onClose={() => props.setTrigger(false)} sx={{ width: '100%' }}>
                     Register Success!
                    </Alert>
                </Snackbar>
                {props.children}
            </div>    
        ):"";
    }
    else if(props.msg=="unsuccessreg"){
        return (props.trigger) ? (
            <div>
                <Snackbar open={true} autoHideDuration={6000} onClose={() => props.setTrigger(false)}>
                    <Alert severity="error" onClose={() => props.setTrigger(false)} sx={{ width: '100%' }}>
                     Username/Email Already Exist!
                    </Alert>
                </Snackbar>
                {props.children}
            </div>    
        ):"";
    }
}
export default popup