
//when user input show/add  --> respective COMMANDs are executed 
import {read,add,edit} from "/Users/cheenaeng/Desktop/rocket-academy/bootcamp/week5/day1/in-class/ICE.6-NPM-JSON-FILE-STORAGE/jsonFileStorage.js"
import {remove,editOneElement} from "./jsonFileStorage.js"
const COMMAND = process.argv[2]
const SHOWTODO = "show"
const ADDTODO = "add"
const COMPLETE = "complete"
const REMOVE = "remove"
const EDIT  = "edit"

const userCommand = process.argv[3]
const fileName = 'data.json'

switch(COMMAND){
  case SHOWTODO: 
  showList();
  break;

  case ADDTODO:
  addToList();
  break;

  case COMPLETE:
  completeList()
  break;

  case REMOVE:
  removeToDo()
  break;

  case EDIT:
  editToDo()
  break;

  default:
    console.log(`unknown COMMAND:${COMMAND}`)
}

/** to add line number to each line and add a To do:
 * @param {array} of each line 
 * @return {array} of each updated line 
 */
function addLineNumber(list){
  let updatedList = list.map((element,index) => `${index+1}.`.concat(element))
    //To Do: -- first line 
    const toDoLine = ["To-Do:"]
    return updatedList = [...toDoLine,...updatedList,]
}

function updateDoneList(doneList){
  let updatedDoneList = doneList.map((element,index) => `${index+1}. `.concat(element))
    //Done: -- first line 
    const doneLine = [" ","Done:"]
    return updatedDoneList = [...doneLine,...updatedDoneList,]
}

//to show to do items in a list 
//to show each item in a new line 
function showList(){
  read(fileName,(err,jsonContentObj) =>{
    if (err){
      console.error("error", err)
    }
    const list = jsonContentObj.items
    const newList = addLineNumber(list).join("\n")
    console.log(newList)

    const doneList = jsonContentObj.done
    const numberedDoneList = updateDoneList(doneList).join("\n")
    console.log(numberedDoneList)
  } 
  )
}

function addToList(){
  const dateAdded = Date()
  if (userCommand){
  add(fileName,"items", `Added on ${dateAdded}: ${userCommand}` ,err=>{
    if (err){
      console.log("err")
    }
    console.log(`I have added ${userCommand}to your to-do list.`)
   })
  }
}

function completeList(){
  const dateCompleted = Date()
  let userInputIndex = parseInt(userCommand,10)
  console.log(userInputIndex)
//the number input corresponds to the index COMPLETEd, i need to edit the file by removing the corresponding line, then show the list again and add the done componenet
  const readCallback = (err,content)=>{
    if (err){
      console.log("error", err)
    }
    
  //content is the JsonObject
  const completedDateText = `--Completed on ${dateCompleted}:`
    let doneTask = content.items[userInputIndex-1].concat(completedDateText)
    console.log("donetask",doneTask)
    let newContent = content.items.filter((line,index) => index !== userInputIndex-1
    )
    content.items = newContent
    content.done.push(doneTask)
    //done component, add a new key "done", value is an empty array, then add the element that is sliced to the array
    console.log(`I have marked item ${userInputIndex}, ${doneTask} as complete.`)
  }
  const writeCallBack= (err)=>{
    console.log(err?? "remove success")
    showList()

  }
  edit(fileName, readCallback,writeCallBack)
}

function removeToDo() {
  let userInputIndex = parseInt(userCommand,10)
  console.log(userInputIndex)

  remove(fileName,"items",userInputIndex-1,(err) => 
   {
      if (err){
      console.log("err", err)
        }
      console.log ("success!!!")
    }
  )
}
function editToDo (){
  let userInputIndex = parseInt(userCommand,10)
  const userCommandTask = process.argv[4]
  console.log(userInputIndex)
  let editedTextObj = {"text": userCommandTask}

  editOneElement(fileName,"items", userInputIndex-1, editedTextObj, (err)=>{
    if (err){
      console.log("edit fail")
    }
    console.log("edit success!!")
  })
}