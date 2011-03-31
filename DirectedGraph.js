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
		if(!this.isEmpty()){
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
		if(this._nodes.lenght==0)
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
		if(this.containsEdge(from,to))
			return false;
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
		return true;
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
	}
}