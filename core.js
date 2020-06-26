/********************************************************************************************************
 *
 * purpose: (eventually) delete messages from your Gmail spam folder if they match some heuristics.
 *
 * TLDR: I'm not responsible if this script breaks your entire Gmail inbox.
 * I try to write robust code that is well-commented and assumes nothing unless explicitly told otherwise,
 * but even if APIs don't change, I cannot guarantee 100% consistent functionality or support.
 *
 * written by Chris L. (github.com/monster1612)
 *
 * initially authored 2020-06-26
 *
 * version: 0.0.1 [alpine-alpha]
 *
 * last revision: 2020-06-26 - initial commit.
 *
 ********************************************************************************************************/

function getEnvConstants() {
  
  console.log("--- script began " + Date().toString() +  " ---"); // document the start of the script.
  
  // first, we will attempt to obtain the user's email address programmatically.
  
  var userEmail = Session.getActiveUser().getEmail();
  console.log("reported user: " + userEmail); // I guess we can use Logger in place of console for Apps Script. I'm too used to client-side JS. ¯\_(ツ)_/¯
  
  // this block of code will determine whether we can "trust" the email address obtained in order to run some matching heuristics.
  
  if (userEmail.includes("@gmail.com"))
    console.log("yay! this is a gmail address!"); // behavior should work as expected.
  else if (userEmail.equals("")) // as in, did we get a blank string returned?
    console.log("[ERROR] no email address returned! cannot assert that the script will work!"); // it is quite possible that we cannot get the email programmatically.
  else
    console.log("[WARNING] this is not a personal Gmail address! here be dragons!"); // here, we cannot assert that the script will work as intended (i.e.: for G Suite accounts).
  
  // next, we will determine the number of "unread" spam messages. this is used later to determine how to best handle messages in this folder.
  
  var numberOfSpamMessages = GmailApp.getSpamUnreadCount();
  console.log("according to Gmail, you have %s unread spam messages. let's fix that.", numberOfSpamMessages);
  
  console.log("--- script ended " + Date().toString() +" ---"); // document the script's end; does this really happen if we're supposed to theoretically be constantly running? :blobhyperthink:
}