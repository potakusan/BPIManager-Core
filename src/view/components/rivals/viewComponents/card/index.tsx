import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import { alternativeImg, arenaRankColor } from "@/components/common";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import { updatedTime } from "@/components/common/timeFormatter";
import { getAltTwitterIcon } from "@/components/rivals";
import { _currentStore } from "@/components/settings";
import CardActions from "@material-ui/core/CardActions";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class UserCard extends React.Component<{
  item:any,
  open:(q:string)=>void,
  processing:boolean,
  isAdded:boolean,
  myId?:string,
  addUser:(q:any)=>void,
  hideBottomButtons?:boolean
},{}>{

  render(){
    const {item,isAdded,processing,myId,hideBottomButtons} = this.props;
    return (
      <Card style={{margin:"10px 0",background:"transparent"}} variant="outlined">
        <CardHeader
          avatar={
            <Avatar onClick={()=>this.props.open(item.displayName)}>
              <img src={item.photoURL ? item.photoURL : "noimg"} style={{width:"100%",height:"100%"}}
                alt={item.displayName}
                onError={(e)=>(e.target as HTMLImageElement).src = getAltTwitterIcon(item,false,"normal") || alternativeImg(item.displayName)}/>
            </Avatar>
          }
          title={<div onClick={()=>this.props.open(item.displayName)}>{item.displayName}&nbsp;<small>{updatedTime(item.serverTime.toDate())}</small></div>}
          subheader={<div onClick={()=>this.props.open(item.displayName)}>
            <span>
              <Chip size="small" style={{backgroundColor:arenaRankColor(item.arenaRank),color:"#fff",margin:"5px 0"}} label={item.arenaRank || "-"} />
              {item.totalBPI && <Chip size="small" style={{backgroundColor:"green",color:"#fff",margin:"0 0 0 5px"}} label={item.totalBPIs ? item.totalBPIs[_currentStore()] : item.totalBPI} />}
            </span>
          </div>}
        />
        {item.profile && (
          <CardContent style={{padding:"0 16px"}}>
            <Typography variant="caption">
            {item.profile}
            </Typography>
          </CardContent>
        )}
        {(hideBottomButtons && !item.profile) && <CardContent style={{padding:"0 16px"}}><small>プロフィールは記入されていません</small></CardContent>}
        <CardActions>
          <ButtonGroup fullWidth variant="text">
          {myId !== item.uid && (
          <Button component="a"
            disabled={processing || isAdded}
            color="secondary" size="small"
            startIcon={!isAdded ? <AddIcon/> : <CheckIcon/>}
            onClick={()=>!isAdded && this.props.addUser(item)}>
              {!isAdded ? "ライバル登録" : "ライバルです!"}
          </Button>
          )}
          {!hideBottomButtons && (
          <Button size="small" disabled={processing} color="secondary" onClick={()=>this.props.open(item.displayName)}>
            プロフィール表示
          </Button>
          )}
          </ButtonGroup>
        </CardActions>
      </Card>
    )
  }
}
