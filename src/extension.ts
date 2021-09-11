
import * as path from 'path';
import * as vscode from 'vscode';
import * as fs from 'fs';


export function activate(context: vscode.ExtensionContext) {

	let samplebobcode = vscode.commands.registerCommand('spwnin.bobcode', () => {
		let bobcode = `//the group you want to move
bob = 5g //your group
//where to move and what easing type
bob.move(10, -10, 2)`;
		const options: vscode.OpenDialogOptions = {
			canSelectMany: false,
			openLabel: 'Open',
			filters: {
			   // eslint-disable-next-line @typescript-eslint/naming-convention
			   'Spwn files': ['spwn'], // typescript stfu i dont want problems 	
			   // eslint-disable-next-line @typescript-eslint/naming-convention
			   'All files': ['*']
		   }
		};

		
		const folderPath = vscode!.workspace!.workspaceFolders![0].uri.fsPath; 
		// const file = 'bob.spwn'; // i do not know why i need this but imma add it for refactoring in the future 

		if (fs.existsSync(folderPath)) {
			vscode.window.showOpenDialog(options).then(fileUri => {
				if (fileUri && fileUri[0]) {
					let filepath = fileUri[0].fsPath;

					try {
								console.log('Selected file: ' + fileUri[0].fsPath);
									fs.writeFile(filepath, bobcode, err => {
										if(err){
											console.error(err);
											vscode.window.showErrorMessage(`Failed to edit "${fileUri[0].fsPath}"`);
											return vscode.window.showErrorMessage(`${err}`);
										}
										return vscode.window.showWarningMessage(
											`edited "${fileUri[0].fsPath}"`
										);
									});
					} catch(err) {
						console.error(err);
					}
				}
			});
		
		} else {
			return vscode.window.showErrorMessage(`Failed to edit. are you in a workspace?`); // this'll never happen but i'll keep it 
		}
	});
	let sampleontouch = vscode.commands.registerCommand('spwnin.ontouch', () => {
		let ontouch = `GROUP_ID = 1 // the group id rename "GROUP_ID" to whatever you want

on(touch(), !{
GROUP_ID.move(10, 10, 0.5) // moves the group 1 block up on the y axis and and 1 block on the x axis
//more code when player clicked/jumped
})`;

		const folderPath = vscode!.workspace!.workspaceFolders![0].uri.fsPath; 
		const file = 'testontouch.spwn';

		if (fs.existsSync(folderPath)) {
			let filepath = path.join(folderPath, file);

			try {
				let exists = fs.existsSync(filepath);
				fs.writeFile(filepath, ontouch, err => {
					if(err){
						console.error(err);
						return vscode.window.showErrorMessage(`Failed to ${exists ? 'edit' : 'create'} "${file}" file.`);
					}
					return vscode.window.showWarningMessage(
						exists ? `FILE ALREADY EXISTS | edited "${file}" file.` : `created "${file}" file.`
					);
				});
			} catch(err) {
				console.error(err);
			}
					
		} else {
			return vscode.window.showErrorMessage(`Failed to create "${file}" file. are you in a workspace or a folder?`);
		}
	});
	let doughnut = vscode.commands.registerCommand('spwnin.doughnut', () => {
		let donut = `             extract $; let
		v=[];extract obj_props
	 p=3.14;h=100;d=sin;u=cos;for
   i in..30..628{for j in..40..628{
  t=d(i/h);c=u(i/h);s=d(j/h);p=u(j/h
 );x=3*c+p*c;y=3*t+p*t;g=?g;a=1/(s+5)
add(obj{1:725,X:615+40*a*(x*5),Y:415 +
40*a*(y*5),57:g});v.push([x,y,s,g]);}}
r=(a,i){c=u(a*p/      180);s=d(a*p/180
);n=i[0];m=i[1];        l=i[2];z=(-s)*n+
(c*s)*m+(c*c)*l          +5;return[15+40
*(1/z)*(((c*c)*n        +((c*s*s)-(s*c))
*m+((c*s*c)+(s*s      ))*l)*5),15+40*(
1/z)*(((s*c)*n+((s*s*s)+(c*c))*m+((s*s
*c)-(c*s))*l)*5)]};q=!{for j in ..12..
 360{wait(0.1);for i in v{n=r(j+12,i)
  c=r(j,i); ->i[3].move(n[0]/%3-c[0]
   /%3,n[1]/%3-c[1]/%3,0.1);}}; q!}
	 q!/* --27 seconds to compile
		using spwn 0.0.6-- ###
			-donut.spwn-*/`;

			let compilefileraw = `extract obj_props
			extract $
			
			// variables to modify rotation:
			// scale: scale of model,
			// step: increment of rotation in degrees, (divisible by 360 is best)
			// orx and ory: origin of model in x and y values
			scale = 7;
			step = 12;
			orx = 600;
			ory = 400;
			
			// file path of model to be rendered
			path = 'example_models/cube.obj';
			
			// --- Not necesary to change anything below ---
			
			// array of verticies
			let verts=[];
			
			// change path to modify the object being rendered
			if path.length > 0 {
				file = readfile(path).split('\n');
				let v = [];
				for i in file {
					// stores the line if it begins with the vertex prefix
					if i.starts_with('v ') { v.push(i); }
				}
				// loops through and stores all verticies in the verts array
				for j in v {
					k=substr(j, 2, j.length).split(' ');
					let vert = [];
					for i in ..3 {vert.push(k[i] as @number);}
					verts.push(vert);
				}
			}
			// renders torus if no path is inputted. If you input your own verticies, comment this out.
			else {
				for i in 0..30..628 {
					for j in 0..62..628 {
						ts=sin(i/100); ic=cos(i/100);
						ps=sin(j/100); pc=cos(j/100)
						verts.push([3*ic+pc*ic, 3*ts+pc*ts, ps]);
					}
				}
			}
			
			// rotate function which takes in c, b, and a which are angles to rotate about the x y and z axes 
			// and i which is the object to be changed
			rotate = (c, b, a, i) {
				// stores sin and cos for each angle after converted to radians from degrees
				cosa = cos(a*3.14/180); cosb = cos(b*3.14/180); cosc = cos(c*3.14/180);
				sina = sin(a*3.14/180); sinb = sin(b*3.14/180); sinc = sin(c*3.14/180);
				
				// implementation of a 3D rotation matrix that converts the xyz of i to the rotated xyz
				x = ((cosa * cosb)*i[0]) + (((cosa * sinb * sinc) - (sina * cosc))*i[1]) + (((cosa * sinb * cosc) + (sina * sinc))*i[2]);
				y = ((sina * cosb)*i[0]) + (((sina * sinb * sinc) + (cosa * cosc))*i[1]) + (((sina * sinb * cosc) - (cosa * sinc))*i[2]);
				z = ((-sinb)*i[0]) + ((cosb*sinb)*i[1]) + ((cosb*cosc)*i[2])+5;
			
				// returns the new x and y values of the vertex.
				return [scale*3 + 40*(1/z)*(x*scale), scale*3 + 40*(1/z)*(y*scale)];
			}
			
			// renders verticies to the screen
			for i in verts {
				group = ?g;
				i.push(group);
				n=rotate(0,0,0,i);
				add(obj {
					OBJ_ID: 725,
					X: n[0] + orx,
					Y: n[1] + ory,
					GROUPS: group,
				});
			}
			
			// increments j by step until 360 in order to make a smooth rotation
			// delay between increment
			delay=0.1;
			// infinite loop of rotation
			rot = !{
				// updates object from angle 0-360, incremented by step
				for j in 0..step..360 {
					// time between steps of angle
					wait(delay);
					for i in verts {
						// gets the next coordinates
						// rotate(a,b,c,vertex) -> a, b and c control the x, y and z axis rotations
						new = rotate(j+step, j+step, j+step, i) if j+step < 360 else rotate(0,0,0,i);
						curr = rotate(j,j,j,i);
						// moves the vertex to the new position
						// this is achieved by subtracting the new coordinate by the current one
						// each value is divided by 3 because of the way gd move triggers work.
						->i[3].move(floor(new[0]/3)-floor((curr[0])/3), floor(new[1]/3)-floor((curr[1])/3));
					}
				}
				rot!;
			}
			rot!;`;
		const folderPath = vscode!.workspace!.workspaceFolders![0].uri.fsPath; 
		const file = 'donut.spwn';
		const compilefile = '3d_compile.spwn';

		if (fs.existsSync(folderPath)) {
			let filepath = path.join(folderPath, file);
			let compilefilepath = path.join(folderPath, compilefile);

			try {
				let exists = fs.existsSync(filepath);
				let compilefileexists = fs.existsSync(compilefilepath);
				fs.writeFile(filepath, donut, err => {
					if(err){
						console.error(err);
						return vscode.window.showErrorMessage(`Failed to ${exists ? 'edit' : 'create'} "${file}" file.`);
					}
					return vscode.window.showWarningMessage(
						exists ? `FILE ALREADY EXISTS | edited "${file}" file.` : `created "${file}" file.`
					);
				});
				fs.writeFile(compilefilepath, compilefileraw, err => {
					if(err){
						console.error(err);
						return vscode.window.showErrorMessage(`Failed to ${compilefileexists ? 'edit' : 'create'} "${compilefile}" file.`);
					}
					return vscode.window.showWarningMessage(
						exists ? `FILE ALREADY EXISTS | edited "${compilefile}" file.` : `created "${compilefile}" file.`
					);
				});
			} catch(err) {
				console.error(err);
			}
					
		} else {
			return vscode.window.showErrorMessage(`Failed to create 2 file. are you in a workspace or a folder?`);
		}
	});
	//push context
	// so apprenlty you dont need this for making new commands
	context.subscriptions.push(samplebobcode);
	context.subscriptions.push(sampleontouch); // outdated version
	context.subscriptions.push(doughnut);
}

export function deactivate() {
	vscode.window.showInformationMessage("Oh hi there. did we do something wrong?");
}

// todo for tomarrow
// error reporting when missed something
