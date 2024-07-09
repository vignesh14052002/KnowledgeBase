// reference - https://codesandbox.io/p/sandbox/d3-react-force-graph-les-miserables-32p592?file=%2Fsrc%2FForceGraph.js%3A10%2C27
import React from "react";
import * as d3 from "d3";
import data from "./_graph";
import "./Graph.css";
const useD3 = (renderChartFn, dependencies) => {
    const ref = React.useRef();
  
    React.useEffect(() => {
      renderChartFn(d3.select(ref.current));
      return () => {};
    }, dependencies);
    return ref;
  };
  
function clamp(x, lo, hi) {
  return x < lo ? lo : x > hi ? hi : x;
}

const ForceGraph = () => {
  const width = window.innerWidth; // outer width, in pixels
  const height = window.innerHeight; // outer height, in pixels
  let nodes = data.nodes;
  let links = data.links;

  const ref = useD3((svg) => {
    const nodeId = (d) => d.id;
    const linkSource = ({ source }) => source; // given d in links, returns a node identifier string
    const linkTarget = ({ target }) => target; // given d in links, returns a node identifier string
    const N = d3.map(nodes, nodeId).map(intern);
    const LS = d3.map(links, linkSource).map(intern);
    const LT = d3.map(links, linkTarget).map(intern);
    const nodeGroup = (d) => d.group;
    const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
    const colors = d3.schemeTableau10; // an array of color strings, for the node groups

    // Replace the input nodes and links with mutable objects for the simulation.
    // nodes = d3.map(data.nodes, (_, i) => ({ id: N[i] }));
    // links = d3.map(data.links, (_, i) => ({
    //   source: LS[i],
    //   target: LT[i]
    // }));

    // console.log("links: ", links);
    // console.log("nodes: ", nodes);

    // svg
    //   .attr("viewBox", [0, 0, width, height])
    //   .attr("width", width)
    //   .attr("height", height)
    //   .attr("style", "background-color: lightgray");

    const link = svg
      .selectAll(".link")
      .data(links)
      .join("line")
      .classed("link", true);
    
    const node = svg
        .selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
      .style("text-anchor", "middle")
      .classed("node", true)
        .classed("fixed", (d) => d.fx !== undefined);

    node.append("circle")
        .attr("r", (d) => {
            return d.group * 5}
            );

    const text = node.append("text")
        .text((d) => d.title) // replace d.id with the property you want to display
        .attr("dx", 15)
        .attr("dy", ".35em")
        .style("visibility", "hidden");

    node.on("mouseover", function() {
        d3.select(this).select("circle").transition()
            .duration(750)
            .attr("r",  (d)=>d.group * 10);
        d3.select(this).select("text").style("visibility", "visible");
    })
    node.on("mouseout", function() {
        d3.select(this).select("circle").transition()
            .duration(750)
            .attr("r", (d)=>d.group * 5);
        d3.select(this).select("text").style("visibility", "hidden");
    });

    /*     const simulation = d3
      .forceSimulation()
      .nodes(nodes)
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      //.force("link", d3.forceLink(links))
      .force("link", d3.forceLink(links))
      .on("tick", tick); */

    // Construct the scales.
    let nodeGroups = d3.sort(G);
    const color =
      nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

    // Construct the forces.
    const forceNode = d3.forceManyBody();
    const forceLink = d3.forceLink(links).id(({ index: i }) => N[i]);

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", forceLink)
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", tick)

    if (G)
      node.attr("fill", ({ index: i }) => {
        return color(G[i]);
      });

    const drag = d3
      .drag()
      .on("start", dragstart)
      .on("drag", dragged)
      .on("end", dragend);

    node.call(drag);

    function tick() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      node.attr("transform", function(d){
        return "translate(" + d.x + ',' + d.y + ")"
      })
    }

    function intern(value) {
      return value !== null && typeof value === "object"
        ? value.valueOf()
        : value;
    }

    function dragstart() {
      d3.select(this).classed("fixed", true);
    }

    function dragend(event, d) {
      if (event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    function dragged(event, d) {
      d.fx = clamp(event.x, 0, width);
      d.fy = clamp(event.y, 0, height);
      simulation.alpha(1).restart();
    }
  });

  return (
    <svg
      ref={ref}
      style={{
        marginRight: "0px",
        marginLeft: "0px",
        width: "95vw",
        height: "95vh"
      }}
    >
      <text x="5" y="20">
        Knowledge Base Graph
      </text>
    </svg>
  );
};

export default ForceGraph;
