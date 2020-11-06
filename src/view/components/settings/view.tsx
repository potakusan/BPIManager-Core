import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { injectIntl, FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import { _currentViewComponents, _setCurrentViewComponents,isEnableTweetButton,setEnableTweetButton, _setShowLatestSongs, _showLatestSongs } from '@/components/settings';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import Loader from '@/view/components/common/loader';

interface S {
  isLoading:boolean,
  currentVersion:string[],
  isEnableTweetButton:boolean,
  showLatestSongs:boolean
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
      currentVersion:_currentViewComponents().split(","),
      isEnableTweetButton:isEnableTweetButton(),
      showLatestSongs:_showLatestSongs(),
    }
  }

  indexOf = (needle:string):boolean=>{
    return this.state.currentVersion.indexOf(needle) > -1
  }

  changeView = (value:string)=>(_e:React.ChangeEvent<HTMLInputElement>):void =>{
    let p = Array.from(this.state.currentVersion);
    if(this.indexOf(value)){
      p = p.filter(v=>v !== value)
    }else{
      p.push(value);
    }
    return this.setState({currentVersion:_setCurrentViewComponents(p)});
  }

  render(){
    const {isLoading,isEnableTweetButton,showLatestSongs} = this.state;
    if(isLoading){
      return (<Loader/>);
    }
    return (
      <Container fixed  style={{padding:0}}>
        <Paper style={{padding:"15px"}}>
          <FormControl fullWidth>
            <FormLabel component="legend"><FormattedMessage id="Settings.View"/></FormLabel>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={this.indexOf("last")} onChange={this.changeView("last")} value="last" />} label="前回スコアからの更新点数"/>
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={this.indexOf("djLevel")} onChange={this.changeView("djLevel")} value="djLevel" />} label="DJレベル参考表示"/>
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={this.indexOf("estRank")} onChange={this.changeView("estRank")} value="estRank" />} label="推定順位"/>
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={this.indexOf("lastVer")} onChange={this.changeView("lastVer")} value="lastVer" />} label="前作スコアからの更新点数"/>
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={this.indexOf("percentage")} onChange={this.changeView("percentage")} value="percentage" />} label="単曲スコアレート"/>
            </FormGroup>
          </FormControl>
          <Typography variant="caption" display="block">
            <FormattedMessage id="Settings.View1"/><br/>
            <FormattedMessage id="Settings.View2"/><br/>
            画面サイズ・補助表示の表示項目数・曲名の長さにより、項目の表示が重なることがあります。
          </Typography>
          <Divider style={{margin:"10px 0"}}/>
          <FormLabel component="legend">楽曲リスト/BPI非対応曲の表示</FormLabel>
          <Switch
            checked={showLatestSongs}
            onChange={(e:React.ChangeEvent<HTMLInputElement>,)=>{
              if(typeof e.target.checked === "boolean"){
                _setShowLatestSongs(e.target.checked);
                return this.setState({showLatestSongs:e.target.checked})
              }
            }}
          />
          <Typography variant="caption" display="block">
            リリースされたばかりの楽曲を楽曲リストに表示します。<br/>
            これらの楽曲はBPIが算出されませんが、スコアログの記録には対応しています。<br/><br/>
            (リストから非表示にしても、内部的にスコアは記録され続けます)
          </Typography>
          <Divider style={{margin:"10px 0"}}/>
          <FormLabel component="legend"><FormattedMessage id="Settings.View.TB"/></FormLabel>
          <Switch
            checked={isEnableTweetButton}
            onChange={(e:React.ChangeEvent<HTMLInputElement>,)=>{
              if(typeof e.target.checked === "boolean"){
                setEnableTweetButton(e.target.checked);
                return this.setState({isEnableTweetButton:e.target.checked})
              }
            }}
          />
          <Typography variant="caption" display="block">
            <FormattedMessage id="Settings.View.TBCaption"/>
          </Typography>
        </Paper>
      </Container>
    );
  }
}

export default injectIntl(Settings);
