var formURL = window.location.href.match(/#(.*)$/);
var queuedError = "";
var issuetracker = "<a href=\"https://github.com/nonnymoose/formaccount/issues\">issue tracker</a>";
if (formURL) {
	redirectToForm(formURL[1]);
}

function redirectToForm(formurl) {
	if (formurl.match(/^(https?:\/\/)?docs\.google\.com\/forms/)) {
		//valid
		if (! formurl.match(/^https?:\/\//)) {
			formurl = "https://" + formurl;
		} // make it https? if not
		formurl = formurl.replace(/formrestricted$/, "viewform"); // fix the restriction
		window.location.href = "https://accounts.google.com/AccountChooser?continue=" + formurl; // redirect to the account chooser before visiting the form
	}
	else {
		// INVALID URL
		queuedError = "Invalid URL. Please specify a Google Forms url or report this on the " + issuetracker + " if you think you have reached this message in error.";
		if (document.readyState == "interactive" || document.readyState == "complete") {
			// post the error message
			error();
		}
	}
}

function formsubmit(e) {
	e.preventDefault();
	// e.stopPropogation();
	redirectToForm(this.elements[0].value);
}

function submitTheForm() {
	document.querySelector("form input[type=\"submit\"]").click();
}

function pasteSubmit() {
	window.setTimeout(submitTheForm, 50);
}

function error() {
	if (queuedError) {
		document.querySelector("div.error").innerHTML = queuedError;
	}
}

function loaded() {
	if (queuedError) {error()}
	document.querySelector("form").addEventListener("submit", formsubmit);
	document.querySelector("form input[type=\"text\"]").value = "";
}

if (document.readyState == "complete") {
	loaded();
}
else {
	window.addEventListener("load", loaded);
}

// example form
// https://docs.google.com/forms/d/e/1FAIpQLSewZi0jemgiKU4A-4mxUK3QZwzz3k-JLnre9kYOKUDSFVzxwA/viewform
// account chooser
// https://accounts.google.com/AccountChooser?continue=
