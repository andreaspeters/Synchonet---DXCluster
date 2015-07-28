/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


        Author: Andreas Peters
		www:  https://www.andreas-peters.net

*/


/*
	Function:		setTitle
	Description:	Print out the title at the screen
	Parameter:		Text = The text to print out at screen
	Return:
*/
function setTitle(text) {
	console.gotoxy(5,2)
	console.putmsg("\1c"+text);
}

/*
	Function:		setFooter
	Description:	Print out the footer text at the screen
	Parameter:i		Text = The text to print out at screen
	Return:
*/
function setFooter(text) {
	console.gotoxy(4, 22)
	console.putmsg("\1c"+text);
}


/*
	Function:		setBackground
	Description:	set the background image
	Parameter:		ANSI File Name
	Return:
*/
function setBackground(bg) {
	console.clear();
	fp = new File("../xtrn/wiki/ansi/"+bg);
	fp.open("r");
	image = fp.read();
	console.putmsg(image);
	console.line_counter = 0;
	fp.close;
}

/*
	Function:		getArticles	
	Description:	create a json with all included files	
	Parameter:		
	Return:			JSON Array = Article List
*/
function getArticles() {

    var dir = directory("../xtrn/wiki/files/*");
    var articles = Array();

    for (var i = 0; i < dir.length; i++) {
        fp = new File(dir[i]);
        fp.open("r", true);
        var title    = fp.iniGetValue("header", "Title", "");
        fp.close();

        articles[i] = { "title": title, "file": dir[i] };
    }

    return articles;
}
