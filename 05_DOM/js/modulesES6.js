/**
 * Created by Mefisto on 18.07.2016.
 */

// 1
function prepend(container, newElement){
    let mycontainer = document.querySelector(container),
        secondEl = mycontainer.children[0];

    mycontainer.insertBefore(newElement,secondEl);
}



// 2
function deleteTextNodes(node){
    let myNode = document.querySelector(node);

    for(let el of myNode.childNodes){
        if(el.nodeType === 3){
            el.remove();
        }
    }
}



// 3
function findNode(node){
    let myNode = document.querySelector(node);

    deleteTextNodes(myNode);

    function deleteTextNodes(node) {
        let myNode = node;

        for(let i = 0; i < myNode.childNodes.length; i++){
            if(myNode.childNodes[i].nodeType === 3 ){
                myNode.childNodes[i].remove();
            }
        }

        for(let k = 0; k < myNode.children.length; k++){
            if(myNode.children[k].childNodes.length > 1){
                deleteTextNodes(myNode.children[k]);
            }
        }
    }
}



// 4
function scanDOM(node = '*'){
    let elemAll = document.getElementsByTagName(node),
        myNode = document.querySelector(node);

    let className = {},
        tagName = {},
        textNodeCount = 0;

    tagClassCounter(elemAll);
    textNodeCounter(myNode);

    function tagClassCounter(elemAll) {

        for(let i = 0; i < elemAll.length; i++){
            if(elemAll[i].getAttribute('class') != undefined){
                if(className[elemAll[i].getAttribute('class')]){
                    className[elemAll[i].getAttribute('class')]++;
                } else {
                    className[elemAll[i].getAttribute('class')] = 1;
                }
            }
            if(elemAll[i].tagName != undefined){
                if(tagName[elemAll[i].tagName.toLocaleLowerCase()]){
                    tagName[elemAll[i].tagName.toLocaleLowerCase()]++;
                } else {
                    tagName[elemAll[i].tagName.toLocaleLowerCase()] = 1;
                }

            }
        }
    }

    function textNodeCounter(myNode) {

        for(let i = 0; i < myNode.childNodes.length; i++){
            if(myNode.childNodes[i].nodeType === 3 ){
                textNodeCount++;
            }
        }

        for(let k = 0; k < myNode.children.length; k++){
            if(myNode.children[k].childNodes.length > 1){
                textNodeCounter(myNode.children[k]);
            }
        }
    }

    for(let elem in className){
        console.log("Элементов с классом " + elem + ": " + className[elem]);
    }
    for(let elem in tagName){
        console.log("Тэгов " + elem + ": " + tagName[elem]);
    }
    console.log("Текстовых узлов: " + textNodeCount);
}

module.exports = {
    prepend: prepend,
    deleteTextNodes: deleteTextNodes,
    findNode: findNode,
    scanDOM: scanDOM
}