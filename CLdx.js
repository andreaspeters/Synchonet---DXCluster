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

load("functions.js");


var CLDX = Class({
	json: "",
	number: Array(),
	band: "",

	initialize: function() {
		this.welcome();
		bbs.sys_status|=SS_PAUSEOFF;
		this.main();
		bbs.sys_status&=~SS_PAUSEOFF;
	},

	render: function() {
		mswait(250);
		var i = 0;
		while (this.json[i]) {
			var item = this.json[i];
			i++;
			if (!this.number[item.nr]) {
				if (this.band && (item.band != this.band)) {
					continue;
				}
				console.putmsg(format("%-8.8s %-8.8s %-20.20s %-3.3s %-15.15s %-20.20s\n", item.call, item.freq, item.time, item.band, item.spotter_name, item.comment));
				this.number[item.nr] = 1;
			}
		}
	},

	update: function() {
		mswait(250);
		var file = new File("../xtrn/wiki/json.txt");
		file.open("r");
		try {
			this.json =  JSON.parse(file.read());
		} catch(e) {
		}
		file.close();	

   		switch(this.key) {
			case "b":
				this.band = prompt("Select Band");
				break;
			case "c":
				console.putmsg("Clear");
				this.band = "";
				break;
		}
	},

	welcome: function() {
		var file = new File("../xtrn/wiki/welcome.txt");
		file.open("r");
		console.putmsg(file.read());
		file.close();	
	},

	main: function() {
		while((userInput = console.inkey(K_NOECHO, 5)) != "q") {
			this.key = userInput;
			this.update();
			this.render();
    
		}
	}
});

