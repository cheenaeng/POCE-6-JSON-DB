import {add,read,edit,write} from "../../in-class/ICE.6-NPM-JSON-FILE-STORAGE/jsonFileStorage.js"

/**
 * Remove an element from an array in JSON
 * @param {string} filename
 * @param {string} key - The name of the key of the array we wish to edit
 * @param {number} index - The index of the array we wish to delete from
 * @param {function} callback - The callback function to call after removing
 * @returns undefined
 */
export function remove (filename, keyToEdit, indexToDelete, callback) {
edit (filename, (err,jsonContentObject)=>{
  if (err){
    console.log("error", err)
    callback(err)
  }
  console.log("edit success")
  //if no error, get jsonContentObject, access the key to edit, jsonContentObj[key][index] --> dont want this -->return a new array without the the index that you wish to delete from 
  const removedTask = jsonContentObject[keyToEdit][indexToDelete]
  const newList = jsonContentObject[keyToEdit].filter((line,index) => index !== indexToDelete)
  console.log(newList)
  jsonContentObject[keyToEdit] = newList
  console.log(jsonContentObject)
  console.log(`I have removed Item ${indexToDelete+1},${removedTask}`)
},
 // Pass callback to edit to be called after edit completion
callback
)
}


/**
 * Edit the properties of an element in an array in JSON
 * @param {string} filename
 * @param {string} key - The name of the key of the array we wish to edit
 * @param {number} index - The index of the array we wish to edit
 * @param {object} payload - The attributes we wish to add to the element
 * @param {function} callback - The callback function to call after editing
 * @returns undefined
 */

export function editOneElement (fileName,editKey, editIndex, attributeObj,callback) {

  edit(fileName,(err,jsonContentObject)=>{
    if (err){
      console.log(err)
      callback(err,"error")
    }
      console.log("before",jsonContentObject)
      const editedTask = jsonContentObject[editKey][editIndex] 
      const replacedTask = Object.values(attributeObj)[0]
      jsonContentObject[editKey][editIndex] = replacedTask
      console.log("after", jsonContentObject)
      console.log( `I have edited Item ${editIndex+1}, ${editedTask} to be ${replacedTask}.
  `)
  }, 
  callback)


}