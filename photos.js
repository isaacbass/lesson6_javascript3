/*    
    Program Name: Photo Gallery Application
    Author: Isaac Bass
    Date: 3/10/17
    Filename: photos.js
 */


"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
var photoOrder = [1,2,3,4,5];
var figureCount = 3;

/*****************************************populateFigures() FUNCTION*************************************/
/* This method adds src values to img elements based on order specified in photoOrder array             */
/********************************************************************************************************/
function populateFigures() {
    var filename;
    var currentFig;
    
    if (figureCount === 3) {
        for (var i = 1; i < 4; i++) {
            filename = "images/IMG_0" + photoOrder[i] + "sm.jpg";
            currentFig = document.getElementsByTagName("img")[i - 1];
            currentFig.src = filename;
        }   // end of for loop
    } else {
        for (var i = 0; i < 5; i++) {
            filename = "images/IMG_0" + photoOrder[i] + "sm.jpg";
            currentFig = document.getElementsByTagName("img")[i];
            currentFig.src = filename;
        }   // end of for loop
    }   //end of if-else
}//end of populateFigures function

/**********************************END OF populateFigures() FUNCTION*************************************/



/*********************************rightArrow() FUNCTION***************************************************/
/* This method shifts all images one figure to the right, and change values in photoOrder array to match */
/********************************************************************************************************/
function rightArrow() {
   for (var i = 0; i < 5; i++) {
      if ((photoOrder[i] + 1) === 6) {
         photoOrder[i] = 1;
      } else {
         photoOrder[i] += 1;
      }//end of else
      
      populateFigures();
      
   }//end of for loop
}//end of rightArrow Function

/***********************************END OF RIGHT ARROW FUNCTION******************************************/

/********************************leftArrow() Function****************************************************/
/*This method shifts all images one figure to the left, and change values in photoOrder array to match  */
/********************************************************************************************************/
function leftArrow() {
    for (var i = 0; i < 5; i++) {
        if ((photoOrder[i] - 1) === 0) {
            photoOrder[i] = 5;
        } else {
            photoOrder[i] -= 1;
        }//end of else
        
      populateFigures();
      
    }//end of for loop
}//end of leftArrow Function

/****************************END OF LEFT ARROW FUNCTION*************************************************/


/***************************************previewFive() Function******************************************/
/*           This method is executed to allow the photo gallery to shift to five image layout.         */
/******************************************************************************************************/
function previewFive() {
    // Locate first element where the tag is article assigned to a variable
    var articleEl = document.getElementsByTagName("article")[0];
    
    // Create figure and img elements for fifth image
    var lastFigure = document.createElement("figure");
    
    lastFigure.id = "fig5";
    lastFigure.style.zIndex = "5";
    lastFigure.style.position = "absolute";
    lastFigure.style.right = "45px";
    lastFigure.style.top = "67px";
    
    var lastImage = document.createElement("img");
    
    lastImage.width = "240";
    lastImage.height = "135";
    
    // Add or attach the fifth image to preview
    lastFigure.appendChild(lastImage);
    articleEl.appendChild(lastFigure);
    
    // Clone figure element for fifth image and edit to be first image
    var firstFigure = lastFigure.cloneNode(true);
    
    firstFigure.id = "fig1";
    firstFigure.style.right = " ";
    firstFigure.style.left = "45px";
    
    articleEl.insertBefore(firstFigure, document.getElementById("fig2"));
    
    // Add appropriate src values to two new img elements
    document.getElementsByTagName("img")[0].src = "images/IMG_0" + photoOrder[0] + "sm.jpg";
    document.getElementsByTagName("img")[4].src = "images/IMG_0" + photoOrder[4] + "sm.jpg";
    
    figureCount = 5;
    
    // Disable the "Show more images" button after it has been selected once
    var numberButton = document.querySelector("#fiveButton p");
    
    numberButton.removeEventListener("click", previewFive, false);
}//end of previewFive()

/****************************************END of previewFive() Function**********************************/



/***********************************createEventListeners() Function*************************************/
/*         This method attaches event listeners to the buttons (left, right, and show all).            */
/*******************************************************************************************************/
//  Create event listeners for left arrow, right arrow, and fiveButton elements
function createEventListeners() {
    //  Declare variable for document element with id of leftarrow, which is in the HTML document
    var leftarrow = document.getElementById("leftarrow");
    
    //  Add an event handler to the specified document element (leftarrow)
    //  The leftArrow() function will be executed when the user clicks the left navigation button arrow
    leftarrow.addEventListener("click", leftArrow, false);
    
    //  Declare variable for document element with id of rightarrow in the HTML document
    var rightarrow = document.getElementById("rightarrow");
    
    //  Add an event handler to the specified document element (rightarrow)
    // The rightArrow() function will be executed when user clicks the right navigation arrow
    rightarrow.addEventListener("click", rightArrow, false);
    
    // Declare a variable for the element fiveButton
    var showAllButton = document.querySelector("#fiveButton p");
    
    // Add event listener to showAllButton element
    // When the user clicks the Show More button the previewFive function is executed
    showAllButton.addEventListener("click", previewFive, false);
}//end of createEventListeners function

/************************************END OF createEventListeners() FUNCTION****************************/


/************************************setUpPage() FUNCTION**********************************************/
/* create event listeners and populate image elements */
function setUpPage() {
   createEventListeners();
   populateFigures();
}//end of setUpPage Function

/***********************************END OF setUpPage() FUNCTION***************************************/



/* run setUpPage() function when page finishes loading */
if (window.addEventListener) {
      window.addEventListener("load", setUpPage, false); 
} else if (window.attachEvent)  {
      window.attachEvent("onload", setUpPage);
}//end of else if