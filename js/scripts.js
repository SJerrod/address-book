// Business Logic for AddressBook ------
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i]; // return matched id with associated contact (AKA true)
      }
    }
  };
 return false; // signifies no matching id/contact
}

AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ------
function Contact (firstName, lastName, phoneNumber, addresses) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.addresses = addresses;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// Business Logic for Addresses ------
function Addresses (workEmail, homeEmail, workAddress, homeAddress) {
  this.workEmail = workEmail;
  this.homeEmail = homeEmail;
  this.workAddress = workAddress;
  this.homeAddress = homeAddress;
}


// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".work-email").html(contact.addresses.workEmail);
  $(".home-email").html(contact.addresses.homeEmail);
  $(".work-address").html(contact.addresses.workAddress);
  $(".home-address").html(contact.addresses.homeAddress);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });


$("#buttons").on("click", ".deleteButton", function() {
  addressBook.deleteContact(this.id);
  $("#show-contact").hide();
  displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedWorkEmail = $("input#new-work-email").val();
    const inputtedHomeEmail = $("input#new-home-email").val();
    const inputtedWorkAddress = $("input#new-work-address").val();
    const inputtedHomeAddress = $("input#new-home-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-work-email").val("");
    $("input#new-home-email").val("");
    $("input#new-work-address").val("");
    $("input#new-home-address").val("");
    let newAddresses = new Addresses(inputtedWorkEmail, inputtedHomeEmail, inputtedWorkAddress, inputtedHomeAddress);
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newAddresses);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})