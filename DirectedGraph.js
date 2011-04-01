/*
* DirectedGraph
*	Represents a directed graph data structure with certaing
*	useful functions on it.
*	It can be used with GraphDracula Javascript Library to
*	show them (http://www.graphdracula.net/)
* 	@author: Luis Pulido <pulidoman@gmail.com>
*	@date: March 31, 2011
*/
function DirectedGraph(){
	this._isBidirectional = false;
	this._nodes = new Array();
	this._edges = new Array();
	this._matrix = null;
};

DirectedGraph.prototype = {
	constructor: DirectedGraph,
	/*
	* setType
	* Sets the type of Graph. It must be empty to
	* set the type. Can be: unidirectional (set by default),
	* or bydirectional.
	*/
	setType: function(how){
		if(this.isEmpty()){
			switch(how){
				case "unidirectional":
					this._isBidirectional=false;
					break;
				case "bidirectional":
					this._isBidirectional=true;
					break;
				default:
					return false;
			}
			return true;
		}
		return false;
	},
	/*
	* isEmpty
	* Checks if the array of nodes is empty
	* @return True if is empty, false if it isn't
	*/
	isEmpty: function(){
		if(this._nodes.length==0)
			return true;
		return false;
	},
	/*
	* reset
	* Creates a new array for the nodes and for the
	* edges (it empties the Graph), and leaves only
	* the type of Graph value
	*/
	reset: function(){
		this._nodes = new Array();
		this._edges = new Array();
	},
	/*
	* addNode
	* Adds a node to the Graph, verifying first if the
	* value of the node exists already.
	* @return true if the node was inserted, and
	* false if it wasn't because it was already there
	*/
	addNode: function(a){
		if(!this.containsNode(a)){
			this._nodes.push(a);
			return true;
		}
		return false;
	},
	/*
	* addNodesFromArray
	* Adds a set of nodes parsing a given array and pushing
	* them using the addNode function
	*/
	addNodesFromArray: function(arr){
		for(var i=0;i<arr.length;i++)
			this.addNode(arr[i]);
	},
	/*
	* addEdge
	* Adds an edge to the Graph, verifying first if the
	* edge exists already.
	* It executes the addNode function for each node on the
	* edge, to ensure it's on the Graph. If it's already
	* there, the node won't be added.
	* @parameter	from:				'starting node',
	*				to:					'destination node',
	*				value (optional):	'value of the edge'
	* @return true if it was added, false if it wasn't
	*/
	addEdge: function(from,to,value){
		var ret = false;
		if(!this.containsEdge(from,to)){
			this.addNode(from);
			this.addNode(to);
			if(value)
				this._edges.push([from,to,value]);
			else
				this._edges.push([from,to]);
			if(this._isBidirectional){
				if(value)
					this._edges.push([to,from,value]);
				else
					this._edges.push([to,from]);
			}
			ret = true;
		}
		return ret;
	},
	/*
	* addEdgesFromArray
	* Adds a set of edges parsing a given array and pushing
	* them using the addEdge function
	*/
	addEdgesFromArray: function(arr){
		for(var i=0;i<arr.length;i++){
			if(arr[i][2])
				this.addEdge(arr[i][0],arr[i][1],arr[i][2]);
			else
				this.addEdge(arr[i][0],arr[i][1]);
		}
	},
	/*
	* containsNode
	* Checks if the given value is contained on the Graph
	* @return true if it is. False if it isn't.
	*/
	containsNode: function(a){
		for(var i=0;i<this._nodes.length;i++)
			if(this._nodes[i]==a)
				return true;
		return false;
	},
	/*
	* containsEdge
	* Checks if the given pair of values (representing an
	* edge (a=from, b=to)) is contained on the Graph
	* @return true if it is. False if it isn't.
	*/
	containsEdge: function(from,to){
		for(var i=0;i<this._edges.length;i++)
			if(this._edges[i][0]==from&&this._edges[i][1]==to)
				return true;
		return false;
	},
	/*
	* edgesFrom
	* Returns an array with all the nodes that the
	* parameter node is pointing to. If there's none
	* it returns null.
	* If a returning edge has a value, it'll show inside the array
	* as an array of two values:
	*  [0]=destination node
	*  [1]=value of the edge
	*/
	edgesFrom: function(node){
		var arr = new Array();
		for(var i=0;i<this._edges.length;i++)
			if(this._edges[i][0]==node){
				if(this._edges[i][2])
					arr.push([this._edges[i][1],this._edges[i][2]]);
				else
					arr.push(this._edges[i][1]);
			}
		if(arr.length==0)
			return null;
		return arr;
	},
	/*
	* edgesTo
	* Returns an array with all the nodes that are pointing
	* to the parameter node. If there's none it'll return null.
	* If a returning edge has a value, it'll show inside the array
	* as an array of two values:
	*  [0]=departing node
	*  [1]=value of the edge
	*/
	edgesTo: function(node){
		var arr = new Array();
		for(var i=0;i<this._edges.length;i++)
			if(this._edges[i][1]==node){
				if(this._edges[i][2])
					arr.push([this._edges[i][0],this._edges[i][2]]);
				else
					arr.push(this._edges[i][0]);
			}
		if(arr.length==0)
			return null;
		return arr;
	},
	/*
	* sort
	* Sorts from lowest to highest value both arrays (nodes and edges)
	*/
	sort: function(){
		this._nodes.sort();
		this._edges.sort();
	},
	/*
	* buildMatrix
	* Creates the adjacency matrix for the Directed Graph and stores it
	* on the _matrix bidimentional array.
	*/
	buildMatrix: function(){
		var length = this._nodes.length;
		this._matrix = new Array(length);
		for(var i=0;i<this._matrix.length;i++)
			this._matrix[i] = new Array(length);
		for(var i=0;i<this._nodes.length;i++)
			for(var j=0;j<this._nodes.length;j++){
				if(this.containsEdge(this._nodes[i],this._nodes[j]))
					this._matrix[i][j]=true;
				else
					this._matrix[i][j]=false;
			}
	},
	/*
	* drawMatrix
	* If the matrix was alredy built, and the given id of an html
	* element exists, the function will draw the adjacent matrix
	* on an html table.
	* To format the table you can draw the matrix inside a div and
	* manipulate it with css
	*/
	drawMatrix: function(where){
		if(document.getElementById(where)&&this._matrix){
			var r = '<table><thead><tr><th></th>', length = this._nodes.length;
			for(var i=0;i<length;i++)
				r+='<th>'+this._nodes[i]+'</th>';
			r+='</tr></thead><tbody>';
			for(var i=0;i<length;i++){
				r+='<tr><td>'+this._nodes[i]+'</td>';
				for(var j=0;j<length;j++){
					if(this._matrix[i][j])
						r+='<td>1</td>';
					else
						r+='<td>0</td>';
				}
				r+='</tr>';
			}
			r+='</tbody></table>';
			try{
				document.getElementById(where).innerHTML = r;
			}
			catch(e){
				alert("DirectedGraph.drawMatrix() error.\nVerify that the html object supports innerHTML");
			}
		}
	}
}