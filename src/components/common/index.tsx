import bpiCalcuator from "../bpi";
import {_currentStore, _currentTheme} from "../settings";
import { untilDate, isBeforeSpecificDate } from "./timeFormatter";
import { statMain } from "../stats/main";

export const commonFunc = class{

  private s:any;

  set = (s:any):this=>{
    this.s = s;
    return this;
  }

  clone = () => JSON.parse(JSON.stringify(this.s));
}

export const borderColor = ():string=>{
  if(themeColor === "light"){
    return "#ff2222";
  }
  if(themeColor === "dark"){
    return "#ccc";
  }
  return "#0095ff";
}

export const versionString = (input:string|number):string=>{
  const i = String(input);
  if(i === "28"){
    return "28 BISTROVER"
  }
  if(i === "27"){
    return "27 HEROIC VERSE"
  }
  if(i === "26"){
    return "26 Rootage"
  }
  if(i === "INF"){
    return "INFINITAS"
  }
  return "UNKNOWN";
}

export const arenaRankColor = (rank:string)=>{
  switch(rank){
    case "A1":
    return "rgb(255, 89, 89)";
    case "A2":
    case "A3":
    return "rgb(255, 141, 23)"
    case "A4":
    case "A5":
    return "rgb(166, 23, 255)"
    case "B1":
    case "B2":
    return "rgb(89, 117, 255)"
    case "B3":
    case "B4":
    return "rgb(87, 94, 127)"
    case "B5":
    return "rgb(27, 28, 31)"
  }
}

export const getTotalBPI = async(targetLevel:number = 12):Promise<number>=>{
  let exec = await (await new statMain(targetLevel).load()).setLastData(String(Number(_currentStore()) - 1));
  return new bpiCalcuator().setSongs(exec.at(),exec.at().length) || -15;
}

export const noimg = "https://files.poyashi.me/noimg.png"
export const alternativeImg = (input:string) => {
  const namebased = ()=>{
    if(!input){
      return "frogideas";
    }
    switch(input[0].toLowerCase()){
      case "a":
      case "k":
      case "u":
      return "frogideas";
      case "b":
      case "l":
      return "sugarsweets";
      case "c":
      case "m":
      case "v":
      return "berrypie";
      case "d":
      case "n":
      case "w":
      return "heatwave";
      case "e":
      case "o":
      return "daisygarden";
      case "f":
      case "p":
      case "x":
      return "seascape";
      case "g":
      case "q":
      case "y":
      return "summerwarmth";
      case "h":
      case "r":
      return "bythepool";
      case "i":
      case "s":
      case "z":
      default:
      return "duskfalling"
      case "j":
      case "t":
      return "base";
    }
  }
  return "https://www.tinygraphs.com/squares/"+ input +"?theme=" + namebased() + "&numcolors=3&size=240&fmt=svg";
}

const themeColor = _currentTheme();
export const avatarBgColor = themeColor === "light" ? "#efefef" : "rgba(255, 255, 255, 0.05)";
export const avatarFontColor = themeColor === "light" ? "#222" : "#efefef";


export const timeDiff = (seconds:number)=>{
  if(isBeforeSpecificDate(new Date(),seconds)){ // 今日の日付が終了日付より前か？
    return "残り"+ untilDate(seconds) +"日";
  }
  return "終了済み";
}
