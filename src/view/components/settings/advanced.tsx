import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage, injectIntl } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { _currentVersion } from '../../../components/settings';
import { scoresDB, scoreHistoryDB, songsDB } from '../../../components/indexedDB';

interface S {
  isLoading:boolean,
  disableUpdateBtn:boolean,
  disableDeleteBtn:boolean,
  currentVersion:string,
  message:string,
  message2:string,
  currentResetStore:string,
  isDialogOpen:boolean,
  isURLDialogOpen:boolean
}

interface P{
  intl:any,
  global:any
}

class Settings extends React.Component<P,S> {

  constructor(props:P){
    super(props);
    this.state ={
      isLoading:false,
      disableUpdateBtn:false,
      currentVersion:_currentVersion(),
      message:"",
      message2:"",
      currentResetStore:"27",
      disableDeleteBtn:false,
      isDialogOpen:false,
      isURLDialogOpen:false,
    }
  }

  deleteDef = async()=>{
    try{
      this.props.global.setMove(true);
      this.setState({disableDeleteBtn:true,message2:""});
      const sdb = new scoresDB(), shdb = new scoreHistoryDB(),sodb = new songsDB();
      const target = this.state.currentResetStore;
      if(target === "Songs Database"){
        await sodb.deleteAll();
      }else{
        await sdb.resetItems(target);
        await shdb.reset(target);
      }
      this.setState({disableDeleteBtn:false,message2:"正常に削除しました"});
    }catch(e){
      console.log(e);
      this.setState({disableDeleteBtn:false,message2:"更新に失敗しました"});
    }
    this.props.global.setMove(false);
  }

  toggleDialog = ()=> this.setState({isDialogOpen:!this.state.isDialogOpen})

  render(){
    const {isLoading,isDialogOpen,message2,currentResetStore,disableDeleteBtn} = this.state;
    if(isLoading){
      return (
        <Container className="loaderCentered">
          <CircularProgress />
        </Container>
      );
    }
    return (
      <Container fixed style={{padding:0}}>
        <Paper style={{padding:"15px"}}>
          <FormControl>
            <InputLabel><FormattedMessage id="Settings.dataClear"/></InputLabel>
            <Select value={currentResetStore} onChange={(e:React.ChangeEvent<{ value: unknown }>,)=>{
              if(typeof e.target.value !== "string") return;
              this.setState({currentResetStore:e.target.value});
            }}>
              <MenuItem value="26">26 Rootage</MenuItem>
              <MenuItem value="27">27 HEROIC VERSE</MenuItem>
              <MenuItem value="Songs Database">Songs Database</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="caption" display="block">
            <FormattedMessage id="Settings.resetWarning"/>
          </Typography>
          <div style={{position:"relative"}}>
            <Button
              variant="contained"
              color="secondary"
              style={{background:"#dc004e"}}
              onClick={this.toggleDialog}
              disabled={disableDeleteBtn}
              startIcon={<DeleteForeverIcon />}>
              <FormattedMessage id="Settings.DeleteExec"/>
            </Button>
            <Typography variant="caption" display="block">
              {message2}
            </Typography>
            <AlertDialog isDialogOpen={isDialogOpen} exec={this.deleteDef} close={this.toggleDialog} currentResetStore={currentResetStore}/>
            {disableDeleteBtn && <CircularProgress size={24} style={{color:"#777",position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12}} />}
          </div>
        </Paper>
      </Container>
    );
  }
}

export default injectIntl(Settings);

class AlertDialog extends React.Component<{isDialogOpen:boolean,exec:()=>void,close:()=>void,currentResetStore:string},{}> {

  handleOk = () => {
    this.props.exec();
    this.props.close();
  };

  handleClose = () => {
    this.props.close();
  };

  render(){
    const {isDialogOpen,currentResetStore} = this.props;
    return (
      <div>
        <Dialog
          open={isDialogOpen}
          onClose={this.handleClose}>
          <DialogTitle>Confirm</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <FormattedMessage id="Settings.DeleteDialogBody"/><br/>
              <FormattedMessage id="Settings.DeleteDialogBody2"/><br/>
              {currentResetStore === "26" ? "26 Rootage" : currentResetStore === "27" ? "27 HEROIC VERSE" : "Songs Database"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleOk} color="secondary" autoFocus>
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}