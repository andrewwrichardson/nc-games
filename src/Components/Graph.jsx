import React, { useState } from "react";

import CytoscapeComponent from "react-cytoscapejs";

export default function Graph() {
  const [width, setWith] = useState("100%");
  const [height, setHeight] = useState("400px");
  const [nodeProp, setNodeProp] = useState(["A"]);
  const [graphData, setGraphData] = useState({
    nodes: [
      {
        data: {
          id: "1",
          label: "Bridge",
          type: "ip",
          year: "2010",
          electrified: "No",
        },
      },
      { data: { id: "2", label: "Superstructure", type: "device" } },
      { data: { id: "3", label: "Deck", type: "ip" } },
      { data: { id: "4", label: "Deck Segment", type: "device" } },
      { data: { id: "5", label: "Substructure", type: "device" } },
      { data: { id: "6", label: "Abutment Wall", type: "ip" } },
      { data: { id: "7", label: "Pile Cap", type: "device" } },
      { data: { id: "8", label: "Pile 1", type: "device" } },
      { data: { id: "9", label: "Pile 2", type: "device" } },
      { data: { id: "10", label: "Pile 3", type: "device" } },
      { data: { id: "11", label: "Pile 4", type: "device" } },
      { data: { id: "12", label: "Pile 5", type: "ip" } },
      { data: { id: "13", label: "Pile 6", type: "device" } },
      { data: { id: "13", label: "Bridge AIP", type: "device" } },
      { data: { id: "13", label: "Bridge AIP", type: "device" } },
      { data: { id: "14", label: "Pile 1 Cube Test", type: "device" } },
    ],
    edges: [
      // {
      //   data: { source: "1", target: "2", label: "Node2" },
      // },
      // {
      //   data: { source: "2", target: "3", label: "Node4" },
      // },
      // {
      //   data: { source: "3", target: "4", label: "Node5" },
      // },
      // {
      //   data: { source: "1", target: "5", label: " 6 -> 5" },
      // },
      // {
      //   data: { source: "5", target: "6", label: " 6 -> 7" },
      // },
      // {
      //   data: { source: "5", target: "7", label: " 6 -> 8" },
      // },
      // {
      //   data: { source: "5", target: "8", label: " 6 -> 9" },
      // },
      // {
      //   data: { source: "5", target: "9", label: " 3 -> 13" },
      // },
      // {
      //   data: { source: "5", target: "10", label: " 3 -> 13" },
      // },
      // {
      //   data: { source: "5", target: "11", label: " 3 -> 13" },
      // },
      // {
      //   data: { source: "5", target: "12", label: " 3 -> 13" },
      // },
      {
        data: { source: "5", target: "14", label: " 3 -> 13" },
      },
    ],
  });

  const layout = {
    name: "breadthfirst",
    fit: true,
    // circle: true,
    directed: true,
    padding: 50,
    // spacingFactor: 1.5,
    animate: true,
    animationDuration: 1000,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false,
  };

  const styleSheet = [
    {
      selector: "node",
      style: {
        backgroundColor: "#4a56a6",
        width: 30,
        height: 30,
        label: "data(label)",

        // "width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
        // "height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
        // "text-valign": "center",
        // "text-halign": "center",
        "overlay-padding": "6px",
        "z-index": "10",
        //text props
        "text-outline-color": "#4a56a6",
        "text-outline-width": "2px",
        color: "white",
        fontSize: 20,
      },
    },
    {
      selector: "node:selected",
      style: {
        "border-width": "6px",
        "border-color": "#AAD8FF",
        "border-opacity": "0.5",
        "background-color": "#77828C",
        width: 50,
        height: 50,
        //text props
        "text-outline-color": "#77828C",
        "text-outline-width": 8,
      },
    },
    {
      selector: "node[type='device']",
      style: {
        shape: "rectangle",
      },
    },
    {
      selector: "edge",
      style: {
        width: 3,
        // "line-color": "#6774cb",
        "line-color": "#AAD8FF",
        "target-arrow-color": "#6774cb",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
      },
    },
    {
      selector: "node.highlight",
      style: {
        "border-color": "#FFF",
        "border-width": "2px",
      },
    },
    {
      selector: "node.semitransp",
      style: { opacity: "0.5" },
    },
    {
      selector: "edge.highlight",
      style: { "mid-target-arrow-color": "#FFF" },
    },
    {
      selector: "edge.semitransp",
      style: { opacity: "0.2" },
    },
  ];

  const displayProp = (prop) => {
    setNodeProp([prop]);
  };

  let myCyRef;

  return (
    <>
      <div>
        <h1>Cytoscape example</h1>
        <div
          style={{
            border: "1px solid",
            backgroundColor: "#f5f6fe",
          }}
        >
          <CytoscapeComponent
            elements={CytoscapeComponent.normalizeElements(graphData)}
            // pan={{ x: 200, y: 200 }}
            style={{ width: width, height: height }}
            zoomingEnabled={true}
            maxZoom={3}
            minZoom={0.1}
            autounselectify={false}
            boxSelectionEnabled={true}
            layout={layout}
            stylesheet={styleSheet}
            cy={(cy) => {
              myCyRef = cy;

              console.log("EVT", cy);
              cy.on("mouseover", "node", function (e) {
                var sel = e.target;
                cy.elements()
                  .difference(sel.outgoers())
                  .not(sel)
                  .addClass("semitransp");
                sel.addClass("highlight").outgoers().addClass("highlight");
              });
              cy.on("mouseout", "node", function (e) {
                var sel = e.target;
                cy.elements().removeClass("semitransp");
                sel
                  .removeClass("highlight")
                  .outgoers()
                  .removeClass("highlight");
              });
              cy.on("tap", "node", (evt) => {
                var node = evt.target;
                console.log("EVT", evt);
                console.log("TARGET", node.data());
                console.log("TARGET TYPE", typeof node[0]);
                displayProp(node.data());
              });
            }}
            abc={console.log("myCyRef", myCyRef)}
          />{" "}
          <span>Properties</span>
          <div>
            {Object.keys(nodeProp[0]).map((item) => {
              return (
                <p>
                  {item}:{nodeProp[0][item]}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
