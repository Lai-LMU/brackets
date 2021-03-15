module.exports = function check(str, bracketsConfig) {

  if (str.length == undefined || str.length == 0){
    return false;
  }

  let stack = [];

  for (let i=0; i< str.length; i++){
    if (GetType(str[i])== 'inviled'){
      return false;
    }
    if (GetType(str[i])== 'open'){
      stack.push(str[i]);
    }
    if (GetType(str[i])== 'close'){
      if(stack.length>0 ){
        let l = stack.pop();
        if(str[i] != findClosed(l)){
          return false;
        }
      } else{
        return false;
      }  
    }
    if (GetType(str[i])== 'openClose'){
      if(stack.length>0){
        if(str[i] == findClosed(stack[stack.length-1])){
          stack.pop();
        } else{
          stack.push(str[i]);
        }
      } else{
        stack.push(str[i]);
      }  
    }
  }

  if(stack.length == 0){
    return true;
  } else{
    return false;
  }


  function GetType(c){
    for (let j=0; j<bracketsConfig.length; j++){
      if(bracketsConfig[j][0] == c && bracketsConfig[j][1] != c){
        return 'open';  
      } else if(bracketsConfig[j][0] == c && bracketsConfig[j][1] ==c){
        return 'openClose';
      }else if(bracketsConfig[j][1]  == c && bracketsConfig[j][0] != c){
        return 'close';
       } else if (c == undefined || c == null){
        return 'inviled';
      }
    }
  }

  function findClosed(c){
    for (let j=0; j<bracketsConfig.length; j++){
      if(bracketsConfig[j][0] == c){
        return bracketsConfig[j][1];
      }
    }
    return false;
  }
}
